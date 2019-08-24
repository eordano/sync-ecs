import { EntityId } from '../EntityId'
import { ComponentClassId, Component, ComponentId } from '../Component'

export interface Diff {
  newEntityIds: EntityId[]
  removedEntityIds: EntityId[]
  newParents: { entityId: EntityId; parentId: EntityId }[]
  newComponentClasses: ComponentClassId[]
  removedComponentClasses: ComponentClassId[]
  newComponents: Component[]
  deletedComponents: ComponentId[]
  updatedComponents: Component[]
}
