import asyncio
import math
from typing import List
from fastapi import Depends
from psutil import users
import pytest
from api import deps
from crud.role import CRUDRole
from crud.user import CRUDUser
from db.session import SessionLocal
from models.user import User, UserRoleDict, UserRoleRel
from services.userService import UserService
from common.casbin import enforcer

pytest_plugins = ('pytest_asyncio', )

userService = UserService()

userCrud = CRUDUser(User)
roleCrud = CRUDRole(UserRoleDict)
db = SessionLocal()

@pytest.mark.asyncio
class TestUserService:

    async def test_remove_user_role_rel(self):
        await userService._remove_user_role_rel(db, 1, enforcer)

    async def test_add_user_roles_rel(self):
        user_id = 2
        roles = ["project-manager","root"]

        await userService._add_user_roles_rel(
            db,
            user_id,
            roles,
            enforcer
        )


@pytest.mark.asyncio
class TestUserCRUD:

    async def test_get_user_list(self):
        block: int = None
        name: str = None
        role: List[int] = [1,2]
        page_size: int = 20
        current: int = 1

        _res  = await userCrud.get_user_list(
            db=db,
            role_ids=role,
            real_name=name,
            block=block,
            page_size=page_size,
            current_page=current
        )
        user_list_counts = _res[0]
        user_list = _res[1]
        print("count:",user_list_counts)
        for u in user_list:
            print(u.id,u.real_name)
