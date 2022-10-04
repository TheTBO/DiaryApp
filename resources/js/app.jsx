import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { IconContext } from "react-icons";
import store from "@/Redux/Store";
import { Provider } from "react-redux";

const appName =
    window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

function resolvePage(name) {
    const pages = import.meta.glob(`./Pages/**/*.jsx`);
    for (const path in pages) {
        if (path.endsWith(`${name}.jsx`)) {
            return typeof pages[path] === "function"
                ? pages[path]()
                : pages[path];
        }
    }
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePage(name),
    setup({ el, App, props }) {
        return render(
            <Provider store={store}>
                <IconContext.Provider value={{ className: "icon" }}>
                    <App {...props} />
                </IconContext.Provider>
            </Provider>,
            el
        );
    },
});
