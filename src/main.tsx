import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Router from "./pages/Router";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<RecoilRoot>
			<Router />
		</RecoilRoot>
	</StrictMode>,
);
