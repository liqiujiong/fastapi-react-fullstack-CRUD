import os
from dotenv import load_dotenv

cwd = os.getcwd()
#FIX 自动载入环境变量
env_file = "/".join(cwd.split("/")[:-1]) + "/.env"
load_dotenv(dotenv_path=env_file)

DEBUG = bool(os.environ.get("DEBUG", True))
SERVER_IP = str(os.environ.get("SERVER_IP", "127.0.0.1"))
SERVER_PORT = int(os.environ.get("SERVER_PORT", 8088))
STATIC_DIR = str(os.environ.get("STATIC_DIR", "static"))
# JWT
ALGORITHM = str(os.environ.get("ALGORITHM", "HS256"))
SECRET_KEY = str(
    os.environ.get("SECRET_KEY", '6u1qo2qlp-87s89123hj+%971hv^s=tb2m0_y2^!8'))
ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", 600))
# 项目根路径
BASE_PATH = str(
    os.path.dirname(
        os.path.dirname(os.path.dirname((os.path.abspath(__file__))))))

# # 配置你的Mysql环境
SQLALCHEMY_DATABASE_URL = str(
    os.environ.get(
        "SQLALCHEMY_DATABASE_URL",
        "mysql+mysqlconnector://root:123456@localhost:3306/FRFC"))

# redis配置
REDIS_HOST: str = "127.0.0.1"
REDIS_PASSWORD: str = ""
REDIS_DB: int = 0
REDIS_PORT: int = 6379
REDIS_URL: str = f"redis://:{REDIS_PASSWORD}@{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}?encoding=utf-8"
REDIS_TIMEOUT: int = 5  # redis连接超时时间

# 业务配置
PROJECT_STATUS = {
    0: "招标中",
    1: "选标",
    2: "工作中",
    3: "审核中",
    4: "结束"
}
PROJECT_STATUS_TENDERING = 0
PROJECT_STATUS_CHOOSE = 1
PROJECT_STATUS_WORKING = 2
PROJECT_STATUS_AUDIT = 3
PROJECT_STATUS_END = 4

PROJECT_TENDER_STATUS = {0: "默认已投标", 1: "待定", 2: "通过"}
PROJECT_TENDER_STATUS_DEFAULT = 0
PROJECT_TENDER_STATUS_READY = 1
PROJECT_TENDER_STATUS_PASS = 2


PROJECT_WORK_STATUS = {0: "默认未审核", 1: "通过", 2: "驳回"}
PROJECT_WORK_STATUS_DEFAULT = 0
PROJECT_WORK_STATUS_PASS = 1
PROJECT_WORK_STATUS_REJECT = 2

CASH_EXTRACT_STATUS = {0: "默认未审核", 1: "通过", 2: "驳回"}
CASH_EXTRACT_STATUS_DEFAULT = 0
CASH_EXTRACT_STATUS_PASS = 1
CASH_EXTRACT_STATUS_REJECT = 2

#平台角色
ROLE_DICT_ROOT = 'root' # 超管
ROLE_DICT_USER = 'user' # 平台用户
ROLE_DICT_OPERA = 'operating' # 运营人员
ROLE_DICT_FINANCE = 'accountant' # 平台用户

#运营时间
START_TIME = '9:30:00'
END_TIME = '18:30:00'

#现金时薪 极易 1 10 ，易 2 25， 一般 3 50， 难 4 100 ，极难 5 200
CASH_HOUR_DICT = [None,10,25,50,100,200]

#积分时薪 极易 1 50 ，易 2 100， 一般 3 200， 难 4 400 ，极难 5 800
COIN_HOUR_DICT = [None,50,100,200,400,800]

#评分积分收益比例差1 50% 中2 75% 好3 100%
COIN_RATE_DICT = [None,0.5,0.75,1]