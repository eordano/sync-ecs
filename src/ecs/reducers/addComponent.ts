import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { Component, componentIdSymbol, componentClassIdSymbol } from '../Component'
import { canAddComponent } from '../selectors/canAddComponent'

export function addComponent<T extends Component>(state: ECS, entityId: EntityId, component: T): ECS {
  if (!canAddComponent(state, entityId, component)) {
    return state
  }
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
