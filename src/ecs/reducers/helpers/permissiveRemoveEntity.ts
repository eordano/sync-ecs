import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { removeComponent } from './removeComponent'

export function removeEntity(state: ECS, entityId: EntityId): ECS {
  if (state.parent[entityId] === undefined) {
    return state
  }
  const components = state.entityComponents[entityId]
  for (let component of components) {
    state = removeComponent(state, component)
  }
  const parent = { ...state.parent }
  delete parent[entityId]
  const entityComponents = { ...state.entityComponents }
  delete entityComponents[entityId]
  return {
    ...state,
    entities: state.entities.filter(_ => _ !== entityId),
    parent,
    entityComponents
  }
}
