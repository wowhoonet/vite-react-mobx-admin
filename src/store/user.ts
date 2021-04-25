import { IUser } from "@/interface/user";
import { observable } from "mobx";



export const user = observable<{
  token: string;
  user: IUser
}>({
  user: {} as IUser,
  token: ''
});
