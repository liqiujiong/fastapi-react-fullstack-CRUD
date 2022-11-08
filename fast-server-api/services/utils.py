from dateutil import parser
from datetime import timezone, timedelta, datetime


def get_bj_now():
    """获取北京时间"""
    return datetime.fromtimestamp(datetime.utcnow().timestamp() + 28800)


def timestamp_formatter(unix_time, format="%Y-%m-%d %H:%M:%S"):
    """
    将unix_timestamp转为字符串（北京时间）
    """
    if not unix_time:
        return ""
    return datetime.fromtimestamp(unix_time, tz=timezone(
        timedelta(hours=8))).strftime(format)


def date_formatter(date):
    """
    日期转化，将传入的 %Y-%m-%d 转化为UNIX时间戳
    """
    # if date is None:
    if not date:
        return None
    return parser.parse(date + ' 00:00:00+0800').timestamp()
