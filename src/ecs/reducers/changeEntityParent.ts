import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function changeEntityParent(state: ECS, entityId: EntityId, parentId: EntityId): ECS {
  if (state.entityComponents[parentId] === undefined) {
    return state
  }
  return {
    ...state,
    parent: { ...state.parent, [entityId]: parentId }
  }
}
