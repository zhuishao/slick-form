/**
 * 实现一个常用的表单功能
 */
import React from 'react';
import { Button } from 'slick-form';
import HolidaysSetting from './holidays-setting';
import fields from './schema';

export default () => {
  return (
    <Button
      type="primary"
      drawerFormProps={{
        title: '编辑基本信息',
        fields,
        onSubmit: async values => {
          alert(JSON.stringify(values));
        },
        widgets: {
          HolidaysSetting,
        },
      }}
    >
      slick-form-schema
    </Button>
  );
};
