from casbin.enforcer import Enforcer
import config
import casbin
import casbin_sqlalchemy_adapter

# 创建连接对象
config_path = "./casbin_model.conf"
adapter = casbin_sqlalchemy_adapter.Adapter(config.SQLALCHEMY_DATABASE_URL)
enforcer:Enforcer = casbin.Enforcer(config_path, adapter)

# 只允许导出 enforcer
__all__ = ["enforcer"]


