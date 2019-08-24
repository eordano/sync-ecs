import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { Component, componentIdSymbol, componentClassIdSymbol } from '../Component'

export function canAddComponent(state: ECS, entityId: EntityId, component: Component): boolean {
  if (state.componentsById[component[componentIdSymbol]]) {
    console.log('no componentby id', component[componentIdSymbol])
    return false
  }
  if (state.componentsByClass[component[componentClassIdSymbol]] === undefined) {
    console.log('no component by clazz', component[componentClassIdSymbol])
    return false
  }
  if (state.entityComponents[entityId] === undefined) {
    console.log('no entityComponents', entityId)
    return false
  }
  if (typeof component[componentClassIdSymbol] !== 'string') {
    console.log('no stringy ', component[componentClassIdSymbol])
    return false
  }
  if (typeof component[componentIdSymbol] !== 'string') {
    console.log('no stringy ', component[componentIdSymbol])
    return false
  }
  return true
}
