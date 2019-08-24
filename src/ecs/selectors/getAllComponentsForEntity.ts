import { Component } from '../Component'
import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { getComponent } from './getComponent'

export function getAllComponentsForEntity(state: ECS, entityId: EntityId): Component[] {
  return state.entityComponents[entityId].map(_ => getComponent(state, _))
}
