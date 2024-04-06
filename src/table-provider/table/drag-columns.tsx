import { MenuOutlined } from '@ant-design/icons';
import React from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';

export const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

export const SortableItem = SortableElement(
  (props: React.HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
);
export const SortableBody = SortableContainer(
  (props: React.HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />
);

export const onSortEnd = ({
  setDataSource,
  dataSource,
  oldIndex,
  newIndex,
}:
  | SortEnd & {
      setDataSource: any;
      dataSource: [];
    }) => {
  if (oldIndex !== newIndex) {
    const newData = arrayMove(dataSource.slice(), oldIndex, newIndex).filter(
      el => !!el
    );
    setDataSource(newData);
    return {
      oldIndex,
      newIndex,
      dataSource: newData,
    };
  }
};

export const DraggableContainer = (
  props:
    | SortableContainerProps & {
        dataSource: [];
        setDataSource: any;
        onDragDone: any;
        children: any;
      }
) => (
  <SortableBody
    useDragHandle
    disableAutoscroll
    helperClass="table-provider-row-dragging"
    onSortEnd={e => {
      props.onDragDone(
        onSortEnd({
          setDataSource: props.setDataSource,
          dataSource: props.dataSource,
          ...e,
        })
      );
    }}
    {...props}
  />
);

export const DraggableBodyRow: React.FC<any> = ({
  className,
  style,
  dataSource,
  ...restProps
}) => {
  const index = dataSource.findIndex(
    x => x.index === restProps['data-row-key']
  );
  return <SortableItem index={index} {...restProps} />;
};
