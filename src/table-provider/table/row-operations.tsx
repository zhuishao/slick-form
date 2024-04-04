/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dropdown, Menu, Typography } from 'antd';
import { Button } from '../../index';

export default ({
  onSearch,
  onRefresh,
  rowOperations = { menus: [], showMore: 3 },
  rowOperationsClick = (a: any, b: any, index: number) => {},
}: any) => {
  rowOperations.showMore = rowOperations.showMore || 3;
  if (typeof rowOperations.menus !== 'function') {
    return false;
  }
  const RenderItem = ({ menu, record, index }: any) => {
    /** 扩展 modalFormProps, drawerFormProps 参数 */
    const { modalFormProps, drawerFormProps } = menu;
    if (typeof menu.modalFormProps === 'function') {
      menu.modalFormProps = async () =>
        await modalFormProps(
          {
            onSearch,
            onRefresh,
          },
          { ...record }
        );
    }
    if (typeof menu.drawerFormProps === 'function') {
      menu.drawerFormProps = async () =>
        await drawerFormProps(
          {
            onSearch,
            onRefresh,
          },
          { ...record }
        );
    }
    return (
      <Button
        type="link"
        {...menu}
        onClick={async () => {
          if (menu.disabled) {
            return;
          }
          if (typeof menu.onClick === 'function') {
            await menu.onClick(
              {
                onSearch,
                onRefresh,
              },
              { ...record }
            );
          }
          await rowOperationsClick({ ...menu }, { ...record }, index, {
            onSearch,
            onRefresh,
          });
        }}
      >
        {menu.copyable ? (
          <Typography.Paragraph
            copyable={menu.copyable}
            style={{ marginBottom: 0 }}
          >
            <a>{menu.label}</a>
          </Typography.Paragraph>
        ) : (
          menu.label
        )}
      </Button>
    );
  };
  return rowOperations.visible === false
    ? null
    : {
        ...rowOperations,
        ellipsis: false, // 操作列暂不接受 ellipsis
        dataIndex: 'row-operations-td-row-operation-area', // 配置默认的dataIndex, 用户不必关注改属性
        className: 'td-row-operation-area', // TODO 这里统一会覆盖操作列的className
        render: (_: any, record: any, index: number) => {
          const menus = rowOperations.menus(record, index).filter(i => {
            try {
              return typeof i.visible === 'function'
                ? i.visible(record) !== false
                : i.visible !== false;
            } catch (error) {
              console.log(error);
              return false;
            }
          }); // 提前过滤
          if (!Array.isArray(menus) || menus.length === 0) {
            return;
          }
          const showMenu =
            menus.length === rowOperations.showMore
              ? menus.slice(0, rowOperations.showMore)
              : menus.slice(0, rowOperations.showMore - 1);
          const menuItems = menus
            .slice(rowOperations.showMore - 1)
            .map(menu => {
              return (
                <Menu.Item key={menu.key || menu.label}>
                  <RenderItem menu={menu} record={record} index={index} />
                </Menu.Item>
              );
            });
          return (
            <>
              {showMenu.map(menu => {
                return (
                  <RenderItem
                    key={menu.key || menu.label}
                    menu={menu}
                    record={record}
                    index={index}
                  />
                );
              })}
              {menus.length > rowOperations.showMore && (
                <Dropdown
                  arrow
                  overlay={
                    <Menu className="slick-form-row-menu">{menuItems}</Menu>
                  }
                >
                  <a
                    className="ant-dropdown-link"
                    onClick={e => e.preventDefault()}
                  >
                    更多
                    <i
                      className="iconfont spicon-zhankai"
                      style={{ fontSize: 14, marginLeft: 6 }}
                    />
                  </a>
                </Dropdown>
              )}
            </>
          );
        },
      };
};
