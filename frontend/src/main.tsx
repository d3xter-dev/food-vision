import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['api_key'] = import.meta.env.VITE_API_KEY

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
)
