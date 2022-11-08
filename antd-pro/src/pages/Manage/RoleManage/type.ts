import type { TablePaginationConfig } from '@/models/type';

export interface RoleState {
  roleName: string;
  uniqueKey: string; // 身份证号
  roleNumber: number;
  pagination: TablePaginationConfig;
  items: API.UserRoleData[];
  modalVisible: boolean;
  isEdit: boolean;
  apiList: API.GroupItem[];
  apiAuthorizedList: string[];
  menuList: API.MenuItem[];
  menuAuthorizedList: string[];
}

export interface Filter {}
