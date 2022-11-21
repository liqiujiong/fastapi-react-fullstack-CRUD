from typing import Optional

from pydantic import BaseModel


# Shared properties
class MenuBase(BaseModel):
    pid: Optional[int] = None
    name: Optional[str] = None
    en_name: Optional[str] = None
    icon: Optional[str] = None
    path: Optional[str] = None
    sort: Optional[int] = None
    is_delete: Optional[int] = None


# Properties to receive on item creation
class MenuCreate(MenuBase):
    pass


class MenuUpdate(MenuBase):
    pass


# Properties to return to client
class Menu(MenuBase):
    id: int

    class Config:
        orm_mode = True
