import React, { useState } from 'react';

export default () => {
  const [layer, setLayer]: any = useState({
    key: null, // 默认不展示
    data: {}, // 属性传递到layer
    newTab: false, // 默认不开新页面
  });
  return {
    open(key: string | number, data = {}, newTab = false) {
      // 打开
      setLayer({
        key,
        data,
        newTab,
      });
    },
    close() {
      // 关闭
      setLayer({
        key: null,
        data: {},
        newTab: false,
      });
    },
    createPage(Page: any, Layers: any = {}) {
      const Layer = Layers[layer.key] || null;
      return (
        <div>
          <div style={{ display: layer.newTab ? 'none' : 'block' }}>{Page}</div>
          {Layer && <Layer data={layer.data} />}
        </div>
      );
    },
  };
};
