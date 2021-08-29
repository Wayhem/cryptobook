import { all } from 'redux-saga/effects'
import resourcesSaga from 'Store/sagas/resources/resourcesSaga'

function* rootSaga(): Generator {
  const sagasList = [resourcesSaga()]

  yield all(sagasList)
}

export default rootSaga
