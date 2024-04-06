import React from 'react';
import type { SortableContainerProps, SortEnd } from 'react-sortable-hoc';
export declare const DragHandle: React.ComponentClass<unknown, any>;
export declare const SortableItem: React.ComponentClass<import("react-sortable-hoc").SortableElementProps, any>;
export declare const SortableBody: React.ComponentClass<SortableContainerProps, any>;
export declare const onSortEnd: ({ setDataSource, dataSource, oldIndex, newIndex, }: SortEnd & {
    setDataSource: any;
    dataSource: [];
}) => {
    oldIndex: number;
    newIndex: number;
    dataSource: never[];
};
export declare const DraggableContainer: (props: (SortableContainerProps & {
    dataSource: [];
    setDataSource: any;
    onDragDone: any;
    children: any;
})) => React.JSX.Element;
export declare const DraggableBodyRow: React.FC<any>;
