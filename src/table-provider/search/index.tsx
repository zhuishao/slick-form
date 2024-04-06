/* eslint-disable prefer-destructuring */
import { cloneDeep, isEmpty } from '@/util';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Form } from '../../index';
import { Ctx } from '../store';
import { SearchProps } from '../types';
import './index.less';

export default ({
  layout = 'inline',
  hidden = false, // 默认展示
  labelCol = { span: 8 },
  wrapperCol = { span: 16 },
  fields = [],
  form = Form.useForm()[0],
  onSearch = () => {},
  onReset = () => {},
  loading = false,
  column = 4,
  toolReverse = false,
  defaultExpand = false,
  clearInitialValuesOnReset = false,
  gridStyle = {
    rowGap: 20,
    columnGap: 20,
  },
  className = '',
  ...rest
}: SearchProps) => {
  // 空拦截
  if (fields === undefined || fields.length === 0) {
    return null;
  }
  const ctx: any = useContext(Ctx);
  const notCtx = isEmpty(ctx);
  const [more, setMore] = useState(defaultExpand);
  /** search */
  const search = async (params = {}) => {
    const values = await form.submit(); // 提交
    if (typeof ctx.onSearch === 'function') {
      ctx.onSearch({
        ...values,
        ...params,
      });
    }
    if (typeof onSearch === 'function') {
      onSearch(values);
    }
  };
  // 克隆 fields
  const cloneFields = useMemo(() => {
    const newFields =
      typeof fields === 'function'
        ? cloneDeep(fields(form))
        : cloneDeep(fields);
    return newFields;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]); // cloneDeep 避免被污染
  /** reset */
  const reset = async () => {
    // 重置逻辑
    const clearValue: any = {};
    Object.keys(form.getFieldsValue()).forEach(key => {
      clearValue[key] = undefined;
    });
    // resetField会导致Item卸载，例如会触发AsyncSelect再次发送请求
    if (typeof ctx.onReset === 'function') {
      form.setValues({
        ...clearValue,
        ...(clearInitialValuesOnReset ? {} : ctx.initialSearchValues || {}), // 是否保留默认值选项
      });
      ctx.onReset(clearInitialValuesOnReset);
    } else {
      form.setValues({
        ...clearValue,
        ...(clearInitialValuesOnReset ? {} : rest.initialValues || {}), // 是否保留默认值选项
      });
    }
    // 通知清除动作
    if (typeof onReset === 'function') {
      onReset();
    }
  };
  /**
   * 挂载search、reset
   */
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    form.search = search;
    // eslint-disable-next-line no-param-reassign
    form.reset = reset;
    if (typeof ctx.setRefresh === 'function') {
      // table Refresh
      // eslint-disable-next-line no-param-reassign
      form.refresh = () => {
        ctx.setRefresh(Math.random());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /** moreRender */
  const moreLabel = useMemo(() => {
    return (
      <React.Fragment>
        {more ? '收起' : '展开'}
        <i
          className={
            more ? 'expand iconfont spicon-zhankai' : 'iconfont spicon-zhankai'
          }
        />
      </React.Fragment>
    );
  }, [more]);
  /** touch search fields */
  const autosearchFields: any = [];
  cloneFields.forEach((field: any) => {
    if (field.autosearch === 1) {
      autosearchFields.push(field.name);
    }
    // 处理输入框回车查询以及粘贴带空格问题
    if (['Input', 'InputNumber', 'CountInput'].includes(field.type)) {
      field.isSearchForm = true;
      if (field.props === undefined) {
        // eslint-disable-next-line no-param-reassign
        field.props = {};
      }
      // eslint-disable-next-line no-param-reassign
      field.props.onPressEnter = () => {
        search();
      };
      // 解决粘贴 自带空格的问题
      if (field.type !== 'InputNumber' && field.props.onPaste === undefined) {
        field.props.onPaste = e => {
          const target = e.target;
          // 需要延迟下不然有问题
          setTimeout(() => {
            form.setFieldsValue({
              [field.name]: target.value?.trim(),
            });
          });
        };
      }
    }
  });
  const tools: any = [
    {
      label: '重置',
      type: 'default',
      key: 'reset',
      onClick: () => {
        reset();
      },
    },
    {
      label: '查询',
      key: 'search',
      type: 'primary',
      htmlType: 'submit',
      onClick: () => {
        search();
      },
    },
  ];
  if (toolReverse) {
    // 反转下
    tools.reverse();
  }
  // 是否有更多查询
  if (
    cloneFields.some((field: any) => {
      return (
        field.ismore &&
        (typeof field.isShow === 'function' ? field.isShow() : true)
      );
    })
  ) {
    tools.push({
      type: 'link',
      key: 'more',
      label: moreLabel,
      onClick: () => {
        setMore(!more);
      },
    });
  }
  const searchBtn = (
    <div className="tools-btn-box">
      {tools.map((tool: any) => {
        return (
          <Button
            {...tool}
            loading={
              ['查询', '重置'].includes(tool.label) &&
              (notCtx ? loading : ctx.loading)
            }
          >
            {tool.label}
          </Button>
        );
      })}
    </div>
  );
  const searchBtnField = {
    type: 'Render',
    key: 'btn-render',
    className: 'grid-search-btn',
    props: {
      render() {
        return searchBtn;
      },
    },
  };
  const _fields: any = [...cloneFields, searchBtnField];
  // classNames
  const searchCls = classNames('slick-form-search', {
    [className]: className !== '',
    'slick-form-search-hidden': hidden,
    'slick-form-search-expand': more,
    [`slick-form-search-${layout}-expand`]: more,
    [`slick-form-search-${layout}`]: true,
  });
  return (
    <Form
      className={searchCls}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      initialValues={ctx.params}
      form={form}
      fields={_fields}
      column={column}
      gridStyle={gridStyle}
      onFieldsChange={(changedFields: any) => {
        if (!isEmpty(changedFields)) {
          if (autosearchFields.includes(changedFields[0].name[0])) {
            search();
          }
        }
      }}
      {...rest}
    />
  );
};
