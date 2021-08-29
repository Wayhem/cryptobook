import ResourceTypes from 'Store/types/resourceTypes'
import { initialState, stateMapping } from 'Store/reducers/resources/resourceReducer'
import Entities from 'Models/Entities'
import { resourceEntity } from 'Models/resourceEntities'

export interface ResourcesAction {
  readonly type: ResourceTypes
  readonly entity: Entities
  readonly payload: resourceEntity
}

export const fetchSuccessResource = (entity: Entities, data: resourceEntity): ResourcesAction => {
  return {
    type: ResourceTypes.RESOURCE_SUCCESS,
    entity,
    payload: data,
  }
}

export const resetResource = (entity: Entities): ResourcesAction => {
  return {
    type: ResourceTypes.RESET_RESOURCE,
    entity,
    payload: initialState[stateMapping[entity]],
  }
}
