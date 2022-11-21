#!/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2020/9/22 13:20
# @Author  : CoderCharm
# @File    : security.py
# @Software: PyCharm
# @Github  : github/CoderCharm
# @Email   : wg_python@163.com
# @Desc    :
"""
token password 验证
pip install python-jose
pip install passlib
pip install bcrypt

"""
import config
from typing import Any, Union
from datetime import datetime, timedelta
from jose import jwt
from passlib.hash import md5_crypt
from common.casbin import enforcer


def create_access_token(
        user_id: Union[str, Any],
        expires_delta: timedelta = None
) -> str:
    """
    生成token
    :param subject:需要存储到token的数据(注意token里面的数据，属于公开的)
    :param expires_delta:
    :return:
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    to_encode = {"exp": expire, "sub": str(user_id)}
    encoded_jwt = jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    验证密码
    :param plain_password: 原密码
    :param hashed_password: hash后的密码
    :return:
    """
    return md5_crypt.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    获取 hash 后的密码
    :param password:
    :return:
    """
    return md5_crypt.hash(password)

def check_api_permission(
    user_id:int,
    path=str,
    request_method=str,
):
    _res = False
    _res = enforcer.enforce(user_id, path, request_method) or _res
    return _res