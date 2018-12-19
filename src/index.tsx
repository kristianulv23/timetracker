import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
import './styles.scss';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("app")
);