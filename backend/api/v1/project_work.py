import traceback
from fastapi import APIRouter, Depends, Query
from api import deps
from crud.project import CRUDproject
from models.business import ProjectModel
from schemas.request.project import  ProjectWorkCreate, ProjectWorkReject, ProjectWorkSolve
from schemas.response import resp
from sqlalchemy.orm import Session
from services.projectService import ProjectService

router = APIRouter()

projectService = ProjectService()
projectCrud = CRUDproject(ProjectModel)


@router.post("/", summary="用户提交作品 - 前台")
async def project_work_submit(req: ProjectWorkCreate,
                         user_id: int = Depends(deps.get_user_id),
                         db: Session = Depends(deps.get_db)):
    id = await projectService.project_work_submit(db,
                                            project_id=req.project_id,
                                            user_id=user_id,
                                            work_url=req.work_url)
    return resp.ok(data={"id":id})


@router.post("/reject", summary="驳回项目作品")
async def project_work_reject(req: ProjectWorkReject,
                               db: Session = Depends(deps.get_db),
                               user_id: int = Depends(deps.get_user_id)):
    id = await projectService.project_work_reject(db,
                                            project_id=req.project_id,
                                            reason=req.reason,
                                            user_id=user_id)

    return resp.ok()


@router.post("/solve", summary="通过项目作品")
async def project_work_solve(req: ProjectWorkSolve,
                                 db: Session = Depends(deps.get_db),
                                 user_id: int = Depends(deps.get_user_id)):
    id = await projectService.project_work_solve(db,
                                            project_id=req.project_id,
                                            score=req.score,
                                            user_id=user_id)

    return resp.ok()
