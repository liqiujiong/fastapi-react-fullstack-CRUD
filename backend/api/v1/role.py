from fastapi import APIRouter, Depends
from sqlalchemy import true
from api.deps import get_db
from schemas.request.role import SetUserRole
from schemas.response import resp
from crud.role import roleCrud, roleRelCrud
from sqlalchemy.orm import Session
from crud.user import userCrud

router = APIRouter()


@router.get("/", summary="获取角色列表")
async def get_role_list(db: Session = Depends(get_db)):

    _list = await roleCrud.get_multi(db=db, isAll=true)

    return resp.ok(data=[{
        "id":
        item.id,
        "title":
        item.title,
        "name":
        item.name,
        "user_counts":
        await roleRelCrud.get_role_user_count(db=db, role_id=item.id)
    } for item in _list])
