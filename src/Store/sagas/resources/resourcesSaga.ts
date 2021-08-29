import { takeEvery, put } from 'redux-saga/effects'
import { StandardAction } from 'Store/actions/resourceActions'
import ResourcesTypes from 'Store/types/resourceTypes'
import { unformatters as resourceUnformatters } from 'Utils/formatters/resourceUnformatters'

export function* fetchedResource(action: StandardAction): Generator {
  const entity = action.entity
  try {
    if (!entity) throw Error('no entity selected')
    const unformatter = resourceUnformatters.get(entity)
    let { payload } = action
    if (unformatter) payload = unformatter(payload)
    yield put({ type: ResourcesTypes.RESOURCE_SUCCESS, entity, payload })
  } catch (e: any) {
    yield put({ type: ResourcesTypes.RESOURCE_ERROR, payload: e.message })
  }
}

function* watchLists(): Generator {
  yield takeEvery(ResourcesTypes.FETCH_RESOURCE, fetchedResource)
}

export default watchLists
