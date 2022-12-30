import { FC } from "react";
import {
	createHashHistory,
	createReactRouter,
	createRouteConfig,
	RouterProvider,
} from "@tanstack/react-router";
import Home from "./Home";
import ContainerCalculator from "./Calculator/ContainerCalculator";
import PipeCableCalculator from "./Calculator/PipeCableCalculator";
import LeakageCalculator from "./Calculator/LeakageCalculator";

const rootRoute = createRouteConfig();

const indexRoute = rootRoute.createRoute({
	path: "/",
	component: Home,
});

const containerRoute = rootRoute.createRoute({
	path: "/container",
	component: ContainerCalculator,
});

const pipeCableRoute = rootRoute.createRoute({
	path: "/pipeCable",
	component: PipeCableCalculator,
});

const leakageRoute = rootRoute.createRoute({
	path: "/leakage",
	component: LeakageCalculator,
});

const routeConfig = rootRoute.addChildren([
	indexRoute,
	containerRoute,
	pipeCableRoute,
	leakageRoute,
]);

const hashHistory = createHashHistory();

const router = createReactRouter({ routeConfig, history: hashHistory });

const Router: FC = () => <RouterProvider router={router} />;

export default Router;
