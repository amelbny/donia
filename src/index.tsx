import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './Hooks/AuthProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModalProvider } from './Context/ModalContext';
import { FormProvider } from './Context/FormDataContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <Router>
        <AuthProvider>
            <FormProvider>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </FormProvider>
        </AuthProvider>
      </Router>
    </ModalProvider>
  </React.StrictMode>
);

reportWebVitals();
