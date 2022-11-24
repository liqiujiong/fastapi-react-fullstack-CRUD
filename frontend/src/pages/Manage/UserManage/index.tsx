import React, { useCallback, useEffect } from 'react';
import { Button, Layout, Input, Table, Switch, Select, Radio, Row, Col, Form } from 'antd';
import type { Dispatch } from 'umi';
import { useDispatch, useSelector } from 'umi';
import type { ConnectState } from '@/models/connect';
import GrantModal from '../modals/GrantModal';
import styles from './style.less';
import { PageContainer } from '@ant-design/pro-layout';

const Content = Layout.Content;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const UserManage: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [form] = Form.useForm();
  const { pagination, items, roles, sorter, filters, keywords, modalVisible, loading } =
    useSelector((state: ConnectState) => ({
      ...state.user,
      loading: state.loading,
    }));
  const listLoading = loading.effects['user/query'];

  useEffect(() => {
    dispatch({
      type: 'global/changeLayoutTitle',
      payload: '用户管理',
    });
  }, []);
  useEffect(() => {
    // 获取项目列表
    dispatch({
      type: 'user/query',
      payload: {
        filters: {},
        sorter: undefined,
        keywords: undefined,
      },
    });
    dispatch({
      type: 'user/getUserRoleList',
    });
    // dispatch({ type: 'user/getUserPoslevels' });
  }, []);

  const handleUserBlockChange = (check: boolean, userId: number) => {
    dispatch({
      type: 'user/changeUserBlock',
      payload: {
        check,
        user_id: userId,
      },
    });
  };

  const handleModalVisible = (record: API.UserData) => {
    dispatch({
      type: 'user/save',
      payload: {
        modalVisible: true,
        editingUser: record,
      },
    });
  };
  const handleTableChange = useCallback(
    (paginationTab, newFilters, sorterTab) => {
      dispatch({
        type: 'user/query',
        payload: {
          paginationTab,
          filters: { ...filters, ...newFilters },
          sorter: Object.keys(sorterTab).length ? sorterTab : undefined,
        },
      });
    },
    [filters, sorter, pagination],
  );

  // 筛选
  const handleSearch = (
    keywordFilter?:
      | { real_name: string }
      | { poslevel: string }
      | { block: 0 | 1 }
      | { role_ids: string[] },
  ) => {
    dispatch({
      type: 'user/query',
      payload: {
        keywords: {
          ...keywords,
          ...keywordFilter,
        },
      },
    });
  };

  // const handleUserDelete = (id: number) => {
  //   dispatch({
  //     type: 'user/deleteUser',
  //     payload: {
  //       user_id: id,
  //     },
  //   });
  // };
  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const real_name = e.target.value;

    handleSearch({ real_name });
  };

  // const changeUserPoslevel = (poslevel: string) => {
  //   handleSearch({ poslevel });
  // };
  const handleRole = (role_ids: string[]) => {
    handleSearch({ role_ids });
  };
  const changeBlockState = (block: 0 | 1) => {
    handleSearch({ block });
  };
  const handleReset = () => {
    form.resetFields();
    dispatch({
      type: 'user/query',
      payload: {
        keywords: {},
      },
    });
  };

  const columns = [
    {
      dataIndex: 'id',
      title: 'Id',
      width: 30,
    },
    {
      dataIndex: 'real_name',
      title: '真实姓名',
    },
    {
      dataIndex: 'school',
      title: '学校',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
    },
    // {
    //   dataIndex: 'prolevel',
    //   title: '职级',
    //   render: (val: { id: number; title: string; level: string }) => val && val.title,
    // },
    {
      dataIndex: 'role',
      title: '所属角色组',
      render: (val: { id: number; name: string; title: string }[]) => {
        if (Array.isArray(val)) {
          return val.map((item) => item.title).join(',');
        }
        return '-';
      },
    },
    {
      dataIndex: 'is_block',
      title: 'Is Block',
      render: (text: boolean, record: API.UserData) => (
        <Switch onChange={() => handleUserBlockChange(text, record.id)} checked={text} />
      ),
      width: 80,
    },
    {
      dataIndex: 'name',
      title: '操作',
      render: (_: string, record: API.UserData) => (
        <>
          <Button onClick={() => handleModalVisible(record)} type={'link'}>
            授权角色
          </Button>
          {/* <Popconfirm onConfirm={() => handleUserDelete(record.id)} title="确认要删除此用户吗？">
            <Button type={'link'}>删除</Button>
          </Popconfirm> */}
        </>
      ),
    },
  ];

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <div className={styles.filterCon}>
        <Form {...formItemLayout} form={form} scrollToFirstError>
          <Row gutter={24} style={{ textAlign: 'right' }}>
            <Col span={8}>
              <Form.Item name="real_name" label="姓名：">
                <Input onChange={changeUserName} placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="role_ids" label="所属角色组：">
                <Select
                  onChange={handleRole}
                  mode="multiple"
                  allowClear
                  showSearch
                  filterOption={(input: string, option: any) => {
                    return option && option.children && option.children.indexOf(input) >= 0;
                  }}
                >
                  {roles.map((item: API.RoleData) => (
                    <Option key={item.id} value={item.id}>
                      {item.title}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ textAlign: 'right' }} gutter={24}>
            <Col span={8}>
              <Form.Item name="block" label="Is Block:">
                <Radio.Group onChange={(e) => changeBlockState(e.target.value)}>
                  <Radio value={undefined}>全选</Radio>
                  <Radio value={1}>Block</Radio>
                  <Radio value={0}>Unblock</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Button type="primary" onClick={() => handleSearch()}>
                查 询
              </Button>
              <Button onClick={handleReset} style={{ marginLeft: '10px' }}>
                重 置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <Content className={styles.bodyContent}>
        <Table
          tableLayout="fixed"
          loading={listLoading}
          className={styles.table}
          rowKey={'id'}
          columns={columns}
          dataSource={items}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Content>
      {modalVisible && <GrantModal />}
    </PageContainer>
  );
};

export default UserManage;
