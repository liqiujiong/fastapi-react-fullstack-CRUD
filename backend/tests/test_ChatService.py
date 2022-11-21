

# from schemas.websocketEvent import WebsocketMessage
# from services.ChatService import message_transform
# from utils.tool_func import html_decode

# class TestChatServiceText:
#   def test_message_transform_zh(self):
#       payload = {
#           "action":"newMessage",
#           "lang":"zh",
#           "type":"text",
#           "data":"早上好，我们吃什么晚餐"
#       }

#       message = WebsocketMessage(**payload)

#       print(message_transform(message))


#   def test_message_transform_en(self):
#       payload = {
#           "action":"newMessage",
#           "lang":"en",
#           "type":"text",
#           "data":"This gets you a little bit of extra functionality"
#       }

#       message = WebsocketMessage(**payload)

#       print(message_transform(message))


# class TestChatServiceAudio:
#     def test_message_transform_en(self):
#         payload = {
#             "action":"newMessage",
#             "lang":"en",
#             "type":"audio",
#             "data":"static/en.wav"
#         }

#         message = WebsocketMessage(**payload)

#         print(message_transform(message))

#     def test_message_transform_zh(self):
#         payload = {
#             "action":"newMessage",
#             "lang":"zh",
#             "type":"audio",
#             "data":"static/zh.wav"
#         }

#         message = WebsocketMessage.parse_obj(payload)

#         print(message_transform(message))

# def test_pydantic():
#     wsm = WebsocketMessage.parse_obj(
#         {
#             "action":"newMessage",
#             "lang":"zh",
#             "type":"audio",
#             "data":"static/3620249401918516595.wav",
#             "en":{
#                 "Audio":"jaskdlf"   # 要和WebsocketMessage相对应，否则无法转换
#             }
#         }
#     )
#     print(wsm)