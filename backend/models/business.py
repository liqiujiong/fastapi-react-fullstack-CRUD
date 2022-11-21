import time
from sqlalchemy import Integer, Boolean, Column, Integer, String,  Text
from db.session import Base


class ProjectModel(Base):
    __tablename__ = "b_project"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    user_id = Column(Integer, comment='发布者id')
    name = Column(String(200), comment='项目名')
    description = Column(Text, comment='项目描述')
    req = Column(Integer, comment='项目难度要求1-5')
    hour = Column(Integer, comment='工作周期(h整点小时)')
    image = Column(String(500), comment='用户上传的图片')
    lib_url = Column(Text, comment='任务附件链接')
    status = Column(Integer,   default=0, comment='0投标中1.选标 2工作中 3审核中 4任务结束(完成、第三次驳回、无中标人)')
    tender_time = Column(Integer, comment='投标截至时间')
    result_time = Column(Integer, comment='出标时间')
    result_user_id = Column(Integer, comment='中标用户id')
    upload_limit = Column(Integer,  default=3, comment='作品上传限制次数,默认3到达三次不允许上传')
    create_time = Column(Integer, default=time.time)
    update_time = Column(Integer, default=time.time, onupdate=time.time)
    is_delete = Column(Boolean, default=0)

class ProjectTenderModel(Base):
    __tablename__ = "b_project_tender"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(Integer, comment='投标项目id')
    user_id = Column(Integer, comment='投标用户id')
    status = Column(Integer, default=0, comment='0默认,1待定,2通过')

    create_time = Column(Integer, default=time.time)
    update_time = Column(Integer, default=time.time, onupdate=time.time)


class ProjectWorkModel(Base):
    __tablename__ = "b_project_work"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(Integer, comment='投标项目id')
    user_id = Column(Integer, comment='投标用户id')
    status = Column(Integer, default=0, comment='0默认未审核,1通过,2驳回')
    work_use_time = Column(Integer, default=0, comment='工作消耗时间(s)')
    work_url = Column(Text, comment='作品内容')
    reason = Column(Text, comment='驳回理由')
    score = Column(Integer, comment='作品评分 差1 中2 好3')
    audit_time = Column(Integer, comment='审核时间')

    create_time = Column(Integer, default=time.time)
    update_time = Column(Integer, default=time.time, onupdate=time.time)

class MessageModel(Base):
    __tablename__ = "b_message"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    type = Column(String(200), comment='消息类型: notification|message|event')
    title = Column(String(200), comment='标题')
    description = Column(Text, comment='描述')
    read = Column(String(200), comment='标题')
    avatar = Column(String(200), comment='头像')
    extra = Column(String(200), comment='Event类型的额外信息')
    status = Column(String(200), comment='Event类型的状态信息')

    create_time = Column(Integer, default=time.time)


class FeedbackModel(Base):
    __tablename__ = "b_feedback"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(200), comment='反馈人')
    description = Column(Text, comment='内容')
    email = Column(String(200), comment='邮箱')

    create_time = Column(Integer, default=time.time)


class CashExtractModel(Base):
    __tablename__ = "b_cash_extract"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    flow_id = Column(Integer, comment='流水ID[日期+当天提现位数]')
    user_id = Column(Integer, comment='用户id')
    finance_user_id = Column(Integer, comment='财务用户id')
    status = Column(Integer, default=0, comment='0默认未审核,1通过,2驳回')
    cash = Column(Integer, default=0, comment='提现金额')
    account = Column(String(200), comment='收款账号')

    audit_time = Column(Integer, default=time.time, onupdate=time.time)
    create_time = Column(Integer, default=time.time)


class ProjectTagModel(Base):
    __tablename__ = "b_project_tag"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    project_id = Column(Integer, comment='项目id')
    name = Column(String(200), comment='标签名')
    is_delete = Column(Boolean, default=0)