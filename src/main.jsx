import React from 'react'
import ReactDOM from 'react-dom/client'
//Redux toolkit
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App.jsx'
// Material ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
//Stripe
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from "./utils/stripe/stripe.utils.jsx"


import './index.css'

const persist = persistStore(store);
const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1ac8db',
      contrastText: '#fffaf0',
    },
    secondary: {
      main: '#FFFAF0',
      dark: 'rgba(25,25,25,0.6)',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
   <PersistGate persistor={persist}>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>      
    </PersistGate>
  </React.StrictMode>,
)
