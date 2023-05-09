import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import { WebRouters } from './routers'
import store from "./store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebRouters />
    </Provider>
  </React.StrictMode>,
)
