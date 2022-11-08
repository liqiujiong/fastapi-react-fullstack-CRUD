import time
import config
from datetime import timedelta,datetime,timezone
from typing import List, Optional
from common.logger import logger
from crud.project import CRUDproject, CRUDprojectTag, CRUDprojectTender, CRUDprojectWork
from crud.user import CRUDUser
from models.business import ProjectModel, ProjectTagModel, ProjectTenderModel, ProjectWorkModel
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from models.user import User
from schemas.request.project import ProjectCreate, ProjectUpdate

crudProjectTag = CRUDprojectTag(ProjectTagModel)
crudProject = CRUDproject(ProjectModel)
crudProjectTender = CRUDprojectTender(ProjectTenderModel)
crudProjectWork = CRUDprojectWork(ProjectWorkModel)
crudUser = CRUDUser(User)

class ProjectService(object):

    def __init__(self):
        s_t = [int(i) for i in config.START_TIME.split(':')]
        e_t = [int(i) for i in config.END_TIME.split(':')]
        self.start_delta = timedelta(hours=s_t[0],minutes=s_t[1],seconds=s_t[2])
        self.end_delta = timedelta(hours=e_t[0],minutes=e_t[1],seconds=e_t[2])


    async def create_project(self, db: Session, req: ProjectCreate,
                             user_id: int) -> Optional[int]:
        tag_list = req.tag
        del req.tag

        # 1.插入project
        project = ProjectModel(**req.dict())
        project.user_id = user_id
        db.add(project)
        db.flush()
        project_id = project.id

        # 2.插入tag
        await crudProjectTag.create_tag_list_translation(
            db, project_id, tag_list)

        logger.info("project_id：{}，name:{},tag:{} 创建成功".format(
            project_id, project.name, tag_list))
        db.commit()
        return project_id

    async def update_project(
        self,
        db: Session,
        req: ProjectUpdate,
    ) -> Optional[int]:
        tag_list = req.tag
        del req.tag

        # 1.更新project
        project = await crudProject.get(db, req.id)
        assert project, 'project id:{}不存在'.format(project_id)

        obj_data = jsonable_encoder(project)
        project_id = project.id
        for field in obj_data:
            if field in req.dict():
                setattr(project, field, req.dict()[field])

        # 2.更新tag
        await crudProjectTag.delete_tag_translation(db, project_id)
        await crudProjectTag.create_tag_list_translation(
            db, project_id, tag_list)

        db.commit()
        logger.info("project_id：{}，name:{},tag:{} 创建成功".format(
            project_id, project.name, tag_list))
        return project_id

    async def delete_project(self, db: Session, project_id: int):
        project = await crudProject.get(db, project_id)
        assert project, 'project id:{}不存在'.format(project_id)

        project.is_delete = True

        await crudProjectTag.delete_tag_translation(db=db,
                                                    project_id=project_id,
                                                    is_real_delete=False)
        db.commit()

    async def project_tender(self, db: Session, project_id: int, user_id: int):
        """
        用户发起投标,
        1. 接口仅“平台用户”角色调用 - RBAC控制
        2. 处于投标中的项目才可以
        3. 不可以重复投标
        return: Service 层抛异常，成功返回投标id
        """
        pj: ProjectModel = await crudProject.get(db, project_id)
        assert pj, 'project id:{},项目不存在'.format(project_id)

        assert pj.status == config.PROJECT_STATUS_TENDERING, \
                'project id:{},项目当前状态不允许投标'.format(project_id)

        pjt: ProjectTenderModel = await crudProjectTender.get_tender(
            db, project_id, user_id)
        assert not pjt, 'user id:{},您已经投过此标'.format(user_id)

        pjt = ProjectTenderModel(project_id=project_id,
                                 user_id=user_id,
                                 status=config.PROJECT_TENDER_STATUS_DEFAULT)
        db.add(pjt)
        db.flush()
        db.commit()
        return pjt.id

    async def project_tender_ready(self, db: Session, project_id: int,
                                   user_id: int):
        """
        待定投标者
        """
        pjt: ProjectTenderModel = await crudProjectTender.get_tender(
            db, project_id, user_id)
        assert pjt, 'user id:{},没有投标'.format(user_id)

        pjt.status = config.PROJECT_TENDER_STATUS_READY

        db.commit()
        return pjt.id

    async def project_tender_finally(self, db: Session, project_id: int,
                                     user_id: int):
        """
        选定中标者
        0. user_id已投标
        1. 只允许一个中标者
        2. TODO 到达出标时间 更新project中的result_user_id - 周期脚本
        """
        finally_tender: ProjectTenderModel = db.query(ProjectTenderModel) \
                        .filter(ProjectTenderModel.status == config.PROJECT_TENDER_STATUS_PASS).first()
        assert not finally_tender, '该项目user id:{},已经中标'.format(
            finally_tender.user_id)

        pjt: ProjectTenderModel = await crudProjectTender.get_tender(
            db, project_id, user_id)
        assert pjt, 'user id:{},没有投标'.format(user_id)
        pjt.status = config.PROJECT_TENDER_STATUS_PASS

        db.commit()
        return pjt.id

    async def project_work_submit(self, db: Session, project_id: int,
                                  user_id: int, work_url: str):
        """
        用户提交作品
        1. 用户是中标者
        2. 提交次数不超过提交限制
        3. 更新project状态
        """
        pj: ProjectModel = await crudProject.get(db, project_id)
        assert pj, 'project id:{},项目不存在'.format(project_id)

        assert pj.status == config.PROJECT_STATUS_WORKING, \
                'project id:{},项目当前状态不允许提交作品'.format(project_id)

        assert pj.result_user_id == user_id, \
                'project id:{},您不是中标者'.format(project_id)

        work_list = await crudProjectWork.get_work_list(db=db,
                                                  project_id=project_id)

        assert len(work_list) < pj.upload_limit, \
                'project id:{},已达到可提交次数'.format(project_id)

        pj.status = config.PROJECT_STATUS_AUDIT
        pjw = ProjectWorkModel(project_id=project_id,
                                user_id=user_id,
                                work_url=work_url,
                                status=config.PROJECT_WORK_STATUS_DEFAULT)

        db.add(pjw)
        db.flush()
        db.commit()
        return pjw.id

    def get_consume_time(self,start_time,end_time):
        """
        时间计算函数
        传入start_time,end_time, 去掉中间经过运营的时间
        """
        res = 0
        seconds = 0
        end_datetime = datetime.fromtimestamp(end_time, tz=timezone(
        timedelta(hours=8)))
        while start_time + seconds < end_time:
            temp_now = start_time + seconds
            temp_datetime = datetime.fromtimestamp(temp_now, tz=timezone(
            timedelta(hours=8)))

            # 剪枝：中间的天数
            day = (end_datetime - temp_datetime).days - 2
            if day > 0:
                add_res = (self.end_delta-self.start_delta).seconds * day
                res = res + add_res
                seconds = seconds + (86400 * day)
                continue

            temp_delta = timedelta(hours=temp_datetime.hour,minutes=temp_datetime.minute,seconds=temp_datetime.second)

            if temp_delta >= self.start_delta and temp_delta < self.end_delta:
                #在工作时间段内, 消耗时间+1s
                res = res + 1

            seconds = seconds + 1

        print(seconds)
        return res


    async def project_work_reject(self, db: Session, project_id: int,
                                user_id: int, reason:str):
        """
        驳回项目作品
        1. 更新项目状态
        2. 计算消耗时间
        3. 更新作品
        """
        pjw_list: List[ProjectWorkModel] = await crudProjectWork.get_work_list(db,project_id)
        for p in pjw_list:
            print(p.id,p.audit_time)
        pjw = pjw_list[0]
        pj: ProjectModel = await crudProject.get(db,pjw.project_id)

        assert pj.status == config.PROJECT_STATUS_AUDIT and \
                pjw.status == config.PROJECT_WORK_STATUS_DEFAULT, \
                    '当前项目不需要审核'

        # 更新project状态
        if len(pjw_list) >= pj.upload_limit:
            pj.status = config.PROJECT_STATUS_END
        else:
            pj.status = config.PROJECT_STATUS_WORKING

        # 计算时间
        end_time = pjw.create_time
        if len(pjw_list) > 1:
            start_time = pjw_list[1].audit_time
        else:
            start_time = pj.result_time
        pjw.work_use_time = self.get_consume_time(start_time,end_time)

        print(len(pjw_list),len(pjw_list) > 1,start_time,end_time,pjw.work_use_time)
        # 更新work信息
        pjw.audit_time = int(time.time())
        pjw.reason = reason
        pjw.status = config.PROJECT_WORK_STATUS_REJECT

        db.commit()

    async def project_work_solve(self, db: Session, project_id: int,
                                user_id: int, score:int):
        """
        通过项目作品
        """
        pjw_list: List[ProjectWorkModel] = await crudProjectWork.get_work_list(db,project_id)
        for p in pjw_list:
            print(p.id,p.audit_time)
        pjw = pjw_list[0]
        pj: ProjectModel = await crudProject.get(db,pjw.project_id)

        assert pj.status == config.PROJECT_STATUS_AUDIT and \
                pjw.status == config.PROJECT_WORK_STATUS_DEFAULT, \
                    '当前项目不需要审核'

        assert int(score) in [1,2,3],'请选择正确的分数'

        pj.status = config.PROJECT_STATUS_END

        # 计算时间
        end_time = pjw.create_time
        if len(pjw_list) > 1:
            start_time = pjw_list[1].audit_time
        else:
            start_time = pj.result_time
        pjw.work_use_time = self.get_consume_time(start_time,end_time)

        print(len(pjw_list),len(pjw_list) > 1,start_time,end_time,pjw.work_use_time)
        # 更新信息
        pjw.audit_time = int(time.time())
        pjw.score = score
        pjw.status = config.PROJECT_WORK_STATUS_REJECT

        # 给result_user_id增加积分和钱
        user:User = await crudUser.get(db,pj.result_user_id)
        coin = user.coin
        coin = coin + (config.COIN_HOUR_DICT[pj.req] * pj.hour)
        cash = user.cash
        cash = cash + (config.CASH_HOUR_DICT[pj.req] * pj.hour * config.COIN_RATE_DICT[int(score)])
        user.coin = coin
        user.cash = cash

        db.commit()

