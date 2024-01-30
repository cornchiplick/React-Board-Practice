import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import DebugObserver from './recoil/DebugObserver.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
      staleTime: 20 * 1000,
      gcTime: 5 * 60 * 1000
    },
    mutations: {
      throwOnError: true
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver/>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}/>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
