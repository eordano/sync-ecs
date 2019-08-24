import { ECS } from '../EntityComponentState'
import { Component, componentIdSymbol } from '../Component'
import { canUpdateComponent } from '../selectors/canUpdateComponent'

export function updateComponent(state: ECS, component: Component): ECS {
  if (!canUpdateComponent(state, component)) {
    return state
  }
  const componentId = component[componentIdSymbol]
  return {
    ...state,
    componentsById: { ...state.componentsById, [componentId]: component }
  }
}
