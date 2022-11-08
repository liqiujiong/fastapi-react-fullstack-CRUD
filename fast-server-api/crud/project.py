import pstats
from typing import List

from sqlalchemy import and_
from crud.base import CRUDBase
from sqlalchemy.orm import Session
from models.business import ProjectModel, ProjectTagModel, ProjectTenderModel, ProjectWorkModel
from schemas.request.project import Project, ProjectCreate, ProjectTenderCreate, ProjectTenderUpdate, ProjectUpdate, ProjectTag, ProjectTagCreate, ProjectTagUpdate, ProjectWorkCreate, ProjectWorkUpdate


class CRUDproject(CRUDBase[ProjectModel, ProjectCreate, ProjectUpdate]):

    async def get_project_list(self,
                               db: Session,
                               status: int = None,
                               startDate: str = None,
                               endDate: str = None,
                               name: str = None,
                               user_id: int = None):

        query = self.get_exist_data(db)

        if status:
            query = query.filter(self.model.status == status)

        if startDate:
            query = query.filter(self.model.create_time >= startDate)

        if endDate:
            query = query.filter(self.model.create_time <= endDate)

        if name:
            query = query.filter(self.model.name.like('%{}%'.format(name)))

        if user_id:
            query = query.filter(self.model.user_id == user_id)

        return query.all()


projectCrud = CRUDproject(ProjectModel)


class CRUDprojectTag(CRUDBase[ProjectTagModel, ProjectTagCreate,
                              ProjectTagUpdate]):

    async def delete_tag_translation(self,
                                     db: Session,
                                     project_id: int,
                                     is_real_delete: bool = True):
        tag_objects = db.query(
            self.model).filter(self.model.project_id == project_id)
        count = 0
        if is_real_delete:
            count = tag_objects.delete()
        else:
            tag_objects.update({self.model.is_delete: True})
        db.flush()
        return count

    async def create_tag_list_translation(self, db: Session, project_id: int,
                                          tag: List[str]):
        tag_objects = [self.model(name=o, project_id=project_id) for o in tag]
        db.add_all(tag_objects)
        db.flush()


class CRUDprojectTender(CRUDBase[ProjectTenderModel, ProjectTenderCreate,
                                 ProjectTenderUpdate]):

    async def get_tender(self, db: Session, project_id: int, user_id: int):
        return db.query(self.model).filter(
            and_(self.model.project_id == project_id,
                 self.model.user_id == user_id)).first()


class CRUDprojectWork(CRUDBase[ProjectWorkModel, ProjectWorkCreate,
                               ProjectWorkUpdate]):

    async def get_work_list(self, db: Session, project_id: int,
                            status: List[int] = None) -> List[ProjectWorkModel]:
        query =  db.query(self.model).filter(self.model.project_id == project_id)

        if(status):
            query = query.filter(self.model.status.in_(status))

        query = query.order_by(self.model.create_time.desc())

        return query.all()
