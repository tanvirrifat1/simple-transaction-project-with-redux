import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer position="top-center" theme="dark"
            />
            <App />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
