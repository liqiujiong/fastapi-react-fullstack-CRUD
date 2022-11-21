from typing import List, Optional, Text

from pydantic import BaseModel, EmailStr


# Shared properties
class RoleBase(BaseModel):
    title: Optional[str] = None
    name: Optional[str] = None
    sort_order: Optional[int] = None
    is_delete: Optional[int] = None


# Properties to receive on item creation
class RoleCreate(RoleBase):
    pass


class RoleUpdate(RoleBase):
    pass


# Properties to return to client
class Role(RoleBase):
    id: int

    class Config:
        orm_mode = True


# Shared properties
class RoleRelBase(BaseModel):
    role_id: Optional[int] = None
    user_id: Optional[int] = None
    is_delete: Optional[int] = None


# Properties to receive on item creation
class RoleRelCreate(RoleRelBase):
    pass


class RoleRelUpdate(RoleRelBase):
    pass


# Properties to return to client
class RoleRel(RoleRelBase):
    id: int

    class Config:
        orm_mode = True


class SetUserRole(BaseModel):
    user_id: int
    roles: List[str]


class RoleMenuPermissionBase(BaseModel):
    role_id: Optional[int] = None
    menu_id: Optional[int] = None


# Properties to receive on item creation
class RoleMenuPermissionCreate(RoleMenuPermissionBase):
    pass


class RoleMenuPermissionUpdate(RoleMenuPermissionBase):
    pass


# Properties to return to client
class RoleMenuPermission(RoleMenuPermissionBase):
    id: int

    class Config:
        orm_mode = True


class SetMenuPermissionReq(BaseModel):
    role_id: int
    menu_id: List[int]


class RoleApiPermissionBase(BaseModel):
    role_id: Optional[int] = None
    menu_id: Optional[int] = None


# Properties to receive on item creation
class RoleApiPermissionCreate(RoleApiPermissionBase):
    pass


class RoleApiPermissionUpdate(RoleApiPermissionBase):
    pass


# Properties to return to client
class RoleApiPermission(RoleApiPermissionBase):
    id: int

    class Config:
        orm_mode = True


class SetApiPermissionReq(BaseModel):
    role_id: int
    api_id: List[str]
