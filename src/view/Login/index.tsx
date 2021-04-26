import React from 'react';
import {loginService} from '@/service/login'
import { useHistory } from 'react-router';
import { Button } from 'antd';

export default function Login (): React.ReactElement {
  const history = useHistory();

  const onLogin = () => {
    loginService.logIn({
      userName: 'wowhoo',
      password: '123',
    }).then(() => {
      history.push('/home')
    })
  }
  return <div>
    登录页面
    <Button onClick={onLogin} type='primary'>登录</Button>
  </div>;
}