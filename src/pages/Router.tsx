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
import ContainerLeakageCalculator from "./Calculator/ContainerLeakageCalculator";
import Settings from "./Misc/Settings";
import AirCurrentCalculator from "./Calculator/AirCurrentCalculator";

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

const airCurrentRoute = rootRoute.createRoute({
	path: "/airCurrent",
	component: AirCurrentCalculator,
});

const leakageRoute = rootRoute.createRoute({
	path: "/leakage",
	component: LeakageCalculator,
});

const containerLeakageRoute = rootRoute.createRoute({
	path: "/containerLeakage",
	component: ContainerLeakageCalculator,
});

const settingsRoute = rootRoute.createRoute({
	path: "/settings",
	component: Settings,
});

const routeConfig = rootRoute.addChildren([
	indexRoute,
	airCurrentRoute,
	containerRoute,
	pipeCableRoute,
	leakageRoute,
	containerLeakageRoute,
	settingsRoute,
]);

const hashHistory = createHashHistory();

const router = createReactRouter({ routeConfig, history: hashHistory });

const Router: FC = () => <RouterProvider router={router} />;

export default Router;
