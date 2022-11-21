

from api import deps
from sqlalchemy.orm import Session
from fastapi import Depends
from crud.role import roleCrud


class TestRole:
    async def test_get_role_user_count(self,db=Depends(deps.get_db)):
        print(await roleCrud.get_role_user_count(db,1))