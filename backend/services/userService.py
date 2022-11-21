from typing import List
from sqlalchemy import false
from sqlalchemy.orm import Session
from common.casbin import enforcer
from crud.role import CRUDRole, CRUDRoleRel
from crud.user import userCrud
from models.user import User, UserRoleDict, UserRoleRel
from common.logger import logger
from casbin.enforcer import Enforcer

crudRole = CRUDRole(UserRoleDict)
crudRoleRel = CRUDRoleRel(UserRoleRel)


class UserService(object):

    def __init__(self):
        pass

    async def _remove_user_role_rel(self, db: Session, user_id: int,
                                    enforcer: Enforcer) -> bool:
        removed = True

        # 清除关系表
        count = await crudRoleRel.remove_rel_by_user_id(db=db, user_id=user_id)

        # 清除权限表
        removed = enforcer.delete_roles_for_user(str(user_id))
        logger.info("[remove_grouping_policy result] user:{} --->{}".format(
            user_id, removed))

        logger.info("[remove_rel_by_user_id result] user:{} --->{}".format(
            user_id, count))

        db.commit()

        return True

    async def _add_user_roles_rel(self, db: Session,
                                  user_id: int, roles: List[str], enforcer):

        userRolesRel = []
        for role_name in roles:
            role = await crudRole.get_role_by_role_name(db, role_name)
            userRolesRel.append(UserRoleRel(user_id=user_id, role_id=role.id))

        rules = [[user_id, o] for o in roles]
        added = True
        for rule in rules:
            added = enforcer.add_role_for_user(str(rule[0]), rule[1])
            logger.info("[add_role_for_user result]user:{} role:{} --->{}".format(
                rule[1], user_id ,added))
            if added == False:
                return False

        if added:
            db.bulk_save_objects(userRolesRel)
            db.commit()

            return True

        return False

    async def set_user_roles(self, db: Session, user_id: int, roles: List[str],
                             enforcer) -> bool:

        remove_status = await self._remove_user_role_rel(db, user_id, enforcer)

        if remove_status:
            add_status = await self._add_user_roles_rel(db=db,
                                                        user_id=user_id,
                                                        enforcer=enforcer,
                                                        roles=roles)

            if add_status:
                return True

        return False


userService = UserService()
