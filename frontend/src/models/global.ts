import type { Reducer } from 'umi';

const initState = {
  title: '',
  role: 'shabi',
};

export type GlobalModelState = Readonly<typeof initState>;

interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    save: Reducer<GlobalModelState>;
  };
  effects: {};
  // subscriptions: { setup: Subscription };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: initState,

  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
  },

  effects: {},

  // subscriptions: {
  //   setup({ history }) {},
  // },
};

export default GlobalModel;
