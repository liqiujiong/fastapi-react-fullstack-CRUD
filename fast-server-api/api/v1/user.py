import math
from crud.role import CRUDRole
from models.user import User, UserRoleDict
from crud.user import CRUDUser
import config
from typing import Any, List, Union
from core import security
from datetime import timedelta
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from schemas.request.role import SetUserRole
from schemas.response import resp
from schemas.request import user
from api import deps
from services.userService import UserService
from common.casbin import enforcer

router = APIRouter()
userService = UserService()
userCrud = CRUDUser(User)
roleCrud = CRUDRole(UserRoleDict)

@router.post("/login", summary="用户登录认证", name="登录")
async def login_access_token(
        *,
        db: Session = Depends(deps.get_db),
        req: user.UserPhoneAuth,
) -> Any:
    """
    简单实现登录
    :param req:
    :return:
    """

    # 验证用户 简短的业务可以写在这里
    user: User = await userCrud.get_user_by_phone(db=db, phone=req.phone)
    if not user or not security.verify_password(req.password, user.password):
        return resp.fail(resp.DataNotFound.set_msg("账号或密码错误"))

    if user.is_block:
        return resp.fail(resp.DataNotFound.set_msg("您的账号以被停用"))

    access_token_expires = timedelta(
        minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)

    # 登录token 存储了user.id
    return resp.ok(
        data={
            "token":
            security.create_access_token(user.id,
                                         expires_delta=access_token_expires),
            "user":
            user
        })


@router.get("/current", summary="获取当前用户信息", name="获取用户信息", description="此API没有验证权限")
async def get_user_info(*, current_user=Depends(deps.get_current_user)) -> Any:
    """
    获取用户信息 这个路由分组没有验证权限
    :param current_user:
    :return:
    """

    print("================current_user", current_user)
    return resp.ok(data=current_user)


@router.put("/roles", summary="更新用户角色")
async def set_user_roles(req: SetUserRole, db: Session = Depends(deps.get_db)):
    user_id = req.user_id
    roles = req.roles
    _res = await userService.set_user_roles(db=db,
                                            user_id=user_id,
                                            roles=roles,
                                            enforcer=enforcer)
    if _res:
        return resp.ok()
    return resp.fail(resp.DataUpdateFail)


@router.post("/block", summary="封禁用户")
async def block_user(user_id: int, db: Session = Depends(deps.get_db)):

    await userCrud.update_user_block_status(db, user_id, 1)

    return resp.ok()


@router.post("/unblock", summary="解封用户")
async def unblock_user(user_id: int, db: Session = Depends(deps.get_db)):

    await userCrud.update_user_block_status(db, user_id, 0)

    return resp.ok()


@router.get("/list", summary="获取用户列表")
async def get_user_list(
        block: str = None,
        real_name: str = None,
        role_ids: Union[List[int], None] = Query(default=None),
        pageSize: int = 20,
        current: int = 1,
        db: Session = Depends(deps.get_db)
    ):

    _res = await userCrud.get_user_list(
            db=db,
            role_ids=role_ids,
            real_name=real_name,
            block=block,
            page_size=pageSize,
            current_page=current
        )

    user_list_counts = _res[0]
    user_list = _res[1]

    for user in user_list:
        user.role = await roleCrud.get_roles_by_user_id(db,user.id)

    return resp.ok(data={
            "current":
            current,
            "pageSize":
            pageSize,
            "total":
            user_list_counts,
            "total_page":
            math.ceil(user_list_counts / pageSize),
            "list": user_list
        }
    )


@router.get("/{id}", summary="获取指定用户")
async def read_user(*, db: Session = Depends(deps.get_db), id: int, token = Depends(deps.check_jwt_token)) -> Any:
    """
    Get item by ID.
    """
    user = await userCrud.get(db=db, id=id)
    return resp.ok(data=user)
