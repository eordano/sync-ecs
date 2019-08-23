import { ECS } from '../types/EntityComponentState'
import { EntityId } from '../types/Entity'

export function removeEntity(state: ECS, entityId: EntityId): ECS {
  if (state.parent[entityId] === undefined) {
    return state
  }
  const parent = { ...state.parent }
  delete parent[entityId]
  const entityComponents = { ...state.entityComponents }
  delete entityComponents[entityId]
  return {
    ...state,
    entities: state.entities.filter(_ => _ !== entityId),
    parent,
    entityComponents
  }
}
