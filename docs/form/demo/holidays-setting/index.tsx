/** 设置节假日 */
import { Button, Space, Tag } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ModalForm } from 'slick-form';

export default ({ value = [], onChange }: any) => {
  const [visible, setVisible] = useState(false);
  const onAdd = ({ date }) => {
    value.push(date);
    onChange(value); // 同步Form
    setVisible(false);
  };
  const onRemove = index => {
    value.splice(index, 1);
    onChange(value); // 同步Form
    setVisible(false);
  };
  return (
    <div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          添加节假日
        </Button>
        {Array.isArray(value) &&
          value.map((item, index) => {
            return (
              <Tag
                key={item}
                closable
                onClose={() => {
                  onRemove(index);
                }}
              >
                {item}
              </Tag>
            );
          })}
      </Space>
      <ModalForm
        width={500}
        title="选择节假日"
        onClose={() => {
          setVisible(false);
        }}
        fields={[
          {
            type: 'DatePicker',
            label: '选择日期',
            name: 'date',
            required: true,
            transform({ date }) {
              return {
                date: dayjs(date).format('YYYY-MM-DD'),
              };
            },
          },
        ]}
        open={visible}
        onSubmit={onAdd}
      />
    </div>
  );
};
