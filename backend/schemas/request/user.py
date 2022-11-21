from typing import Optional

from pydantic import BaseModel,EmailStr


# Shared properties
class UserBase(BaseModel):
    nickname: Optional[str] = None
    school: Optional[str] = None
    email: Optional[str] = None
    mobile: Optional[str] = None
    real_name: Optional[str] = None
    id_card: Optional[str] = None
    pass

class UserAuth(BaseModel):
    password: str
    autoLogin: bool
    type: str


# 手机号登录认证 验证数据字段都叫username
class UserPhoneAuth(UserAuth):
    phone: str


# Properties to receive on item creation
class UserCreate(UserBase):
    pass


class UserUpdate(UserBase):
    pass


# Properties to return to client
class User(UserBase):
    id: int

    class Config:
        orm_mode = True
