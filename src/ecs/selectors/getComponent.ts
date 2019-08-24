import { ECS } from '../EntityComponentState'
import { Component, componentIdSymbol, ComponentId } from '../Component'

export function getComponent(state: ECS, componentId: ComponentId | Component): Component {
  if (typeof componentId === 'number') {
    return state.componentsById[componentId]
  } else {
    return state.componentsById[componentId[componentIdSymbol]]
  }
}
