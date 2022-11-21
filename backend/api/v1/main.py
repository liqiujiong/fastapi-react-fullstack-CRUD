from fastapi import APIRouter
from api.v1 import common, user, apis, role, menu,project,project_tender,project_work

api_v1_router = APIRouter()
api_v1_router.include_router(project.router, prefix="/project", tags=["Project 项目管理"])
api_v1_router.include_router(project_tender.router, prefix="/project/tender", tags=["Project tender 投标管理"])
api_v1_router.include_router(project_work.router, prefix="/project/work", tags=["Project work 作品管理"])
api_v1_router.include_router(user.router, prefix="/user", tags=["User 用户管理"])
api_v1_router.include_router(role.router, prefix="/role", tags=["Role 角色管理"])
api_v1_router.include_router(apis.router, prefix="/apis", tags=["Apis API管理"])
api_v1_router.include_router(menu.router, prefix="/menu", tags=["Menu 菜单管理"])

api_v1_router.include_router(common.router, prefix="/base", tags=["Common 公共接口"])