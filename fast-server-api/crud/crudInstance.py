
from typing import List
from sqlalchemy.orm import Session
from crud.base import CRUDBase
from models.user import ApiStore
from schemas.request.apiStore import ApiStoreCreate, ApiStoreUpdate
class CRUDapiStore(CRUDBase[ApiStore, ApiStoreCreate, ApiStoreUpdate]):
    async def get_api_by_ids(self,db:Session, api_ids:List[int]) -> List[ApiStore]:
        return self.get_exist_data(db).filter(self.model.id.in_(api_ids)).all()

apiStoreCrud = CRUDapiStore(ApiStore)

