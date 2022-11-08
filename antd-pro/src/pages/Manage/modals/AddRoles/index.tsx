import { Checkbox, Form, Input, Modal, Select } from 'antd';
import type { Dispatch } from 'umi';
import { useDispatch, useSelector } from 'umi';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 16 },
  },
};
const { Option } = Select;
const RolesModal = () => {
  const [form] = Form.useForm();
  const dispatch: Dispatch = useDispatch();
  const { modalVisible = false, isEdit } = useSelector((state: ConnectState) => state.role);
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  const handleCancel = () => {
    dispatch({
      type: 'role/save',
      payload: {
        modalVisible: false,
      },
    });
  };

  return (
    <Modal
      centered
      destroyOnClose
      width="560px"
      title={isEdit ? '编辑角色' : '新增角色'}
      visible={modalVisible}
      maskClosable={false}
      onCancel={handleCancel}
    >
      <div className={styles.filterContent}>
        <Form {...formItemLayout} form={form} scrollToFirstError>
          <Form.Item name="key" label="角色唯一key">
            <Input />
          </Form.Item>
          <Form.Item name="roleName" label="角色名称">
            <Input />
          </Form.Item>
          <Form.Item name="menuManage" label="菜单管理">
            <Checkbox.Group options={options} defaultValue={['Apple']} />
          </Form.Item>
          <Form.Item name="roleManage" label="成员管理">
            <Select>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default RolesModal;
