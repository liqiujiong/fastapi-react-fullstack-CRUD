import time
from sqlalchemy import TIMESTAMP, Boolean, Column, Integer, String,  Text, Float
from db.session import Base


class User(Base):
    __tablename__ = "base_user"

    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    nickname = Column(String(200), comment='昵称')
    password = Column(String(200), comment='密码')
    email = Column(String(200), comment='邮箱')
    school = Column(String(200), comment='学校')
    phone = Column(String(200), unique=True, comment='手机号')
    wechat = Column(String(200), comment='微信号')
    real_name = Column(String(200), comment='真实姓名')
    id_card = Column(String(200), comment='身份证')
    pay_account = Column(String(200), comment='收款账号')

    cash = Column(Float, comment='账户可用余额')
    cash_extract = Column(Float, comment='用户在提现金额')
    coin = Column(Integer, comment='账户积分')

    is_block = Column(Boolean, default=0)
    create_time = Column(Integer, default=time.time)
    update_time = Column(Integer, default=time.time, onupdate=time.time)


class UserRoleDict(Base):
    __tablename__ = "base_role_dict"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500))
    name = Column(String(500))
    is_delete = Column(Boolean, default=0)
    sort_order = Column(Integer)


class UserRoleRel(Base):
    __tablename__ = "base_user_role_rel"
    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer)
    user_id = Column(Integer)
    is_delete = Column(Boolean, default=0)


class ApiStore(Base):
    __tablename__ = "base_api_store"
    id = Column(Integer, primary_key=True, autoincrement=True)
    path = Column(String(200), comment='接口路径')
    group = Column(String(500), comment='所属组')
    brief = Column(Text, comment='接口描述')
    request_method = Column(String(200), comment='请求方法')
    is_delete = Column(Boolean, default=0)


class RoleApiPermission(Base):
    __tablename__ = "base_role_api_permission"
    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer)
    api_id = Column(Integer)


class MenuStore(Base):
    __tablename__ = "base_menu_store"
    id = Column(Integer, primary_key=True, autoincrement=True)
    pid = Column(Integer, comment='父id')
    name = Column(String(200))
    en_name = Column(String(200))
    icon = Column(String(200))
    path = Column(String(200))
    sort = Column(Integer)
    is_delete = Column(Boolean, default=0)


class RoleMenuPermission(Base):
    __tablename__ = "base_role_menu_permission"
    id = Column(Integer, primary_key=True, autoincrement=True)
    role_id = Column(Integer)
    menu_id = Column(Integer)


class CasbinRule(Base):
    __tablename__ = "casbin_rule"

    id = Column(Integer, primary_key=True)
    ptype = Column(String(255))
    v0 = Column(String(255))
    v1 = Column(String(255))
    v2 = Column(String(255))
    v3 = Column(String(255))
    v4 = Column(String(255))
    v5 = Column(String(255))

    def __str__(self):
        arr = [self.ptype]
        for v in (self.v0, self.v1, self.v2, self.v3, self.v4, self.v5):
            if v is None:
                break
            arr.append(v)
        return ", ".join(arr)

    def __repr__(self):
        return '<CasbinRule {}: "{}">'.format(self.id, str(self))
