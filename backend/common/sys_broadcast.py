"""

通过class 实例化对象可以直接修改内部属性的特性
再通过魔法方法，赋予实例化对象 具有内部属性_broadcast_client的方法和属性

主要参考 flask-redis扩展实现
https://github.com/underyx/flask-redis/blob/master/flask_redis/client.py

redis 连接

"""
import sys

from common.logger import logger
import config

from broadcaster import Broadcast


class BroadcastCli(object):

    def __init__(self, connect_url:str):
        # redis对象 在 @app.on_event("startup") 中连接创建
        self._broadcast_client = None
        self.connect_url = connect_url

    async def init_broadcast_connect(self) -> None:
        """
        初始化连接
        :return:
        """
        try:
            self._broadcast_client = Broadcast(self.connect_url)
            await self._broadcast_client.connect()
            logger.info("连接broadcast成功",self._broadcast_client)
        except ( Exception) as e:
            logger.info(f"连接broadcast异常 {e}")
            sys.exit()

    def disconnect(self):
        self._broadcast_client.disconnect()
        logger.info(f"断开broadcast")

    # 使实例化后的对象 赋予对象的的方法和属性
    def __getattr__(self, name):
        return getattr(self._broadcast_client, name)

    def __getitem__(self, name):
        return self._broadcast_client[name]

    def __setitem__(self, name, value):
        self._broadcast_client[name] = value

    def __delitem__(self, name):
        del self._broadcast_client[name]


# 创建连接对象
broadcast_client: Broadcast = BroadcastCli("redis://localhost:6379")

# 只允许导出 broadcast_client 实例化对象
__all__ = ["broadcast_client"]
