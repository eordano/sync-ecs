import { EntityId, EntityView } from '../Entity'
import { ECS } from '../EntityComponentState'
import { getAllComponentsForEntity } from './getAllComponentsForEntity'
import { getComponentName } from './getComponentName'
import { componentClassIdSymbol } from '../Component'

export function getEntityViewById(state: ECS, entityId: EntityId): EntityView {
  const allComponents = getAllComponentsForEntity(state, entityId)
  const components = allComponents.reduce((cumm, component) => {
    cumm[getComponentName(state, component[componentClassIdSymbol])] = component
    return cumm
  }, {})
  return {
    entityId,
    components
  }
}
