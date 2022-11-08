"""
自定义异常
"""


class TokenAuthError(Exception):
    def __init__(self, err_desc: str = "验证用户信息错误"):
        self.err_desc = err_desc


class TokenExpired(Exception):
    def __init__(self, err_desc: str = "登录已过期"):
        self.err_desc = err_desc


class AuthenticationError(Exception):
    def __init__(self, err_desc: str = "没有权限操作"):
        self.err_desc = err_desc

