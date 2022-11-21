import { getJwt } from '../src/utils/token';
import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

const getAccess = () => {
  return access;
};

const getUserList = (req: Request, res: Response) => {
  res.send({
    success: true,
    data: {
      current: 1,
      list: [
        {
          department: {
            id: 1,
            name: '管理部',
          },
          dingding_user_id: '190861601524446364',
          id: 15,
          is_block: false,
          name: '哈哈哈63',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [],
        },
        {
          department: {
            id: 3,
            name: '后端部',
          },
          dingding_user_id: '263867175623818612',
          id: 16,
          is_block: false,
          name: '李秋炯',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
          ],
        },
        {
          department: {
            id: 3,
            name: '后端部',
          },
          dingding_user_id: '01101321390429630725',
          id: 17,
          is_block: false,
          name: '哈哈哈543',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 5,
              name: 'accountant',
              title: '财务',
            },
          ],
        },
        {
          department: null,
          dingding_user_id: '252248616137862978',
          id: 18,
          is_block: false,
          name: '哈哈哈112',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
          ],
        },
        {
          department: null,
          dingding_user_id: '2429016435847252',
          id: 19,
          is_block: false,
          name: '李欢',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
          ],
        },
        {
          department: {
            id: 1,
            name: '管理部',
          },
          dingding_user_id: '01364257545124441359',
          id: 20,
          is_block: false,
          name: '哈哈哈22',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [],
        },
        {
          department: null,
          dingding_user_id: '01362042250721552072',
          id: 21,
          is_block: false,
          name: '哈哈哈',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [],
        },
        {
          department: {
            id: 1,
            name: '管理部',
          },
          dingding_user_id: '191403382129211375',
          id: 23,
          is_block: false,
          name: '哈哈哈2',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
            {
              id: 6,
              name: 'project-member',
              title: '项目成员',
            },
            {
              id: 7,
              name: 'sales',
              title: '销售',
            },
          ],
        },
        {
          department: {
            id: 1,
            name: '管理部',
          },
          dingding_user_id: '030832041151820',
          id: 24,
          is_block: false,
          name: '哈哈哈3',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
          ],
        },
        {
          department: {
            id: 1,
            name: '管理部',
          },
          dingding_user_id: '03074823109550',
          id: 25,
          is_block: false,
          name: '哈哈哈5',
          prolevel: {
            id: 1,
            level: 'pro-dev',
            title: '默认职级',
          },
          role: [
            {
              id: 9,
              name: 'root',
              title: 'ROOT',
            },
          ],
        },
      ],
      pageSize: 10,
      total: 19,
    },
  });
};

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '没有token,请先登录！',
    //     success: true,
    //   });
    //   return;
    // }
    res.send({
      success: true,
      data: {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    });
  },
  // GET POST 可省略
  'GET /api/user': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
  'GET  /api/user/list': getUserList,
};
