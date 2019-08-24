import { ECS } from '../EntityComponentState'
import { EntityId } from '../Entity'
import { ComponentId, Component, componentIdSymbol } from '../Component'

export function getComponentParentEntity(state: ECS, component: ComponentId | Component): EntityId {
  if (typeof component === 'number') {
    return state.componentParent[component]
  } else {
    return state.componentParent[component[componentIdSymbol]]
  }
}
