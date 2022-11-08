import React, { useEffect, useState } from 'react';
import { Button, Layout, Table, Drawer, Tree, Tabs, Row } from 'antd';
import type { Dispatch } from 'umi';
import { useDispatch, useSelector } from 'umi';
import type { ConnectState } from '@/models/connect';
import RolesModal from '../modals/AddRoles';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';

const Content = Layout.Content;
const { TabPane } = Tabs;

const RoleManage: React.FC = () => {
  const {
    pagination,
    items,
    loading,
    apiAuthorizedList = [],
    apiList = [],
    menuAuthorizedList = [],
    menuList = [],
  } = useSelector((state: ConnectState) => ({
    ...state.role,
    loading: state.loading,
  }));
  const dispatch: Dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [selectedApiKeys, setSelectedApiKeys] = useState([] as string[]);
  const [selectedMenuKeys, setSelectedMenuKeys] = useState([] as string[]);
  const [menuHalfChecked, setMenuHalfChecked] = useState([] as string[]);
  const [roleItem, setRoleItem] = useState({} as API.UserRoleData);
  const [activeKey, setActiveKey] = useState<string>('1');
  const listLoading = loading.effects['role/query'];

  useEffect(() => {
    dispatch({
      type: 'role/getRoleList',
    });
  }, []);

  useEffect(() => {
    setSelectedApiKeys(apiAuthorizedList);
    // 只存叶子节点，后端会把父节点也返回

    const menuHalfChecked = [] as string[];
    const selectedMenuKeys = [] as string[];

    menuAuthorizedList.forEach((item: string) => {
      if (String(item).startsWith('leaf-')) {
        selectedMenuKeys.push(item);
      } else {
        menuHalfChecked.push(item);
      }
    });
    setSelectedMenuKeys(selectedMenuKeys);
    setMenuHalfChecked(menuHalfChecked);
  }, [apiAuthorizedList, menuAuthorizedList]);

  const columns = [
    {
      dataIndex: 'title',
      title: '系统角色名称',
    },
    {
      dataIndex: 'name',
      title: '角色唯一key',
    },
    {
      dataIndex: 'user_counts',
      title: '成员数（人）',
    },
    {
      dataIndex: 'name',
      title: '操作',
      render: (_: string, record: API.UserRoleData) => (
        <div className={styles.operation}>
          <Button type={'link'} onClick={() => handleOpenApiRight(record)}>
            设置权限
          </Button>
        </div>
      ),
    },
  ];
  const handleOpenApiRight = async (record: API.UserRoleData) => {
    await dispatch({
      type: 'role/getApiList',
    });
    await dispatch({
      type: 'role/getAuthorizedApiList',
      payload: { id: record.id },
    });
    await dispatch({
      type: 'role/getMenuList',
    });
    await dispatch({
      type: 'role/getAuthorizedMenuList',
      payload: { id: record.id },
    });
    setVisible(true);
    setRoleItem(record);
  };
  const handleClose = () => {
    setVisible(false);
    setActiveKey('1');
    setMenuHalfChecked([]);
  };
  const onApiCheck = (checkedKeys: string[]) => {
    setSelectedApiKeys(checkedKeys);
  };
  const onMenuCheck = (checkedKeys: string[], info: any) => {
    setSelectedMenuKeys(checkedKeys);
    // 只要有一个子节点选中，也要把父节点传给后台
    setMenuHalfChecked(info.halfCheckedKeys);
    console.log('info.halfCheckedKeys:', info.halfCheckedKeys);
  };
  const handleCertainAPI = async () => {
    await dispatch({
      type: 'role/updateRoleApi',
      payload: {
        role_id: roleItem.id,
        api_id: selectedApiKeys
          .filter((item) => String(item).startsWith('leaf-'))
          .map((item) => item.slice(5)),
      },
    });
  };

  const handleCertainMenu = async () => {
    await dispatch({
      type: 'role/updateMenuApi',
      payload: {
        role_id: roleItem.id,
        menu_id: selectedMenuKeys
          .map((item) => {
            if (String(item).startsWith('leaf-')) {
              return Number(item.slice(5));
            }
            return Number(item);
          })
          .concat(menuHalfChecked),
      },
    });
  };

  const handleChangeTab = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <Content className={styles.bodyContent}>
        <Table
          tableLayout="fixed"
          loading={listLoading}
          className={styles.table}
          rowKey={'id'}
          columns={columns}
          dataSource={items}
          pagination={pagination}
        />
      </Content>
      <Drawer
        title={`设置${roleItem.title}API权限`}
        placement="right"
        size={'large'}
        onClose={handleClose}
        visible={visible}
      >
        <Tabs activeKey={activeKey} onChange={handleChangeTab}>
          <TabPane tab="API权限" key="1">
            <Row justify={'end'}>
              <Button type="primary" onClick={handleCertainAPI}>
                确定
              </Button>
            </Row>
            <Tree
              checkable
              defaultExpandAll
              onCheck={onApiCheck}
              treeData={apiList}
              checkedKeys={selectedApiKeys}
            />
          </TabPane>
          <TabPane tab="菜单权限" key="2">
            <Row justify={'end'}>
              <Button type="primary" onClick={handleCertainMenu}>
                确定
              </Button>
            </Row>
            <Tree
              checkable
              defaultExpandAll
              onCheck={onMenuCheck}
              treeData={menuList}
              checkedKeys={selectedMenuKeys}
            />
          </TabPane>
        </Tabs>
      </Drawer>
      <RolesModal />
    </PageContainer>
  );
};

export default RoleManage;
