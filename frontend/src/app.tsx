import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import type { RequestOptionsInit } from 'umi-request';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/base';
import defaultSettings from '../config/defaultSettings';
import { getJwt } from './utils/token';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
}> {
  /**
   * 最外层要求：token(localstoage) 、 根据持久化的token获得role(第一个全局状态)
   * TODO1
   * 第一次打开应用 ——
   * 根据有无token，判断是否有登录
   * 有token ：
   *    成功：
   *      得到菜单信息 + 个人信息
   *    失败：
   *      token过期，设置默认角色
   *
   * 无token 或 token过期(请求获得jwt过期与否)：
   *    未登录：设置为默认角色
   *
   * TODO3
   * 在登录页面，—— 登录成功，设置token重新打开页面
   */

  // 有无token，获取用户信息
  console.log('getJwt() :>> ', getJwt());
  if (getJwt()) {
    console.log('执行refresh :>> ');
    const userRes = await queryCurrentUser();
    console.log('userRes :>> ', userRes);

    return {
      settings: defaultSettings,
      currentUser: userRes.data,
    };
  }

  return {
    settings: defaultSettings,
  };
}

/**
 * 请求前拦截程序
 */
const requestInterceptor = (url: string, options: RequestOptionsInit) => {
  const jwt = getJwt();
  const authHeader = { token: jwt };

  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.real_name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // TODO
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // console.log('连接器定向到登录 :>> ');
        // message.info('访问需要先登录网站');
        history.push(loginPath);
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  requestInterceptors: [requestInterceptor],
  // responseInterceptors: [responseInterceptors],
};
