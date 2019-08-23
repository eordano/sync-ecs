import { ECS } from '../types/EntityComponentState'
import { EntityId } from '../types/Entity'
import { Component, componentIdSymbol, componentClassIdSymbol } from '../types/Component'

export function addComponent(state: ECS, entityId: EntityId, component: Component): ECS {
  const componentId = component[componentIdSymbol]
  const clazz = component[componentClassIdSymbol]
  return {
    ...state,
    componentsById: { ...state.componentsById, [componentId]: component },
    componentParent: { ...state.componentParent, [componentId]: entityId },
    componentsByClass: {
      ...state.componentsByClass,
      [clazz]: [...state.componentsByClass[clazz], componentId]
    },
    entityComponents: {
      ...state.entityComponents,
      [entityId]: [...state.entityComponents[entityId], componentId]
    }
  }
}
