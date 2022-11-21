import { request } from 'umi';

/**
 * 获取用户列表
 * @param payload
 * @returns
 */
export async function fetchUserList(payload: API.UserListReq) {
  return request<API.UserListRes>('/api/user/list', {
    method: 'get',
    params: payload,
  });
}

/**
 * 删除单个用户
 * @param payload
 * @returns
 */
export async function deleteUser(payload: { user_id: number }) {
  return request<API.Response>('/api/user/del', {
    method: 'post',
    data: payload,
  });
}

/**
 * 将单个用户设为block状态
 * @param payload
 * @returns
 */
export async function blockUser(payload: { user_id: number }) {
  const { user_id } = payload;
  return request<API.Response>(`/api/user/block?user_id=${user_id}`, {
    method: 'post',
  });
}

/**
 * 将单个用户设为unblock状态
 * @param payload
 * @returns
 */
export async function unblockUser(payload: { user_id: number }) {
  const { user_id } = payload;
  return request<API.Response>(`/api/user/unblock?user_id=${user_id}`, {
    method: 'post',
  });
}
