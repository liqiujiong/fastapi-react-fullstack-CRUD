from fastapi import APIRouter, Depends
from sqlalchemy import true
from api.deps import get_db
from schemas.request.role import SetApiPermissionReq
from schemas.response import resp
from crud.crudInstance import apiStoreCrud
from crud.role import roleApiPermissionCrud
from sqlalchemy.orm import Session
from common.casbin import enforcer
from services.roleService import roleService

router = APIRouter()

@router.get("/all", summary="获取所有API")
async def get_all_api(db:Session = Depends(get_db)):

  _list = await apiStoreCrud.get_multi(db=db,isAll=true)

  group_dict = {}
  for api in _list:
    group_dict.setdefault(api.group, [])
    group_dict[api.group].append(api)

  _res = []
  for key, value in group_dict.items():
    _res.append({
      "key": key,
      "title": key,
      "children": [{
          "key": "leaf-{}".format(api.id),
          "path": api.path,
          "title": api.brief,
          "method": api.request_method
      } for api in value]
    })

  return resp.ok(data=_res)


@router.get("/role/authorized", summary="获取角色已授权API")
async def get_self_authorized_api(
        role_id:int,
        db:Session = Depends(get_db)
    ):
  _list = await roleApiPermissionCrud.get_api_permission_by_role_id(db=db,role_id=role_id)

  _res = []
  for rap in _list:
    _res.append("leaf-{}".format(rap.api_id))

  return resp.ok(data=_res)

@router.put("/permission", summary="更新角色API权限")
async def set_api_permission(req:SetApiPermissionReq, db:Session = Depends(get_db)):

  _res = await roleService.set_role_api_permission(
      db=db,
      role_id=req.role_id,
      api_id=req.api_id,
      enforcer=enforcer
    )

  if not _res:
    return resp.fail(resp.DataUpdateFail)

  return resp.ok()

