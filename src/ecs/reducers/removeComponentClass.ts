import { ECS } from '../types/EntityComponentState'
import { ComponentClassId, ComponentName } from '../types/Component'

export function removeComponentClass(state: ECS, classId: ComponentClassId, className: ComponentName): ECS {
  const { componentsByClass, componentClassToName, componentNameToClass } = state
  delete componentsByClass[classId]
  delete componentClassToName[classId]
  delete componentNameToClass[state.componentClassToName[classId]]
  return {
    ...state,
    componentsByClass,
    componentClassToName,
    componentNameToClass
  }
}
