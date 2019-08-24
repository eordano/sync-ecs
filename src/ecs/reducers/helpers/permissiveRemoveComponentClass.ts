import { ComponentClassId } from '../../Component'
import { ECS } from '../../EntityComponentState'
import { removeComponent } from '../removeComponent'

export function permissiveRemoveComponentClass(state: ECS, classId: ComponentClassId): ECS {
  if (state.componentsByClass[classId] === undefined) {
    return state
  }
  const { componentsByClass } = state
  for (let component of componentsByClass[classId]) {
    state = removeComponent(state, component)
  }
  const { componentsById, componentClassToName, componentNameToClass } = state
  delete componentsByClass[classId]
  delete componentClassToName[classId]
  delete componentNameToClass[state.componentClassToName[classId]]
  return {
    ...state,
    componentsById,
    componentsByClass,
    componentClassToName,
    componentNameToClass
  }
}
