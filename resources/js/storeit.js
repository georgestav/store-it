import React from "react";
import ReactDOM from "react-dom";
import Storeit from "./storeit/Storeit.jsx";
import "./storeit.css";

ReactDOM.render(<Storeit />, document.querySelector("#app"));

setTimeout(() => {
    console.log("📦 StoreIt 📦");
}, 10);
setTimeout(() => {
    console.log("   Team:   ");
}, 1000);
setTimeout(() => {
    console.log(
        "📦 George Stavroulakis, https://www.linkedin.com/in/george-stavroulakis-35118851/  📦"
    );
}, 2000);
setTimeout(() => {
    console.log(
        "📦 Matěj Bašta, https://www.linkedin.com/in/mat%C4%9Bj-ba%C5%A1ta-265325143/  📦"
    );
}, 3000);
setTimeout(() => {
    console.log(
        "📦 Sean Matlock, https://www.linkedin.com/in/seanmatlock/  📦"
    );
}, 4000);
setTimeout(() => {
    console.log(
        "Github link to the project: https://github.com/georgestav/store-it"
    );
}, 5000);
setTimeout(() => {
    console.log(
        "--------------------------------------------------------------------------"
    );
}, 6000);
setTimeout(() => {
    console.log("This is just the beginning!!!");
}, 7000);
