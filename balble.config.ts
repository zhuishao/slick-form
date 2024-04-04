module.exports = function (api) {
    api.cache(true);
  
    const plugins = [
      // 其他插件...
      'lodash', // 添加 babel-plugin-lodash
    ];
  
    return {
      // 配置的其他属性...
      plugins,
    };
  };
  