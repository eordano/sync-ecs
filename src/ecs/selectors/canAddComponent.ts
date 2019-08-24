import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { Component, componentIdSymbol, componentClassIdSymbol } from '../Component'

export function canAddComponent(state: ECS, entityId: EntityId, component: Component): boolean {
  if (state.componentsById[component[componentIdSymbol]]) {
    return false
  }
  if (state.componentsByClass[component[componentClassIdSymbol]] === undefined) {
    return false
  }
  if (state.entityComponents[entityId] === undefined) {
    return false
  }
  if (typeof component[componentClassIdSymbol] !== 'number') {
    return false
  }
  if (typeof component[componentIdSymbol] !== 'string') {
    return false
  }
  return true
}
