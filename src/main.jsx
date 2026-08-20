import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { schedulePixel } from './pixel.js'
import './index.css'

schedulePixel()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
