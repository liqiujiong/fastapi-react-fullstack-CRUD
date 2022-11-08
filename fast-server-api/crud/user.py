from typing import List, Tuple
from crud.base import CRUDBase
from models.user import User, UserRoleRel
from sqlalchemy.orm import Session
from schemas.request.user import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):

    @classmethod
    async def get_user_by_phone(cls, db: Session, phone: str = '') -> User:
        query = db.query(User)
        if phone != '':
            query = query.filter(User.phone == phone)
        return query.first()

    async def update_user_block_status(self, db: Session, user_id: int,
                                       block: int):
        user = await self.get(db, user_id)
        user.is_block = block
        db.commit()
        return 1

    async def get_user_list(self,
                            db: Session,
                            role_ids: List[str] = None,
                            real_name: str = None,
                            block: int = None,
                            page_size = 20,
                            current_page=1
                            ):

        query = self.get_exist_data(db)

        if role_ids:
            query = query.filter(self.model.id == UserRoleRel.user_id,
                         UserRoleRel.role_id.in_(role_ids))

        if real_name:
            query = query.filter(self.model.real_name.like('%{}%'.format(real_name)))

        if block:
            query = query.filter(self.model.is_block == block)

        count = query.count()
        res = query.limit(page_size).offset((current_page - 1) * page_size).all()
        return (
            count,
            res
        )


userCrud = CRUDUser(User)
