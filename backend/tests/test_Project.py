from fastapi import Depends
from psutil import users
import pytest
from db.session import SessionLocal
from crud.project import projectCrud

pytest_plugins = ('pytest_asyncio', )

db = SessionLocal()

@pytest.mark.asyncio
class TestProject:

    # async def test_create_project(self):

    async def test_update_project(self):
        pj = await projectCrud.get(db,id=1)
        pj.user_id = 8888
        await projectCrud.update(db,pj)

        print("==========={}".format(pj))
