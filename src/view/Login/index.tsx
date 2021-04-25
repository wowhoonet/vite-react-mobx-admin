import React from 'react';
import {loginService} from '@/service/login'
import { useHistory } from 'react-router';

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
    <button onClick={onLogin}>登录</button>
  </div>;
}