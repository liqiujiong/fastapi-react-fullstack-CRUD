from tokenize import Decnumber
from typing import Generator

from requests import request
from core.security import check_api_permission
from crud.user import userCrud
from db.session import SessionLocal
from typing import Any, Union, Optional
import config
from jose import jwt
from fastapi import Header, Depends, Request
from pydantic import ValidationError
from common import custom_exc
from models.user import User

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def check_jwt_token(
        request: Request,
        token: Optional[str] = Header(..., description="登录token")
) -> Union[str, Any]:
    """
    解析验证token  默认验证headers里面为token字段的数据
    可以给 headers 里面token替换别名, 以下示例为 X-Token
    token: Optional[str] = Header(None, alias="X-Token")
    :param token:
    :return:
        {'exp': 1655489469, 'sub': '2'}
    """

    try:
        payload = jwt.decode(
            token,
            config.SECRET_KEY, algorithms=[config.ALGORITHM]
        )
        print("==========jwt decode:",payload)
        # casbin api权限检查
        # user_id = payload.get('sub')
        # raw_path = request.scope['route'].path
        # isPass = check_api_permission(user_id=user_id,path=raw_path,request_method=request.method)
        # if not isPass:
        #     raise custom_exc.AuthenticationError()

        return payload
    except jwt.ExpiredSignatureError:
        raise custom_exc.TokenExpired()
    except (jwt.JWTError, ValidationError):
        raise custom_exc.TokenAuthError()

def get_user_id(
        token: Optional[str] = Depends(check_jwt_token),
) ->  int:
    id = token.get("sub")
    if not id:
        raise custom_exc.TokenAuthError(err_desc="User not found")
    return int(id)

async def get_current_user(
        token: Optional[str] = Depends(check_jwt_token),
        db = Depends(get_db)
) -> User:
    """
    根据header中token 获取当前用户
    :param db:
    :param token:
    :return:
    """
    user = await userCrud.get(db ,id=token.get("sub"))
    if not user:
        raise custom_exc.TokenAuthError(err_desc="User not found")
    return user