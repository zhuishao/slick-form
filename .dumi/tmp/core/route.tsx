// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"404":{"id":"404","path":"*","parentId":"DocLayout"},"dumi-context-layout":{"id":"dumi-context-layout","path":"/","isLayout":true},"DocLayout":{"id":"DocLayout","path":"/","parentId":"dumi-context-layout","isLayout":true},"docs/tools/index":{"path":"tools","id":"docs/tools/index","parentId":"DocLayout"},"docs/index":{"path":"","id":"docs/index","parentId":"DocLayout"},"demo-render":{"id":"demo-render","path":"~demos/:id","parentId":"dumi-context-layout"}} as const;
  return {
    routes,
    routeComponents: {
'404': React.lazy(() => import(/* webpackChunkName: "nm__dumi__dist__client__pages__404" */'C:/Applications/works/slick-form/node_modules/dumi/dist/client/pages/404.js')),
'dumi-context-layout': React.lazy(() => import(/* webpackChunkName: "dumi__tmp__dumi__theme__ContextWrapper" */'C:/Applications/works/slick-form/.dumi/tmp/dumi/theme/ContextWrapper')),
'DocLayout': React.lazy(() => import(/* webpackChunkName: "nm__dumi__theme-default__layouts__DocLayout__index" */'C:/Applications/works/slick-form/node_modules/dumi/theme-default/layouts/DocLayout/index.js')),
'docs/tools/index': React.lazy(() => import(/* webpackChunkName: "docs__tools__index.md" */'C:/Applications/works/slick-form/docs/tools/index.md')),
'docs/index': React.lazy(() => import(/* webpackChunkName: "docs__index.md" */'C:/Applications/works/slick-form/docs/index.md')),
'demo-render': React.lazy(() => import(/* webpackChunkName: "nm__dumi__dist__client__pages__Demo__index" */'C:/Applications/works/slick-form/node_modules/dumi/dist/client/pages/Demo/index.js')),
},
  };
}