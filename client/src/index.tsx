import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { store, pStore } from './redux/app/store';
import { PersistGate } from 'redux-persist/integration/react'
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate persistor={pStore}>
      <App />
    </PersistGate>
  </Provider>
);
