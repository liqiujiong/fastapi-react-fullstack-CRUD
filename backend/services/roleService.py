from typing import List
from crud.role import roleRelCrud, roleCrud, roleApiPermissionCrud, roleMenuPermissionCrud
from common.logger import logger
from crud.crudInstance import apiStoreCrud
from models.user import RoleApiPermission, RoleMenuPermission
from sqlalchemy.orm import Session


class RoleService(object):

    def __init__(self):
        pass

    async def set_role_menu_permission(self, db: Session, role_id: int,
                                       menu_id: List[int]) -> bool:
        _removed = await roleMenuPermissionCrud.remove_role_menu_permission(
            db, role_id)

        obj_list = [
            RoleMenuPermission(
                role_id=role_id,
                menu_id=o,
            ) for o in menu_id
        ]
        db.bulk_save_objects(obj_list)
        db.commit()

        return True

    async def remove_role_api_permission(self,
                                         db: Session,
                                         role_id,
                                         enforcer=None):
        role = await roleCrud.get(db=db, id=role_id)

        query = db.query(RoleApiPermission).filter(
            RoleApiPermission.role_id == role_id)
        rap_list = query.all()

        api_ids = [rap.api_id for rap in rap_list]
        api_list = await apiStoreCrud.get_api_by_ids(db, api_ids)

        rules = [[role.name, api.path, api.request_method, "true"]
                 for api in api_list]
        _removed = True
        if rules:
            _removed = enforcer.remove_policies(rules)

        if _removed:
            # query = BaseQueryService().get_exist_data(RoleApiPermission).filter(RoleApiPermission.role_id == role_id)
            query.delete()

        return _removed

    async def set_role_api_permission(self,
                                      db: Session,
                                      role_id,
                                      api_id=[],
                                      enforcer=None):
        _removed = await self.remove_role_api_permission(db,
                                                         role_id,
                                                         enforcer=enforcer)
        role = await roleCrud.get(db=db, id=role_id)

        logger.info("[_removed status]:{}-{}".format(role.name, _removed))
        if not _removed:
            return _removed

        api_list = await apiStoreCrud.get_api_by_ids(db, api_id)
        rules = [[role.name, api.path, api.request_method, "true"]
                 for api in api_list]
        _added = enforcer.add_policies(rules)
        logger.info("[_added status]:{}-{}".format(role.name, _added))

        if _added:
            obj_list = [
                RoleApiPermission(
                    role_id=role_id,
                    api_id=o,
                ) for o in api_id
            ]
            db.bulk_save_objects(obj_list)
            db.commit()

        return _added

    # async def add_user_role_rel(self,db, userRoleRel, user_dingding_id, role_name,
    #                       enforcer):
    #     db.add(userRoleRel)
    #     BaseQueryService().get_exist_data()
    #     urr_id = userRoleRel.id
    #     added = enforcer.add_grouping_policy(user_dingding_id, role_name)
    #     logger.info("[add_grouping_policy result] {}".format(added))
    #     # added = enforcer.add_named_grouping_policy("g", user_dingding_id, role_name)
    #     if added:
    #         db.session.commit()

    #         return True

    #     return False

    # async def remove_user_roles(self ):
    #   pass

    # async def set_user_roles(self, db:Session,user_id:int, roles:List[str], enforcer):

    #   pass

    # def check_user_api_permission(self, user_id, path="", request_method="GET", enforcer=None):
    #   user_role_list = userService.get_user_role_by_user_id(user_id)
    #   _res = False
    #   _res = enforcer.enforce(dingding_user_id, path, request_method) or _res

    #   return _res


roleService = RoleService()
