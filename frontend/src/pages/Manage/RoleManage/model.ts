import { message } from 'antd';
import type { ModelType } from '@/models/type';
import {
  fetchUserRoleList,
  fetchApiList,
  fetchAuthorizedApiList,
  postApiPermission,
  fetchAuthorizedMenuList,
  fetchMenuList,
  postMenuPermission,
} from '@/services/roleData';
import type { RoleState } from './type';

const Model: ModelType<RoleState> = {
  namespace: 'role',
  state: {
    roleName: '',
    uniqueKey: '',
    roleNumber: 0,
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: (total) => `共${total}条`,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50', '100', '200'],
    },
    items: [],
    modalVisible: false,
    isEdit: false,
    apiList: [],
    apiAuthorizedList: [],
    menuList: [],
    menuAuthorizedList: [],
  },
  effects: {
    *getRoleList(_, { call, put }) {
      const res: API.RoleListRes = yield call(fetchUserRoleList);

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            items: [...res.data],
          },
        });
      }
    },
    *getApiList(_, { call, put }) {
      const res: API.RoleListRes = yield call(fetchApiList);

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            apiList: [...res.data],
          },
        });
      }
    },
    *getAuthorizedApiList({ payload }, { call, put }) {
      const { id } = payload;
      const res: API.RoleListRes = yield call(fetchAuthorizedApiList, { id });

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            apiAuthorizedList: res.data,
          },
        });
      }
    },
    *updateRoleApi({ payload }, { call }) {
      const { role_id, api_id = [] } = payload;
      const res: API.RoleListRes = yield call(postApiPermission, {
        role_id,
        api_id,
      });

      if (res.success) {
        return message.success('修改角色API权限成功');
      }
    },

    *getMenuList(_, { call, put }) {
      const res: API.RoleListRes = yield call(fetchMenuList);

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            menuList: [...res.data],
          },
        });
      }
    },
    *getAuthorizedMenuList({ payload }, { call, put }) {
      const { id } = payload;
      const res: API.RoleListRes = yield call(fetchAuthorizedMenuList, {
        id,
      });

      if (res.success) {
        yield put({
          type: 'save',
          payload: {
            menuAuthorizedList: res.data,
          },
        });
      }
    },
    *updateMenuApi({ payload }, { call }) {
      const { role_id, menu_id = [] } = payload;
      const res: API.RoleListRes = yield call(postMenuPermission, {
        role_id,
        menu_id,
      });

      if (res.success) {
        return message.success('修改角色菜单权限成功');
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
