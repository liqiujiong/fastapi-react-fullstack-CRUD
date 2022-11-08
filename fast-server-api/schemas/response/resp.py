# -*- coding: utf-8 -*-
"""

统一响应状态码

"""
from typing import Union

from fastapi import status as http_status
from fastapi.responses import JSONResponse, Response
from fastapi.encoders import jsonable_encoder


class Resp(object):
    def __init__(self, status: int, msg: str, code: int, success: bool):
        self.status = status
        self.msg = msg
        self.code = code
        self.success = success


    def set_msg(self, msg):
        self.msg = msg
        return self


InvalidRequest: Resp = Resp(1000, "无效的请求", http_status.HTTP_400_BAD_REQUEST,False)
InvalidParams: Resp = Resp(1002, "无效的参数", http_status.HTTP_400_BAD_REQUEST,False)
BusinessError: Resp = Resp(1003, "业务错误", http_status.HTTP_400_BAD_REQUEST,False)

DataNotFound: Resp = Resp(1004, "查询失败", http_status.HTTP_400_BAD_REQUEST,False)
DataStoreFail: Resp = Resp(1005, "新增失败", http_status.HTTP_400_BAD_REQUEST,False)
DataUpdateFail: Resp = Resp(1006, "更新失败", http_status.HTTP_400_BAD_REQUEST,False)
DataDestroyFail: Resp = Resp(1007, "删除失败", http_status.HTTP_400_BAD_REQUEST,False)


PermissionDenied: Resp = Resp(1008, "没有权限访问", http_status.HTTP_403_FORBIDDEN,False)
ServerError: Resp = Resp(5000, "服务器繁忙", http_status.HTTP_500_INTERNAL_SERVER_ERROR,False)


def ok(*, data: Union[list, dict, str] = None, msg: str = "success", success: bool = True) -> Response:
    return JSONResponse(
        status_code=http_status.HTTP_200_OK,
        content=jsonable_encoder({
            'status': 200,
            'msg': msg,
            'data': data,
            "success": success
        })
    )


def fail(resp: Resp) -> Response:
    return JSONResponse(
        status_code=resp.code,
        content=jsonable_encoder({
            'errorCode': resp.status,
            'errorMessage': resp.msg,
            'success':resp.success
        })
    )

"""
根据data判断ok,data有值则ok否则业务错误
"""
def judge_by_data(*, data: Union[list, dict, str] = None, msg: str = "success") -> Response:
    if data:
        return JSONResponse(
            status_code=http_status.HTTP_200_OK,
            content=jsonable_encoder({
                'status': 200,
                'msg': msg,
                'data': data
            })
        )
    else:
        fail(BusinessError)