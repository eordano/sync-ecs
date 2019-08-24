import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { generateId } from '../util/generateId'
import { canAddEntity } from '../selectors/canAddEntity'

export function addEntity(state: ECS, parentId?: EntityId, entityId?: EntityId): ECS {
  const result = entityId === undefined ? generateId(state.seed) : state.seed
  const seed = entityId === undefined ? result[1] : state.seed
  entityId = entityId === undefined ? result[0] : entityId
  if (parentId !== undefined && state.entityComponents[parentId] === undefined) {
    parentId = undefined
  }
  parentId = parentId === undefined ? state.rootEntityId : parentId
  if (!canAddEntity(state, parentId, entityId)) {
    return state
  }
  return {
    ...state,
    seed,
    entities: [...state.entities, entityId],
    parent: { ...state.parent, [entityId]: parentId },
    entityComponents: { ...state.entityComponents, [entityId]: [] }
  }
}
