import traceback
import config
from db.session import Base
from fastapi import FastAPI, Request, Response,status
from fastapi.exceptions import RequestValidationError, ValidationError
from api.v1.main import api_v1_router
from starlette.middleware.cors import CORSMiddleware
from common.sys_redis import redis_client
from common.logger import logger
from schemas.response import resp
from common.sys_broadcast import broadcast_client
from db.session import engine, Base
from common import custom_exc


def create_app() -> FastAPI:
    # 初始化建表数据库
    print("=======create_app()======")
    Base.metadata.create_all(engine)
    """
    生成FatAPI对象
    :return:fastApi
    """
    # 其余的一些全局配置可以写在这里 多了可以考虑拆分到其他文件夹
    app = FastAPI()

    # 跨域设置
    register_cors(app)

    # 注册路由
    register_router(app)

    # 注册捕获全局异常
    register_exception(app)

    # 请求拦截
    # register_hook(app)

    # 取消挂载在 request对象上面的操作，感觉特别麻烦，直接使用全局的
    register_init(app)

    if config.DEBUG:
        # 注册静态文件
        register_static_file(app)

    return app


def register_init(app: FastAPI) -> None:
    """
    初始化连接
    :param app:
    :return:
    """

    @app.on_event("startup")
    async def init_connect():
        pass
        # 连接redis
        # redis_client.init_redis_connect()

        # await broadcast_client.init_broadcast_connect()

        # 初始化 apscheduler
        # schedule.init_scheduler()

        # # 初始化数据库
        # db.connect()

    @app.on_event('shutdown')
    async def shutdown_connect():
        pass
        """
        关闭
        :return:
        """

        # broadcast_client.disconnect()

        # schedule.shutdown()

        # if not db.is_closed():
        #     db.close()


def register_router(app: FastAPI) -> None:
    """
    注册路由
    :param app:
    :return:
    """
    # 项目API
    app.include_router(api_v1_router, )


def register_static_file(app: FastAPI) -> None:
    """
    静态文件交互开发模式使用
    生产使用 nginx 静态资源服务
    这里是开发是方便本地
    :param app:
    :return:
    """
    import os
    from fastapi.staticfiles import StaticFiles
    if not os.path.exists("./static"):
        os.mkdir("./static")
    app.mount("/static", StaticFiles(directory="static"), name="static")


def register_exception(app: FastAPI) -> None:
    """
    全局异常捕获
    注意 别手误多敲一个s
    exception_handler
    exception_handlers
    两者有区别
        如果只捕获一个异常 启动会报错
        @exception_handlers(UserNotFound)
    TypeError: 'dict' object is not callable
    :param app:
    :return:
    """

    # 自定义异常 捕获
    @app.exception_handler(custom_exc.TokenExpired)
    async def user_not_found_exception_handler(request: Request,
                                               exc: custom_exc.TokenExpired):
        """
        token过期
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"token未知用户\nURL:{request.method}{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )

        return resp.fail(resp.DataNotFound.set_msg(exc.err_desc))

    @app.exception_handler(custom_exc.TokenAuthError)
    async def user_token_exception_handler(request: Request,
                                           exc: custom_exc.TokenAuthError):
        """
        用户token异常
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"用户认证异常\nURL:{request.method}{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )

        return resp.fail(resp.DataNotFound.set_msg(exc.err_desc))

    @app.exception_handler(custom_exc.AuthenticationError)
    async def user_not_found_exception_handler(
            request: Request, exc: custom_exc.AuthenticationError):
        """
        用户权限不足
        :param request:
        :param exc:
        :return:
        """
        logger.error(f"用户权限不足 \nURL:{request.method}{request.url}")
        return resp.fail(resp.DataNotFound.set_msg(exc.err_desc))

    @app.exception_handler(ValidationError)
    async def inner_validation_exception_handler(request: Request,
                                                 exc: ValidationError):
        """
        内部参数验证异常
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"内部参数验证错误\nURL:{request.method}{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )
        return resp.fail(resp.BusinessError.set_msg("ValidationError:内部参数验证错误"))

    @app.exception_handler(RequestValidationError)
    async def request_validation_exception_handler(
            request: Request, exc: RequestValidationError):
        """
        请求参数验证异常
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"请求参数格式错误\nURL:{request.method}{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )
        # return response_code.resp_4001(message='; '.join([f"{e['loc'][1]}: {e['msg']}" for e in exc.errors()]))
        return resp.fail(resp.InvalidParams.set_msg("RequestValidationError:请求参数格式错误"))

    # 捕获assert AssertionError异常
    @app.exception_handler(AssertionError)
    async def business_service_assert_exception_handler(
            request: Request, exc: AssertionError):
        """
        service层assert抛出的异常
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"Service层错误\n{request.method}URL:{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )
        return resp.fail(resp.Resp(1010, str(exc), status.HTTP_200_OK,False))

    # 捕获全部异常
    @app.exception_handler(Exception)
    async def all_exception_handler(request: Request, exc: Exception):
        """
        全局所有异常
        :param request:
        :param exc:
        :return:
        """
        logger.error(
            f"全局异常\n{request.method}URL:{request.url}\nHeaders:{request.headers}\n{traceback.format_exc()}"
        )
        return resp.fail(resp.ServerError)


def register_cors(app: FastAPI) -> None:
    """
    支持跨域
    :param app:
    :return:
    """
    if config.DEBUG:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )