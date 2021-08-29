import { combineReducers } from 'redux'
import { resourcesReducer } from 'Store/reducers/resources/resourceReducer'

const reducers = {
  resources: resourcesReducer,
}

const rootReducer = combineReducers({
  ...reducers,
})

export default rootReducer
