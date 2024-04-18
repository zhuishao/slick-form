/**
 * 实现一个常用的表单功能
 */
import { Drawer, Space } from 'antd';
import React, { useState } from 'react';
import { Button, Form } from 'slick-form';
import HolidaysSetting from './holidays-setting';

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const onSubmit = async () => {
    const values = await form.submit();
    alert(JSON.stringify(values));
  };
  return (
    <React.Fragment>
      <Button type="primary" onClick={setVisible.bind(null, true)}>
        slick-form-jsx
      </Button>
      <Drawer
        open={visible}
        destroyOnClose
        title="编辑基本信息"
        width={500}
        footer={
          <Space align="end" style={{ position: 'relative', left: 340 }}>
            <Button type="primary" spin onClick={onSubmit}>
              提交
            </Button>
            <Button onClick={setVisible.bind(null, false)}>取消</Button>
          </Space>
        }
        onClose={setVisible.bind(null, false)}
      >
        <Form form={form}>
          <Form.Input label="客户姓名" name="name" required />
          <Form.RadioGroup
            label="客户性别"
            name="sex"
            required
            options={[
              { label: '男', value: 1 },
              { label: '女', value: 2 },
            ]}
          />
          <Form.InputNumber
            label="客户年纪"
            effect={['sex']}
            isShow={({ sex }) => {
              return sex === 1;
            }}
            name="age"
            required
            min={18}
            max={99}
          />
          <Form.AsyncSelect
            label="客户个人的爱好"
            name="liked"
            required
            options={async () => {
              await new Promise(res => setTimeout(res, 1000));
              return [
                {
                  label: '游泳',
                  value: 1,
                },
                {
                  label: '学习',
                  value: 2,
                },
              ];
            }}
          />
          <HolidaysSetting required label="设置客户节假日" name="holidays" />
        </Form>
      </Drawer>
    </React.Fragment>
  );
};
