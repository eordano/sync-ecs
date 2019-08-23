import { generateId } from '../generateId'
import { EntityComponentState } from '../types/EntityComponentState'

export function EmptyState() {
  const seed = generateId(0)
  const rootEntityId = seed
  return {
    seed,
    rootEntityId,
    entities: [rootEntityId],
    parent: { [rootEntityId]: rootEntityId },
    componentsById: {},
    componentParent: {},
    entityComponents: {
      [rootEntityId]: []
    },
    componentsByClass: {},
    componentNameToClass: {},
    componentClassToName: {}
  } as EntityComponentState
}
