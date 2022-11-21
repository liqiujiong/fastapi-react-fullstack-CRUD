from typing import List
from crud.base import CRUDBase
from models.user import RoleApiPermission, UserRoleDict, UserRoleRel, RoleMenuPermission
from schemas.request.role import RoleApiPermissionCreate, RoleApiPermissionUpdate, RoleCreate, RoleMenuPermissionCreate, RoleMenuPermissionUpdate, RoleUpdate, RoleRelCreate, RoleRelUpdate
from sqlalchemy.orm import Session


class CRUDRole(CRUDBase[UserRoleDict, RoleCreate, RoleUpdate]):

    async def get_role_by_role_name(self, db: Session,
                                    role_name) -> UserRoleDict:
        return db.query(
            self.model).filter(self.model.name == role_name).first()

    async def get_roles_by_user_id(self, db:Session, user_id) -> List[UserRoleDict]:
        return db.query(self.model).filter(UserRoleRel.role_id == self.model.id,
                                            UserRoleRel.user_id == user_id).all()

roleCrud = CRUDRole(UserRoleDict)


class CRUDRoleRel(CRUDBase[UserRoleRel, RoleRelCreate, RoleRelUpdate]):

    async def get_role_user_count(self, db: Session, role_id: int) -> int:
        return self.get_exist_data(db=db).filter(
            UserRoleRel.role_id == role_id).count()

    async def get_user_role_by_user_id(self, db: Session, user_id) -> List:
        return db.query(self.model).filter(self.model.user_id == user_id).all()


    async def remove_rel_by_user_id(self, db: Session, user_id) -> int:
        return db.query(self.model).filter(self.model.user_id == user_id).delete()

roleRelCrud = CRUDRoleRel(UserRoleRel)


class CRUDroleMenuPermission(CRUDBase[RoleMenuPermission,
                                      RoleMenuPermissionCreate,
                                      RoleMenuPermissionUpdate]):

    async def get_menu_ids_by_role_ids(self, db: Session, role_ids) -> List:
        return db.query(self.model).filter(
            self.model.role_id.in_(role_ids)).all()

    async def get_menu_ids_by_role_id(self, db: Session, role_id) -> List:
        return db.query(self.model).filter(self.model.role_id == role_id).all()

    async def remove_role_menu_permission(self, db: Session, role_id):
        return db.query(
            self.model).filter(RoleMenuPermission.role_id == role_id).delete()


roleMenuPermissionCrud = CRUDroleMenuPermission(RoleMenuPermission)


class CRUDroleApiPermission(CRUDBase[RoleApiPermission,
                                     RoleApiPermissionCreate,
                                     RoleApiPermissionUpdate]):

    async def get_api_permission_by_role_id(self, db: Session,
                                            role_id) -> List:
        return db.query(self.model).filter(self.model.role_id == role_id).all()


roleApiPermissionCrud = CRUDroleApiPermission(RoleApiPermission)
