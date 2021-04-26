import React from 'react';
import { useObserver } from 'mobx-react';
import {user} from '@/store/user'

export default function Home (): React.ReactElement {

  console.log('-----------')
  console.log(process.env.NODE_ENV)
  console.log(import.meta.env)
  
  
  console.log('-----------')
  

  return useObserver(() => {
    return <div>
      username: {user.user.name}
      年龄：${user.user.age}
    </div>
  });
}