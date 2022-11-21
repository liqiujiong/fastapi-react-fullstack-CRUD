

## 1、默认的用例识别的规则
1、用例文件：所有文件名为 test_ 开头 或者 _test 开头的文件会被识别为用例文件。
2：用例类，测试文件中每个 Test 开头的类就是一个测试用例类。
3、测试用例：测试类中每个 test 开头的方法就是一条测试用例，测试文件中每个 test 开头的函数也是一条测试用例，

## 2、函数形式编写用例
规则：用例方法名以 test 开头即可

```
pytest -sv .\tests\test_ChatService.py::TestChatServiceAudio


pytest -sv .\tests\test_Project.py::TestProject
```
