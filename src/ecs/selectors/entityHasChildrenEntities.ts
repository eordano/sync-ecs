import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function entityHasChildrenEntities(state: ECS, entityId: EntityId): boolean {
  return ((Object.keys(state.parent) as any) as number[]).reduce(
    (result, value) => result && state.parent[value] === entityId,
    true
  )
}
