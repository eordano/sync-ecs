import { ECS } from '../EntityComponentState'
import { Component, ComponentId, componentIdSymbol } from '../Component'

export function componentExists(state: ECS, componentId: ComponentId | Component) {
  if (typeof componentId === 'string') {
    return state.componentsById[componentId] !== undefined
  } else {
    return (
      componentId[componentIdSymbol] !== undefined && state.componentsById[componentId[componentIdSymbol]] !== undefined
    )
  }
}
