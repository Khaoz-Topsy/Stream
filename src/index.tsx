import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import { HashRouter } from 'react-router-dom';

import { DependencyInjectionProvider } from './integration/dependencyInjection';

import { getJSON, defaultConfig } from './utils';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from './redux/stateFromLocalStorage';
import { reducer } from './redux';

import * as serviceWorker from './serviceWorker';

import { App } from './appShell';
import './scss/main.scss';
import './scss/custom.scss';
import 'react-toastify/dist/ReactToastify.css';

declare global {
  interface Window {
    config: any;
    Twitch: any
    registration: any
  }
}

let persistedState: any = loadStateFromLocalStorage();

const store = createStore(
  reducer,
  persistedState,
);

store.subscribe(() => saveStateToLocalStorage(store));

window.config = window.config || {};
getJSON('/assets/config.json', (status: boolean, response: string) => {
  window.config = (status === true)
    ? response || {}
    : defaultConfig;

  if (window.config.consoleLogDebug) console.log('Config', window.config);

  // initAnalytics();
  // initLocalization(store.getState()?.settingReducer?.selectedLanguage ?? 'en');

  const app = (
    <DependencyInjectionProvider>
      <React.StrictMode>
        <Provider store={store}>
          <HashRouter>
            <App />
            <ToastContainer newestOnTop={false} />
          </HashRouter>
        </Provider>
      </React.StrictMode>
    </DependencyInjectionProvider>
  );
  ReactDOM.render(app, document.getElementById('streamApp'));

  if (window.config.reportWebVitals) {
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    reportWebVitals(console.log);
  }

  if (window.config.useServiceWorker) {
    serviceWorker.register({
      onUpdate: registration => {
        console.log('ServiceWorker Update')
        // toast.info(<UpdateButton onClick={() => updateServiceWorker(registration)} />, {
        //   autoClose: false,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        // });
      }
    });
  }
  else {
    serviceWorker.unregister();
  }
})

