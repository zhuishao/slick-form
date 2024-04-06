/**
 * 实现一个常用的表单功能
 */
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
} from 'antd';
import React, { useEffect, useState } from 'react';
import HolidaysSetting from './holidays-setting';

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  // 爱好列表
  const [options, setOptions] = useState([]);
  // 提交loading
  const [btnLoading, setBtnLoading] = useState(false);
  // 选择的性别
  const [sex, setSex] = useState(0);
  const onValuesChange = value => {
    // 修改性别
    if ('sex' in value) {
      setSex(value.sex);
    }
  };
  const onSubmit = async () => {
    const values = await form.validateFields();
    setBtnLoading(true);
    setTimeout(() => {
      setBtnLoading(false);
      alert(JSON.stringify(values));
    }, 500);
  };
  // 查询爱好
  const queryLiked = async () => {
    await new Promise(res => setTimeout(res, 500));
    setOptions([
      {
        label: '游泳',
        value: 1,
      },
      {
        label: '学习',
        value: 2,
      },
    ]);
  };
  useEffect(() => {
    queryLiked();
  }, []);
  return (
    <>
      <Button type="primary" onClick={setVisible.bind(null, true)}>
        AntdForm
      </Button>
      <Drawer
        open={visible}
        destroyOnClose
        title="编辑基本信息"
        width={500}
        footer={
          <Space align="end" style={{ position: 'relative', left: 320 }}>
            <Button type="primary" loading={btnLoading} onClick={onSubmit}>
              提交
            </Button>
            <Button onClick={setVisible.bind(null, false)}>取消</Button>
          </Space>
        }
        onClose={setVisible.bind(null, false)}
      >
        <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
          <Form.Item
            label="客户姓名"
            name="name"
            rules={[{ required: true, message: '客户姓名不能为空' }]}
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          <Form.Item
            label="客户性别"
            name="sex"
            rules={[{ required: true, message: '客户性别不能为空' }]}
          >
            <Radio.Group
              options={[
                { label: '男', value: 1 },
                { label: '女', value: 2 },
              ]}
            />
          </Form.Item>
          {sex === 1 && (
            <Form.Item
              label="客户年纪"
              name="age"
              rules={[{ required: true, message: '客户年纪不能为空' }]}
            >
              <InputNumber
                placeholder="请输入客户年纪"
                min={18}
                max={99}
                style={{ width: '100%' }}
              />
            </Form.Item>
          )}
          <Form.Item
            label="客户个人的爱好"
            name="liked"
            rules={[{ required: true, message: '客户个人的爱好不能为空' }]}
          >
            <Select placeholder="请选择客户个人的爱好" options={options} />
          </Form.Item>
          <Form.Item
            label="设置客户节假日"
            name="holidays"
            rules={[{ required: true, message: '客户节假日不能为空' }]}
          >
            <HolidaysSetting />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
