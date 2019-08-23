import { EntityId } from './EntityId'
import { ComponentId, Component, ComponentClassId, ComponentName } from './Component'
import { NumberRecord } from '../util/NumberRecord'

export interface EntityComponentState {
  seed: number

  componentClassCount: number

  rootEntityId: EntityId

  entities: EntityId[]

  parent: NumberRecord<EntityId, EntityId>

  componentsById: NumberRecord<ComponentId, Component>

  componentParent: NumberRecord<ComponentId, EntityId>

  entityComponents: NumberRecord<EntityId, ComponentId[]>

  componentsByClass: NumberRecord<ComponentClassId, ComponentId[]>

  componentNameToClass: Record<ComponentName, ComponentClassId>

  componentClassToName: NumberRecord<ComponentClassId, ComponentName>
}

export type ECS = EntityComponentState
