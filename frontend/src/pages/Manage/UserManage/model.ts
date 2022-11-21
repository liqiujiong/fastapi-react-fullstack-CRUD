import { message } from 'antd';
import type { ModelType, Query } from '@/models/type';
import type { ConnectState } from '@/models/connect';
import { blockUser, deleteUser, fetchUserList, unblockUser } from '@/services/user';
import { editUserRole, fetchUserRoleList } from '@/services/roleData';
import type { UserState } from './type';

const Model: ModelType<UserState> = {
  namespace: 'user',
  state: {
    items: [],
    roles: [],
    modalVisible: false,
    filters: {},
    keywords: {
      real_name: '',
      role: [],
    },
    sorter: '',
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: (total) => `共${total}条`,
      showSizeChanger: true,
      showQuickJumper: true,
      pageSizeOptions: ['10', '20', '50', '100', '200'],
    },
    editingUser: {} as API.UserData,
  },
  effects: {
    *getQueryInfo(_, { select }) {
      const query = yield select((state: ConnectState) => ({
        filters: state.user.filters,
        pagination: state.user.pagination,
        sorter: state.user.sorter,
        keywords: state.user.keywords,
      }));
      console.log('query', query);
      const filters = Object.keys(query.filters).reduce((target: any, filterKey) => {
        target[filterKey] = query.filters[filterKey] ? query.filters[filterKey].value : undefined;
        return target;
      }, {});

      return {
        current: query.pagination.current,
        pageSize: query.pagination.pageSize,
        sort_order: query.sorter
          ? `${query.sorter.field}_${query.sorter.order.split('end')[0]}`
          : undefined,
        ...query.keywords,
        ...filters,
      };
    },
    query: [
      function* ({ payload }, { call, put }) {
        yield put({
          type: 'setQuery',
          payload,
        });
        const queryInfo = yield put.resolve({
          type: 'getQueryInfo',
        });

        const response: API.UserListRes = yield call(fetchUserList, {
          ...queryInfo,
        });

        yield put({
          type: 'setItems',
          payload: {
            items: response.data.list,
            total: response.data.total,
            current: response.data.current,
          },
        });
      },
      { type: 'takeLatest' },
    ],
    *changeUserBlock({ payload }, { call, put }) {
      const { check, user_id } = payload;
      const fn = check ? unblockUser : blockUser;

      const res: API.Response = yield call(fn, { user_id });

      if (res.success) {
        message.success('调整成功');
        yield put({
          type: 'query',
        });
      }
    },

    *deleteUser({ payload }, { call, put }) {
      const res = yield call(deleteUser, payload);

      if (res.success) {
        message.success('删除成功');
        yield put({
          type: 'query',
          payload: {
            filters: {},
            sorter: undefined,
            keywords: undefined,
          },
        });
      }
    },
    // 角色组列表
    *getUserRoleList({ payload }, { call, put }) {
      const res: API.RoleListRes = yield call(fetchUserRoleList, payload);

      yield put({
        type: 'save',
        payload: {
          roles: res.data,
        },
      });
    },
    *editUserRole({ payload }, { call, put }) {
      const res: API.Response = yield call(editUserRole, payload);

      if (res.success) {
        message.success('编辑角色成功');
        yield put({
          type: 'save',
          payload: { modalVisible: false },
        });
        yield put({
          type: 'query',
        });
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
    // 分页设置查询信息
    setQuery(state, { payload = {} }: { payload: Query }) {
      let pagination = payload.pagination || state.pagination || {};

      if (
        ('filters' in payload || 'keywords' in payload || 'sorter' in payload) &&
        pagination.current === state.pagination.current
      ) {
        pagination = {
          ...pagination,
          current: 1,
        };
      }
      return {
        ...state,
        ...payload,
        pagination,
      };
    },
    // 分页列表设置数据
    setItems(state, { payload }: { payload: { items: any[]; total: number; current: number } }) {
      const { items, ...pagination } = payload;

      return {
        ...state,
        items,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
    },
  },
};

export default Model;
