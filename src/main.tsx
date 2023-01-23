import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./controls/ErrorFallback";
import { RouterProvider } from "react-router-dom";
import router from "./pages/Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<RecoilRoot>
				<RouterProvider router={router} />
			</RecoilRoot>
		</ErrorBoundary>
	</StrictMode>,
);
