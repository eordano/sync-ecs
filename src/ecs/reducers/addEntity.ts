import { ECS } from '../types/EntityComponentState'
import { EntityId } from '../types/Entity'
import { generateId } from '../generateId'

export function addEntity(state: ECS, parentId?: EntityId, entityId?: EntityId): ECS {
  const result = entityId === undefined ? generateId(state.seed) : state.seed
  const seed = entityId === undefined ? result[1] : state.seed
  entityId = entityId === undefined ? result[0] : entityId
  parentId = parentId === undefined ? state.rootEntityId : parentId
  return {
    ...state,
    seed,
    entities: [...state.entities, entityId],
    parent: { ...state.parent, [entityId]: parentId },
    entityComponents: { ...state.entityComponents, [entityId]: [] }
  }
}
