import { ECS } from '../types/EntityComponentState'
import { Component, componentIdSymbol } from '../types/Component'

export function updateComponent(state: ECS, component: Component): ECS {
  const componentId = component[componentIdSymbol]
  return {
    ...state,
    componentsById: { ...state.componentsById, [componentId]: component }
  }
}
