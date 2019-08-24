import { ECS } from '../EntityComponentState';
import { ComponentClassId } from '../Component';
export function getComponentName(state: ECS, clazz: ComponentClassId) {
    return state.componentClassToName[clazz];
}
