from crud.base import CRUDBase
from models.user import MenuStore
from sqlalchemy.orm import Session
from schemas.request.menu import Menu, MenuCreate, MenuUpdate


class CRUDmenu(CRUDBase[Menu, MenuCreate, MenuUpdate]):

    async def get_sub_menu_list(self, db: Session):
        query = self.get_exist_data(db).filter(
            self.model.is_delete == 0).filter(self.model.pid != 0).order_by(
                self.model.sort.asc())
        _list = query.all()

        return _list

    async def get_main_menu_list(self, db: Session):
        query = self.get_exist_data(db).filter(
            self.model.is_delete == 0).filter(self.model.pid == 0).order_by(
                self.model.sort.asc())
        _list = query.all()

        return _list

    async def get_sub_menu_by_ids(self, ids, db: Session):
        query = self.get_exist_data(db).filter(
            self.model.is_delete == 0).filter(self.model.pid != 0).order_by(
                self.model.sort.asc())
        _list = query.filter(self.model.id.in_(ids)).all()

        return _list

    async def get_main_menu_by_ids(self, ids, db: Session):
        query = self.get_exist_data(db).filter(
            self.model.is_delete == 0).filter(self.model.pid == 0).order_by(
                self.model.sort.asc())
        _list = query.filter(self.model.id.in_(ids)).all()

        return _list


menuCrud = CRUDmenu(MenuStore)