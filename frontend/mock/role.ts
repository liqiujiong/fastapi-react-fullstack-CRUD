import { Request, Response } from 'express';

const getRoleList = (req: Request, res: Response) => {
  res.send({
    success: true,
    data: [
      {
        id: 1,
        name: 'init-user',
        title: '初始化角色',
        user_counts: 0,
      },
      {
        id: 2,
        name: 'project-manager',
        title: '项目经理',
        user_counts: 1,
      },
      {
        id: 3,
        name: 'department-leader',
        title: '事业部负责人',
        user_counts: 0,
      },
      {
        id: 4,
        name: 'senior-executive',
        title: '公司高管',
        user_counts: 0,
      },
      {
        id: 5,
        name: 'accountant',
        title: '财务',
        user_counts: 1,
      },
      {
        id: 6,
        name: 'project-member',
        title: '项目成员',
        user_counts: 0,
      },
      {
        id: 7,
        name: 'sales',
        title: '销售',
        user_counts: 0,
      },
      {
        id: 8,
        name: 'hr',
        title: '人事',
        user_counts: 0,
      },
      {
        id: 9,
        name: 'root',
        title: 'ROOT',
        user_counts: 11,
      },
    ],
  });
};

const getAllApis = (req: Request, res: Response) => {
  res.send({
    success: true,
    data: [
      {
        children: [
          {
            key: 'leaf-1',
            method: 'GET',
            path: '/api/auth/apis/all',
            title: '获取所有API',
          },
          {
            key: 'leaf-2',
            method: 'GET',
            path: '/api/auth/apis/authorized',
            title: '获得已授权的API接口列表',
          },
          {
            key: 'leaf-3',
            method: 'POST',
            path: '/api/auth/apis/permission',
            title: '修改角色API接口权限',
          },
        ],
        key: 'API权限',
        title: 'API权限',
      },
      {
        children: [
          {
            key: 'leaf-50',
            method: 'GET',
            path: '/api/customers',
            title: '获取项目全部客户列表',
          },
          {
            key: 'leaf-53',
            method: 'GET',
            path: '/api/dict/prolevels',
            title: '获得所有职级',
          },
          {
            key: 'leaf-102',
            method: 'GET',
            path: '/api/user',
            title: '获得所有用户',
          },
          {
            key: 'leaf-103',
            method: 'GET',
            path: '/api/user/list',
            title: '获得所有用户',
          },
          {
            key: 'leaf-104',
            method: 'POST',
            path: '/api/user/role',
            title: '获得指定用户的角色',
          },
          {
            key: 'leaf-105',
            method: 'POST',
            path: '/api/user/del',
            title: '删除用户',
          },
          {
            key: 'leaf-106',
            method: 'POST',
            path: '/api/user/block',
            title: '封锁用户',
          },
          {
            key: 'leaf-107',
            method: 'POST',
            path: '/api/user/unblock',
            title: '解封用户',
          },
        ],
        key: '用户管理',
        title: '用户管理',
      },
      {
        children: [
          {
            key: 'leaf-55',
            method: 'GET',
            path: '/api/auth/menus/list',
            title: '获取所有菜单',
          },
          {
            key: 'leaf-56',
            method: 'GET',
            path: '/api/auth/menus/role/authorized',
            title: '获得角色已授权的菜单列表',
          },
          {
            key: 'leaf-57',
            method: 'GET',
            path: '/api/auth/menus/user/authorized',
            title: '获得当前用户已授权的菜单列表',
          },
          {
            key: 'leaf-58',
            method: 'POST',
            path: '/api/auth/menus/permission',
            title: '设置角色菜单权限',
          },
        ],
        key: '菜单权限',
        title: '菜单权限',
      },
    ],
  });
};

const getAllMenu = (req: Request, res: Response) => {
  res.send({
    success: true,
    data: [
      {
        children: [
          {
            key: 'leaf-2',
            title: '项目列表',
          },
        ],
        key: 1,
        title: '项目管理',
      },
      {
        children: [
          {
            key: 'leaf-11',
            title: '用户管理',
          },
          {
            key: 'leaf-12',
            title: '角色管理',
          },
        ],
        key: 10,
        title: '后台管理',
      },
    ],
  });
};

export default {
  // 'GET /api/role': getRoleList,
  'GET /api/auth/apis/all': getAllApis,
  'GET /api/auth/menus/list': getAllMenu,
};
