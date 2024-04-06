import React from 'react';
import './index.less';
declare function CopyLabelContent({ label, content, copyable, type, style, contentStyle, iconStyle, copyTxt, onCopy, ellipsis, }: {
    label?: string;
    content: string;
    copyable?: boolean;
    type?: 'default' | 'primary';
    style?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    iconStyle?: React.CSSProperties;
    copyTxt?: string;
    onCopy?: () => void;
    ellipsis?: boolean;
}): React.JSX.Element;
export default CopyLabelContent;
