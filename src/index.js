import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.styl'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store/configureStore'

const store = configureStore()

const render = () => 
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

if (module.hot) {
  module.hot.accept('./components/App', render)
}

render()
registerServiceWorker()
