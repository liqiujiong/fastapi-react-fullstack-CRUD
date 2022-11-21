import {
  SmileOutlined,
  GlobalOutlined,
  ContainerOutlined,
  AuditOutlined,
  CalendarOutlined,
  HddOutlined,
  CalculatorOutlined,
  WechatOutlined,
  ToolOutlined,
  DashboardOutlined,
  PayCircleOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import type { CateItem } from '../models/global';

const icons = {
  smile: <SmileOutlined />,
  global: <GlobalOutlined />,
  container: <ContainerOutlined />,
  audit: <AuditOutlined />,
  calendar: <CalendarOutlined />,
  hdd: <HddOutlined />,
  calculator: <CalculatorOutlined />,
  wechat: <WechatOutlined />,
  tool: <ToolOutlined />,
  dashboard: <DashboardOutlined />,
  solution: <SolutionOutlined />,
  'pay-circle': <PayCircleOutlined />,
};

// 请求到的CateList
interface FetchCateListType {
  children: FetchCateListType[];
  icon?: string;
  name: string;
  path: string;
}

const generateIconDom: (cateList: FetchCateListType[]) => CateItem[] = (cateList) => {
  const _cateList: CateItem[] = [];

  for (const item of cateList) {
    const cate: CateItem = {
      name: '',
      path: '',
    };

    cate.name = item.name;
    cate.path = item.path;
    if (item.icon) {
      cate.icon = icons[item.icon];
    }
    if (item.children.length !== 0) {
      cate.children = generateIconDom(item.children);
    }
    _cateList.push(cate);
  }

  return _cateList;
};

export default generateIconDom;
