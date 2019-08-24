import { EntityId, EntityView, FullEntityView } from '../Entity'
import { EntityComponentState, ECS } from '../EntityComponentState'

export function isChildOf(state: EntityComponentState, entityId: EntityId, parentId: EntityId) {
  return (
    state.parent[parentId] !== undefined && state.parent[entityId] !== undefined && state.parent[entityId] === parentId
  )
}

export function isChildOfRoot(state: ECS, entityId: EntityId) {
  return isChildOf(state, entityId, state.rootEntityId)
}
