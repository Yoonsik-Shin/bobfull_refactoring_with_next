import { NextRouter } from "next/router";
import { SetterOrUpdater } from "recoil";

export interface IVariable {
  router: NextRouter;
  accessToken: string;
  setAccessToken: SetterOrUpdater<any>;
  setIsLogin: SetterOrUpdater<any>;
}
