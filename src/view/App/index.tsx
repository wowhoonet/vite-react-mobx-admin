import { IRoute, routes } from "@/route";
import React, { Suspense, useMemo } from "react";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import styles from "./index.module.less";

export default function App(): React.ReactElement {
  const getChildrenComponent = (
    route: IRoute,
    key: number,
    pPath: string = ""
  ) => {
    const path = pPath + route.path;
    return route.redirect ? (
      <Redirect key={key} to={route.redirect} from={route.path}></Redirect>
    ) : (
      (route.component || route.routes?.length > 0) && (
        <Route key={key} path={path} exact={route.exact}>
          {route.wrappers?.length > 0
            ? route.wrappers.reduceRight(
                (element: any, wrapper: any) =>
                  React.createElement(wrapper, {}, element),
                React.createElement(
                  route.component || React.Fragment,
                  {},
                  <Switch>
                    {route?.routes?.map((croute, rindex) =>
                      getChildrenComponent(croute, rindex, path)
                    )}
                  </Switch>
                )
              )
            : React.createElement(
                route.component || React.Fragment,
                {},
                <Switch>
                  {route?.routes?.map((croute, rindex) =>
                    getChildrenComponent(croute, rindex, path)
                  )}
                </Switch>
              )}
        </Route>
      )
    );
  };

  const Routes = useMemo(() => {
    const _Routes = routes.map((route, rindex) =>
      getChildrenComponent(route, rindex)
    );
    console.log(_Routes, "_Routes");
    return _Routes;
  }, []);

  return (
    <Suspense fallback={<div>加载中</div>}>
      <HashRouter basename="/">
        <Switch>{Routes}</Switch>
      </HashRouter>
    </Suspense>
  );
}
