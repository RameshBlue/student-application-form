import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PageProvider from './context/PageContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PageProvider>
      <App />
    </PageProvider>
  </React.StrictMode>
)
