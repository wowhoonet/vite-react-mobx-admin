import React from 'react';
import { useObserver } from 'mobx-react';
import {user} from '@/store/user'

export default function Home (): React.ReactElement {


  return useObserver(() => {
    return <div>
      username: {user.user.name}
      年龄：${user.user.age}
    </div>
  });
}