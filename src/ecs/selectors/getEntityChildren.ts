import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function getEntityChildren(state: ECS, entityId: EntityId): EntityId[] {
  return ((Object.keys(state.parent) as any) as number[])
    .map(entity => [entity, state.parent[entity]] as [EntityId, EntityId])
    .filter(_ => _[1] === entityId)
    .map(_ => _[0])
}
