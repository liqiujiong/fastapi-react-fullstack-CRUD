import type { TablePaginationConfig } from '@/models/type';
export interface UserState {
  roles: API.UserRoleData[];
  pagination: TablePaginationConfig;
  filters: any;
  sorter: any;
  keywords: {
    real_name: string;
    role: number[];
  };
  items: API.UserData[];
  modalVisible: boolean;
  userSelectRoles?: number[];
  userSelectId?: number;
  editingUser: API.UserData;
}

export interface Filter {}
