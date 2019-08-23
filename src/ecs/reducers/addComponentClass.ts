import { ECS } from '../types/EntityComponentState'
import { ComponentClassId, ComponentName } from '../types/Component'

export function addComponentClass(state: ECS, classId: ComponentClassId, className: ComponentName): ECS {
  return {
    ...state,
    componentsByClass: { ...state.componentsByClass, [classId]: [] },
    componentClassToName: { ...state.componentClassToName, [classId]: className },
    componentNameToClass: { ...state.componentNameToClass, [className]: classId }
  }
}
