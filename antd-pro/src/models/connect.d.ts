import type { History, Dispatch, IRoute } from 'umi';
import { Loading } from 'umi';
import { GlobalModelState } from './global';
import type { UserState } from '@/pages/Manage/UserManage/type';
import type { RoleState } from '@/pages/Manage/RoleManage/type';

export interface ConnectState {
  loading: any;
  role: RoleState;
  user: UserState;
}

export interface ConnectProps<
  // eslint-disable-next-line no-unused-vars
  P extends { [K in keyof P]?: string } = {},
  // eslint-disable-next-line no-undef
  S = LocationState,
> {
  dispatch: Dispatch;
  children: Element[];
  // https://github.com/umijs/umi/pull/2194
  // eslint-disable-next-line no-undef
  match?: match<P>;
  location: Location<S>;
  history: History;
  route: IRoute;
}
