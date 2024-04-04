/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-var */
import React from 'react';
import { isFragment } from 'react-is';

export function toArray(children, op?) {
  const option =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let ret = [];
  React.Children.forEach(children, function (child) {
    if ((child === undefined || child === null) && !option.keepEmpty) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else if (isFragment(child) && child.props) {
      ret = ret.concat(toArray(child.props.children, option));
    } else {
      ret.push(child);
    }
  });
  return ret;
}
