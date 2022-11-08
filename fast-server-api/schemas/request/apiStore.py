from typing import Optional, Text

from pydantic import BaseModel,EmailStr


# Shared properties
class ApiStoreBase(BaseModel):
    path: Optional[str] = None
    group: Optional[str] = None
    brief: Optional[Text] = None
    request_method: Optional[str] = None
    is_delete: Optional[int] = None


# Properties to receive on item creation
class ApiStoreCreate(ApiStoreBase):
    pass


class ApiStoreUpdate(ApiStoreBase):
    pass


# Properties to return to client
class ApiStore(ApiStoreBase):
    id: int

    class Config:
        orm_mode = True


