/**
 * 测试 class @写法
 */

import { observable } from "mobx";

class CTestStore {
  @observable name: string = '我是名字'
}

export const cTest = new CTestStore();