import { request } from 'umi';
/**
 * 编辑角色
 * @param payload
 * @returns
 */
export async function editUserRole(payload: { user_id: number; roles: number[] }) {
  return request<API.Response>('/api/user/roles', {
    method: 'put',
    data: payload,
  });
}

/**
 * 获取角色列表
 * @param payload
 * @returns
 */
export async function fetchUserRoleList() {
  return request<API.RoleListRes>('/api/role', {
    method: 'get',
  });
}

/**
 * 获得已授权的API接口列表
 * @param payload
 * @returns
 */
export async function fetchAuthorizedApiList(payload: { id: number }) {
  const { id } = payload;

  return request<API.ApiRes>(`/api/apis/role/authorized?role_id=${id}`, {
    method: 'get',
  });
}
/**
 * 获得所有API
 * @param payload
 * @returns
 */
export async function fetchApiList() {
  return request<API.ApiRes>('/api/apis/all', {
    method: 'get',
  });
}

/**
 * 设置角色API权限
 */
export async function postApiPermission(payload: { role_id: number; api_id: number[] }) {
  return request<API.Response>('/api/apis/permission', {
    method: 'put',
    data: payload,
  });
}

/**
 * 获得角色已授权的菜单列表
 * @param payload
 * @returns
 */
export async function fetchAuthorizedMenuList(payload: { id: number }) {
  const { id } = payload;

  return request<API.MenuRes>(`/api/menu/role/authorized?role_id=${id}`, {
    method: 'get',
  });
}
/**
 * 获得所有菜单
 * @param payload
 * @returns
 */
export async function fetchMenuList() {
  return request<API.MenuRes>('/api/menu/all', {
    method: 'get',
  });
}

/**
 * 设置角色菜单权限
 */
export async function postMenuPermission(payload: { role_id: number; menu_id: number[] }) {
  return request<API.Response>('/api/menu/permission', {
    method: 'put',
    data: payload,
  });
}
