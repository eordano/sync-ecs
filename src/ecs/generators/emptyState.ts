import { generateId } from '../util/generateId'
import { EntityComponentState } from '../EntityComponentState'

export function emptyState() {
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
