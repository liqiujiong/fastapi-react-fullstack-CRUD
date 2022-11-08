import traceback
from fastapi import APIRouter, Depends, Query
from api import deps
from crud.project import CRUDproject
from models.business import ProjectModel
from schemas.request.project import Project, ProjectTenderCreate, ProjectTenderUpdate, ProjectUpdate
from schemas.response import resp
from sqlalchemy.orm import Session
from services.projectService import ProjectService

router = APIRouter()

projectService = ProjectService()
projectCrud = CRUDproject(ProjectModel)


@router.post("/", summary="用户投标 - 前台")
async def project_tender(req: ProjectTenderCreate,
                         user_id: int = Depends(deps.get_user_id),
                         db: Session = Depends(deps.get_db)):
    id = await projectService.project_tender(db,
                                            project_id=req.project_id,
                                            user_id=user_id)
    return resp.ok(data={"id":id})


@router.post("/ready", summary="待定投标者")
async def project_tender_ready(req: ProjectTenderUpdate,
                               db: Session = Depends(deps.get_db),
                               user_id: int = Depends(deps.get_user_id)):
    id = await projectService.project_tender_ready(db,
                                            project_id=req.project_id,
                                            user_id=req.user_id)

    return resp.ok(data={"id":id})


@router.post("/finally", summary="选定投标者")
async def project_tender_finally(req: ProjectTenderUpdate,
                                 db: Session = Depends(deps.get_db),
                                 user_id: int = Depends(deps.get_user_id)):
    id = await projectService.project_tender_finally(db,
                                            project_id=req.project_id,
                                            user_id=req.user_id)

    return resp.ok(data={"id":id})
