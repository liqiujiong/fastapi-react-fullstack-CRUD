from fastapi import APIRouter, Depends
from api.deps import get_db, get_user_id
from schemas.request.role import SetMenuPermissionReq
from schemas.response import resp
from crud.menu import menuCrud
from crud.role import roleRelCrud, roleMenuPermissionCrud
from sqlalchemy.orm import Session

from services.roleService import roleService

router = APIRouter()


@router.get("/all", summary="获取所有菜单")
async def get_all_menu(db: Session = Depends(get_db)):
    #获取主菜单
    main_menu_list = await menuCrud.get_main_menu_list(db=db)

    #获取子菜单
    sub_menu_list = await menuCrud.get_sub_menu_list(db=db)

    #构建主菜单字典，根据id获取主菜单
    main_menu_dict = {o.id: o for o in main_menu_list}

    #构建分类字典，分类子菜单
    class_menu_dict = {o.id: [] for o in main_menu_list}
    for sub_menu in sub_menu_list:
        class_menu_dict[sub_menu.pid].append(sub_menu)

    _res = []
    for key in class_menu_dict.keys():
        _res.append({
            "key":
            key,
            "title":
            main_menu_dict[key].name,
            "children": [{
                "key": "leaf-{}".format(sub_menu.id),
                "title": sub_menu.name
            } for sub_menu in class_menu_dict[key]]
        })

    return resp.ok(data=_res)


@router.get("/role/authorized", summary="获取角色已授权菜单")
async def get_role_authorized_menu(role_id: str,
                                   db: Session = Depends(get_db)):
    _list = await roleMenuPermissionCrud.get_menu_ids_by_role_id(db, role_id)

    menu_id = [o.menu_id for o in _list]

    sub_menu_list = await menuCrud.get_sub_menu_by_ids(menu_id, db=db)
    main_menu_list = await menuCrud.get_main_menu_by_ids(menu_id, db=db)

    _res = []
    for main_menu in main_menu_list:
        _res.append(main_menu.id)

    for sub_menu in sub_menu_list:
        _res.append("leaf-{}".format(sub_menu.id))

    print(_res)
    return resp.ok(data=_res)


@router.get("/user/authorized", summary="获取用户已授权菜单")
async def get_user_authorized_menu(user_id: int = Depends(get_user_id),
                                   db: Session = Depends(get_db)):

    #先从 role Rel拿到用户的角色列表
    user_role_list = await roleRelCrud.get_user_role_by_user_id(
        db=db, user_id=user_id)
    role_ids = [o.id for o in user_role_list]

    # 通过角色列表去从 menu permission中拿到permission_menu_id
    rmp = await roleMenuPermissionCrud.get_menu_ids_by_role_ids(
        db=db, role_ids=role_ids)

    permission_menu_id = [o.menu_id for o in rmp]

    sub_menu_list = await menuCrud.get_sub_menu_by_ids(ids=permission_menu_id,
                                                       db=db)
    sub_menu_id = [o.id for o in sub_menu_list]

    main_menu_list = await menuCrud.get_main_menu_by_ids(
        ids=permission_menu_id, db=db)
    main_menu_id = [o.pid for o in main_menu_list]

    #构建主菜单字典，根据id获取主菜单
    main_menu_dict = {o.id: o for o in main_menu_list}

    #构建分类字典，分类子菜单
    class_menu_dict = {o.id: [] for o in main_menu_list}
    for sub_menu in sub_menu_list:
        class_menu_dict[sub_menu.pid].append(sub_menu)

    _res = []
    for key in class_menu_dict.keys():
        _res.append({
            "key":
            key,
            "name":
            main_menu_dict[key].name,
            "icon":
            main_menu_dict[key].icon,
            "en_name":
            main_menu_dict[key].en_name,
            "path":
            main_menu_dict[key].path,
            "pid":
            main_menu_dict[key].pid,
            "sort":
            main_menu_dict[key].sort,
            "children": [{
                "key": "leaf-{}".format(sub_menu.id),
                "name": sub_menu.name,
                "icon": sub_menu.icon,
                "en_name": sub_menu.en_name,
                "path": sub_menu.path,
                "pid": sub_menu.pid,
                "sort": sub_menu.sort,
                "children": []
            } for sub_menu in class_menu_dict[key]]
        })

    return resp.ok(data=_res)


@router.put("/permission", summary="更新角色授权菜单")
async def set_menu_permission(req: SetMenuPermissionReq,
                              db: Session = Depends(get_db)):
    await roleService.set_role_menu_permission(db=db,
                                               role_id=req.role_id,
                                               menu_id=req.menu_id)
    return resp.ok()