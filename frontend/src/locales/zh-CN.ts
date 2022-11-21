import component from './zh-CN/base/component';
import globalHeader from './zh-CN/base/globalHeader';
import menu from './zh-CN/base/menu';
import pwa from './zh-CN/base/pwa';
import settingDrawer from './zh-CN/base/settingDrawer';
import settings from './zh-CN/base/settings';
import pages from './zh-CN/base/pages';

export default {
  'navBar.lang': '语言',
  'layout.user.link.help': '帮助',
  'layout.user.link.privacy': '隐私',
  'layout.user.link.terms': '条款',
  'app.copyright.produced': 'GitHub LiQiuJiong',
  'app.preview.down.block': '下载此页面到本地项目',
  'app.welcome.link.fetch-blocks': '获取全部区块',
  'app.welcome.link.block-list': '基于 block 开发，快速构建标准页面',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
};
