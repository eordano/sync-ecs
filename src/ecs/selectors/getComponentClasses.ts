import { ECS } from '../EntityComponentState'

export function getComponentClasses(state: ECS) {
  // Warning: Check if this cast can be made in some other performant way,
  // with some assurance of numbers instead of strings for object values
  return (Object.keys(state.componentClassToName) as any) as number[]
}
