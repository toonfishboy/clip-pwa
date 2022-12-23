import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import Router from "./pages/Router";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Router/>
    </StrictMode>,
);
