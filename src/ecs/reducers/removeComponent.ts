import { ECS } from '../EntityComponentState'
import { componentClassIdSymbol, ComponentId, Component, componentIdSymbol } from '../Component'
import { getComponent } from '../selectors/getComponent'
import { canRemoveComponent } from '../selectors/canRemoveComponent'

export function removeComponent(state: ECS, componentId: ComponentId | Component): ECS {
  if (!canRemoveComponent(state, componentId)) {
    return state
  }
  const component = getComponent(state, componentId)
  componentId = component[componentIdSymbol]

  const filterOutComponent = _ => _ !== componentId
  const entityId = state.componentParent[componentId]
  const clazz = component[componentClassIdSymbol]
  const componentsById = { ...state.componentsById }
  delete componentsById[componentId]
  const componentParent = { ...state.componentParent }
  delete componentParent[componentId]
  const entityComponentMembers = state.entityComponents[entityId].filter(filterOutComponent)
  const componentsByClass = state.componentsByClass[clazz].filter(filterOutComponent)

  return {
    ...state,
    componentsById,
    componentParent,
    componentsByClass: { ...state.componentsByClass, [clazz]: componentsByClass },
    entityComponents: {
      [entityId]: entityComponentMembers
    }
  }
}
