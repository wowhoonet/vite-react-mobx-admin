import React from 'react';
import { Redirect } from 'react-router';
import styles from './index.module.less';

export default function Auth (props: {
  children: React.ReactElement
}): React.ReactElement {
  const isLogin =  false; // 后续换成自己的 token 校验
  const {children, ...cprops} = props;
  if(isLogin) {
    return children
  }
  return <Redirect to="/login"></Redirect>;
}