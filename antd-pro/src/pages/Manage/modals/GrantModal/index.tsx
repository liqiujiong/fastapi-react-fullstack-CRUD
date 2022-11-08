import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Modal, Row } from 'antd';
import type { Dispatch } from 'umi';
import { useDispatch, useSelector } from 'umi';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import type { ConnectState } from '@/models/connect';
import styles from './index.less';

const GrantModal = () => {
  const dispatch: Dispatch = useDispatch();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const {
    modalVisible = false,
    roles,
    editingUser = {} as API.UserData,
  } = useSelector((state: ConnectState) => state.user);

  useEffect(() => {
    const { role = [] } = editingUser;
    const roleIds = role.map((item) => item.name);

    setSelectedRoles(roleIds);
  }, [editingUser]);

  const handleCancel = () => {
    dispatch({
      type: 'user/save',
      payload: {
        modalVisible: false,
        userSelectId: undefined,
        userSelectRoles: [],
      },
    });
  };

  const handleCheckboxChange = (value: CheckboxValueType[]) => {
    setSelectedRoles(value as string[]);
  };

  const modalSubmit = () => {
    dispatch({
      type: 'user/editUserRole',
      payload: {
        user_id: editingUser.id,
        roles: selectedRoles,
      },
    });
  };

  return (
    <Modal
      centered
      destroyOnClose
      width="560px"
      title={'授权角色'}
      visible={modalVisible}
      maskClosable={false}
      onCancel={handleCancel}
      onOk={modalSubmit}
    >
      <div className={styles.filterContent}>
        <Checkbox.Group
          style={{ width: '480px' }}
          value={selectedRoles}
          onChange={handleCheckboxChange}
        >
          <Row>
            {roles.map((item: any) => (
              <Col key={item.name} span={6}>
                <Checkbox key={item.name} value={item.name}>
                  {item.title}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </div>
    </Modal>
  );
};

export default GrantModal;
