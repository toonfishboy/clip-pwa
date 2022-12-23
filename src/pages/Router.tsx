import {FC} from "react";
import {createHashHistory, createReactRouter, createRouteConfig, RouterProvider} from "@tanstack/react-router";
import Home from "./Home";
import ContainerCalculator from "./Calculator/ContainerCalculator";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
    path: "/",
    component: Home
});

const containerRoute = rootRoute.createRoute({
    path: "/container",
    component: ContainerCalculator
});

const pipeCableRoute = rootRoute.createRoute({
    path: "/pipeCable",
});

const routeConfig = rootRoute.addChildren([indexRoute, containerRoute, pipeCableRoute]);

const hashHistory = createHashHistory();

const router = createReactRouter({routeConfig, history: hashHistory});

const Router: FC = () => (
    <RouterProvider router={router}/>
);

export default Router;
