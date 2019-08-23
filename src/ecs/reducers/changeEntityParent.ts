import { ECS } from '../types/EntityComponentState'
import { EntityId } from '../types/Entity'

export function changeEntityParent(state: ECS, entityId: EntityId, parentId: EntityId): ECS {
  return {
    ...state,
    parent: { ...state.parent, [entityId]: parentId }
  }
}
