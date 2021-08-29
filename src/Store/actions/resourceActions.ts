import ResourceTypes from 'Store/types/resourceTypes'
import { initialState, stateMapping } from 'Store/reducers/resources/resourceReducer'
import Entities from 'Models/Entities'
import { resourceEntity } from 'Models/resourceEntities'

export interface StandardAction {
  readonly type: ResourceTypes
  readonly entity: Entities
  readonly payload: any
}

export interface ResourcesAction extends StandardAction {
  readonly payload: resourceEntity
}

export const fetchedResource = (entity: Entities, data: resourceEntity): StandardAction => {
  return {
    type: ResourceTypes.FETCH_RESOURCE,
    entity,
    payload: data,
  }
}

export const successResource = (entity: Entities, data: resourceEntity): ResourcesAction => {
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
