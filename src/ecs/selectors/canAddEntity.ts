import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
export function canAddEntity(state: ECS, parentId: EntityId, entityId: EntityId): boolean {
  if (state.entityComponents[entityId] !== undefined) {
    return false
  }
  if (state.entityComponents[parentId] === undefined) {
    return false
  }
  return true
}
