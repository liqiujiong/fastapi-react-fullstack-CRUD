from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session, Query
from db.base_class import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):

    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model: ModelType = model

    async def get(self, db: Session, id: Any) -> Optional[ModelType]:
        return db.query(self.model).filter(self.model.id == id).first()

    def get_exist_data(self, db: Session) -> Query:
        query = db.query(self.model)
        if "is_delete" in dir(self.model):
            query.filter(self.model.is_delete == 0)
        return query

    async def get_multi(self,
                        db: Session,
                        *,
                        skip: int = 0,
                        limit: int = 100,
                        isAll: bool = False) -> List[ModelType]:
        q = db.query(self.model)
        if isAll:
            return q.all()
        else:
            return q.offset(skip).limit(limit).all()

    async def create(self, db: Session, *,
                     obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    async def update(
            self, db: Session, *, db_obj: ModelType,
            obj_in: Union[UpdateSchemaType, Dict[str, Any]]) -> ModelType:
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    async def remove(self, db: Session, *, id: int) -> ModelType:
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj


# def paginator(query: ModelSelect, page: int, page_size: int, order_by: str = "id ASC"):
#     count = query.count()
#     if page < 1:
#         page = 1

#     if page_size <= 0:
#         page_size = 10

#     if page_size >= 100:
#         page_size = 100

#     if page == 1:
#         offset = 0
#     else:
#         offset = (page - 1) * page_size

#     query = query.offset(offset).limit(page_size).order_by(SQL(order_by))

#     total_pages = math.ceil(count / page_size)

#     paginate = {
#         "total_pages": total_pages,
#         "count": count,
#         "current_page": page,
#         "pre_page": page - 1 if page > 1 else page,
#         "next_page": page if page == total_pages else page + 1
#     }

#     return list(query.dicts()), paginate
