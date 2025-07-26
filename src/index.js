import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Replace this with your actual client ID from Google Cloud Console
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Main />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
