import { EntityId } from '../EntityId'
import { ComponentClassId, Component, ComponentId, ComponentName } from '../Component'

export interface Diff {
  newEntityIds: EntityId[]
  removedEntityIds: EntityId[]
  newParents: { [entityId: number]: EntityId }
  newComponentClasses: { [componentClassId: number]: ComponentName
  removedComponentClasses: ComponentClassId[]
  newComponents: Component[]
  deletedComponents: ComponentId[]
  updatedComponents: Component[]
}
