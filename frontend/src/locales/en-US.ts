import component from './en-US/base/component';
import globalHeader from './en-US/base/globalHeader';
import menu from './en-US/base/menu';
import pages from './en-US/base/pages';
import pwa from './en-US/base/pwa';
import settingDrawer from './en-US/base/settingDrawer';
import settings from './en-US/base/settings';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.copyright.produced': 'Produced by Ant Financial Experience Department',
  'app.preview.down.block': 'Download this page to your local project',
  'app.welcome.link.fetch-blocks': 'Get all block',
  'app.welcome.link.block-list': 'Quickly build standard, pages based on `block` development',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...pages,
};
