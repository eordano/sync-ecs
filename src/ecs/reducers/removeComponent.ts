import { ECS } from '../types/EntityComponentState'
import { componentClassIdSymbol, ComponentId } from '../types/Component'

export function removeComponent(state: ECS, componentId: ComponentId): ECS {
  const component = state.componentsById[componentId]
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
