import { ECS } from '../EntityComponentState'
import { Component, componentIdSymbol } from '../Component'

export function canUpdateComponent(state: ECS, component: Component): boolean {
  return component[componentIdSymbol] !== undefined && state.componentsById[component[componentIdSymbol]] !== undefined
}
