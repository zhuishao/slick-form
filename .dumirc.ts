import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist', // 文档构建输出目录
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        // https://github.com/ant-design/ant-design/issues/40980
        style: false, // antd 5 不在需要babel-plugin-import的style
      },
      'antd',
    ],
  ],
  themeConfig: {
    logo: '/logo.png',
    name: 'slick-form', // 库的名称
  },
});
