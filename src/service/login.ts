import { IUser } from "@/interface/user";
import { user } from "@/store/user";
import { runInAction } from "mobx";

export const loginService = {
  logIn({}: { userName: string; password: string }): Promise<IUser> {
    // 模拟请求
    return new Promise((resolve, reject) => {
      const rep =  {
        token: 'xxx',
        user: {
          name: 'wowhoo',
          age: 24
        }
      }
      // 将两次赋值操作放入一次 action 动作内，避免重复通知
      runInAction(() => {
        user.token = rep.token;
        user.user = rep.user;
      })
      resolve(rep.user)
    })
  },
};
