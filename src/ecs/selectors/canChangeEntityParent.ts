import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { entityExists } from './entityExists'
import { isDescendantOf } from './isDescendantOf'

export function canChangeEntityParent(state: ECS, entityId: EntityId, parentId: EntityId) {
  return entityExists(state, parentId) && !isDescendantOf(state, parentId, entityId)
}
