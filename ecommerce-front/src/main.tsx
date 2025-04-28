
import { createRoot } from 'react-dom/client'
import AppRouter from '@routes/AppRouter';
// redux
import { Provider } from 'react-redux';
import { store, persistor } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';
import "./services/axios-global.js";

//styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '@styles/global.css';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* دا عشات اخزن في لوكال استورتج */}
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
)
