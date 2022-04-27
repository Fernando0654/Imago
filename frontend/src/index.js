import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { LanguageProvider } from "./context/lang.context";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk)
));

// Without redux extension:
// const store = createStore(reducers, compose(applyMiddleware(thunk)))

ReactDOM.render(
    <LanguageProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </LanguageProvider>,
    document.getElementById('app')
);
