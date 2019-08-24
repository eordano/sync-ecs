import { ECS } from '../EntityComponentState'
import { Component, componentIdSymbol } from '../Component'

export function updateComponent(state: ECS, component: Component): ECS {
  const componentId = component[componentIdSymbol]
  return {
    ...state,
    componentsById: { ...state.componentsById, [componentId]: component }
  }
}
