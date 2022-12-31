import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Router from "./pages/Router";
import { RecoilRoot } from "recoil";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./controls/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<RecoilRoot>
				<Router />
			</RecoilRoot>
		</ErrorBoundary>
	</StrictMode>,
);
