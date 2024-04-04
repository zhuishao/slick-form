import { Button as AButton, Dropdown, Menu, Space } from 'antd';
import { Button } from '../../index';
import FilterColumns from './filter-columns';

export default props => {
  const {
    title = '',
    filterIds = [], // 过滤的字段
    columns = [], // 全部的列
    tools = [], // 顶部工具栏
    toolsAlign = 'right',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toolsClick = (tool: any) => {}, // 顶部工具栏点击回调
    onFilter = () => {}, // filter 回调
    onRefresh = () => {}, // refresh
    onSearch = () => {}, // search
    payload,
    setColumns = Function,
    size = 'default',
    toolBarClass = '',
    tableId,
    selectedRows = [],
  } = props;
  // toolClick
  const handelClick = async (tool: any) => {
    if (tool.disabled) {
      return;
    }
    if (tool.type === 'Refresh') {
      onRefresh();
    }
    if (typeof tool.onClick === 'function') {
      await tool.onClick(payload, {
        onSearch,
        onRefresh,
        selectedRows,
      });
    }
    await toolsClick({ ...tool }, { onSearch, onRefresh, selectedRows }); // 外部回调
  };
  const renderTool = (tool: any) => {
    const btnProps = {
      ...tool,
      key: tool.key || tool.type || tool.label,
      onClick: handelClick.bind(null, tool),
    };
    /** 扩展 modalFormProps, drawerFormProps 参数 */
    const { modalFormProps, drawerFormProps } = tool;
    if (typeof tool.modalFormProps === 'function') {
      tool.modalFormProps = async () =>
        await modalFormProps({
          onSearch,
          onRefresh,
        });
    }
    if (typeof tool.drawerFormProps === 'function') {
      tool.drawerFormProps = async () =>
        await drawerFormProps({
          onSearch,
          onRefresh,
        });
    }
    switch (tool.type) {
      case 'Export':
        return (
          <Button {...btnProps} type={tool.btnType || 'default'} spin>
            {tool.label || '导出数据'}
          </Button>
        );
      case 'Refresh':
        return (
          <Button
            {...btnProps}
            type="default"
            icon={<i className="iconfont spicon-shuaxin" />}
          />
        );
      case 'FilterColumns':
        return (
          <FilterColumns
            key="filter-columns"
            tableId={tableId}
            filterIds={filterIds}
            columns={columns}
            setColumns={setColumns}
            onOk={onFilter}
          />
        );
      case 'Render':
        return tool.render({
          onSearch, // 传递一个查询Api
        }); // 自定义渲染
      case 'Dropdown':
        return tool.menu?.length > 0 ? (
          <Dropdown
            disabled={tool.disabled}
            key={tool.key || tool.type || tool.label}
            overlay={
              <Menu
                onClick={item => {
                  handelClick(item);
                }}
              >
                {tool.menu?.map((item: any, index: number) => {
                  if (item.type === 'Divider') {
                    return <Menu.Divider key={item.key || index} />;
                  }
                  return (
                    <Menu.Item key={item.key || tool.label}>
                      {item.label}
                    </Menu.Item>
                  );
                })}
              </Menu>
            }
            trigger={tool.trigger || ['click']}
          >
            <AButton
              type={tool.btnType || 'default'}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {tool.label}
              <i
                className="iconfont spicon-zhankai"
                style={{ fontSize: 12, marginLeft: 4 }}
              />
            </AButton>
          </Dropdown>
        ) : null;
      default:
        return (
          <Button {...btnProps} type={tool.btnType || 'primary'}>
            {tool.label}
          </Button>
        );
    }
  };
  // 支持方案
  const _tools = [...tools];
  return (_tools && _tools.length > 0) || title ? (
    <div
      className={
        size === 'small'
          ? `table-form-header-small table-align-${toolsAlign} ${toolBarClass}`
          : `table-form-header table-align-${toolsAlign} ${toolBarClass}`
      }
    >
      <div className="table-form-header-left">{title}</div>
      <div className="table-form-header-right">
        <Space>
          {_tools.map((tool: any) => {
            return renderTool(tool);
          })}
        </Space>
      </div>
    </div>
  ) : null;
};
