import { Button, Empty, Form, message } from 'antd';
import React, { useRef } from 'react';
import Item from '../../../form/item';
import Grid from '../../../grid';
import './index.less';

export default ({
  form,
  name,
  event,
  widgets,
  fields,
  disabled = false,
  readOnly = false,
  operation = true,
  operationText = '添加',
  maxCount = 9999,
  leastOne = false,
  label = '',
  actionRef = useRef({}),
  grid = {
    gridStyle: {
      rowGap: 0,
      columnGap: 20,
    },
    column: 2,
  },
}: any) => {
  // 是否可以操作
  const notOperation = !operation || readOnly || disabled;
  return (
    <Form.List name={name}>
      {(f, { add, remove }) => {
        actionRef.current[name] = {
          add: async (...p) => {
            if (notOperation) {
              return message.info('不可操作');
            }
            if (f?.length === maxCount) {
              return message.info(`最多只能添加${maxCount}条`);
            }
            add(...p);
          },
          remove: async (idx = 0) => {
            if (notOperation) {
              return message.info('不可操作');
            }
            if (leastOne && f.length === 1) {
              return message.info('至少保留一条');
            }
            remove(idx);
          },
        };
        return (
          <React.Fragment>
            {f.map((item: any, index, { length }) => {
              return (
                <div className="form-lib-list-item" key={item.key || item.name}>
                  <div className="form-lib-list-block">
                    <span className="form-list-block-label">
                      {label}
                      {index + 1}
                    </span>
                    {!notOperation && (
                      <Button
                        type="link"
                        disabled={
                          (leastOne && index === 0 && length === 1) || disabled
                        }
                        onClick={() => remove(item.name)}
                      >
                        删除
                      </Button>
                    )}
                  </div>
                  <Grid {...grid}>
                    {fields?.map((field: any) => {
                      const _field = { ...field }; // 浅拷贝一下
                      _field.name = [item.name, _field.name];
                      return (
                        <Item
                          readOnly={readOnly}
                          disabled={disabled || _field?.props?.disabled}
                          form={form}
                          widgets={widgets}
                          event={event}
                          initialValues={form.initialValues}
                          field={_field}
                          formListName={name} // 子表单的名字
                          fieldKey={[item.fieldKey, _field.name]}
                          key={_field.name || _field.key}
                        />
                      );
                    })}
                  </Grid>
                </div>
              );
            })}
            {notOperation && f.length === 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {!notOperation && (
              <Form.Item>
                <Button
                  type="dashed"
                  className="form-lib-block-btn"
                  disabled={f.length === maxCount || disabled}
                  onClick={() => add()}
                  block
                >
                  {operationText}
                </Button>
              </Form.Item>
            )}
          </React.Fragment>
        );
      }}
    </Form.List>
  );
};
