import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import preloadedState from '../data'

const configureStore = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(rootReducer, preloadedState, composeEnhancers(
    applyMiddleware(thunk)
  ))

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(rootReducer)
      )
    }
  }

  return store
}

export default configureStore
