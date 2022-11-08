import traceback
import config
from fastapi import APIRouter, Depends, Query
from api import deps
from crud.project import CRUDproject
from crud.role import CRUDRole
from models.business import ProjectModel
from models.user import UserRoleDict
from schemas.request.project import Project, ProjectBase, ProjectCreate, ProjectUpdate
from schemas.response import resp
from sqlalchemy.orm import Session
from services.projectService import ProjectService


router = APIRouter()

projectService = ProjectService()
projectCrud = CRUDproject(ProjectModel)
roleCrud = CRUDRole(UserRoleDict)

@router.post("/create", summary="创建项目")
async def create_project(
        req:ProjectCreate,
        user_id: int = Depends(deps.get_user_id),
        db: Session = Depends(deps.get_db)
):
    try:
        id = await projectService.create_project(db,req,user_id)
        return resp.judge_by_data(data={"id":id})
    except Exception as e:
        traceback.print_exc()
        return resp.fail(resp.DataStoreFail)

@router.post("/update", summary="更新项目")
async def update_project(
        req:ProjectUpdate,
        db: Session = Depends(deps.get_db),
        user_id: int = Depends(deps.get_user_id)
):
    try:
        id = await projectService.update_project(db,req)
        return resp.judge_by_data(data={"id":id})
    except Exception as e:
        traceback.print_exc()
        return resp.fail(resp.DataUpdateFail)

@router.post("/delete", summary="删除项目")
async def delete_project(
        req:Project,
        db: Session = Depends(deps.get_db),
        user_id: int = Depends(deps.get_user_id)
):
    id = await projectService.delete_project(db=db,project_id=req.id)
    return resp.ok()

@router.get("/list", summary="获取项目列表 - 后台")
async def get_project_list_manage(
        status: str = None,
        startDate: str = None,
        endDate: str = None,
        name: str = None,
        user_id: int = Depends(deps.get_user_id),
        db: Session = Depends(deps.get_db)
    ):
    """
    数据访问权限：如果是管理员，获取全部；否则只能获取自己
    """
    user_role_list = await roleCrud.get_roles_by_user_id(
        db=db, user_id=user_id)
    role_names = [o.name for o in user_role_list]
    if config.ROLE_DICT_ROOT in role_names:
        user_id = None

    _res = await projectCrud.get_project_list(
            db=db,
            status=status,
            startDate=startDate,
            endDate=endDate,
            name=name,
            user_id=user_id
        )

    return resp.ok(data={
            "total":
            len(_res),
            "pageSize":
            "pageSize",
            "current":
            "current",
            "list": _res
        }
    )

@router.get("/guest", summary="获取项目列表 - 前台")
async def get_user_list(
        db: Session = Depends(deps.get_db)
    ):

    _res = await projectCrud.get_project_list(
            db=db,
        )

    return resp.ok(data={
            "total":
            len(_res),
            "pageSize":
            "pageSize",
            "current":
            "current",
            "list": _res
        }
    )