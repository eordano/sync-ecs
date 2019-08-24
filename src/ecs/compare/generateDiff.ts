import { ECS } from '../EntityComponentState'
import { Diff } from './Diff'
import { EntityId } from '../Entity'
import { Component, ComponentClassId, componentIdSymbol, ComponentName, ComponentId } from '../Component'

import { NumberRecord } from '../util/NumberRecord'
import { not } from '../util/not'

import { entityExists } from '../selectors/entityExists'
import { getEntityIds } from '../selectors/getEntityIds'
import { parentChanged } from './parentChanged'
import { getEntityParent } from '../selectors/getEntityParent'
import { getComponentName } from '../selectors/getComponentName'
import { getComponentClasses } from '../selectors/getComponentClasses'
import { hasComponentClass } from '../selectors/hasComponentClass'

function buildParentMapping(state: ECS) {
  return function(map: NumberRecord<number, number>, entityId: EntityId): NumberRecord<number, number> {
    map[entityId] = getEntityParent(state, entityId)
    return map
  }
}

function buildComponentNameMapping(state: ECS) {
  return function(map: NumberRecord<number, string>, clazz: ComponentClassId): NumberRecord<number, string> {
    map[clazz] = getComponentName(state, clazz)
    return map
  }
}

export function getComponents(state: ECS): Component[] {
    return Object.keys(state.componentsById).map(_ => state.componentsById[_])
}

export function componentExists(state: ECS, componentId: ComponentId | Component) {
    if (typeof componentId === 'number') {
      return state.componentsById[componentId] !== undefined
    } else {
        return state.componentsById[componentId[componentIdSymbol]] !== undefined
    }
}

export function getComponent(state: ECS, componentId: ComponentId): Component {
    return state.componentsById[componentId]
}

export function deepCompare(a: any, b: any) {
    if (typeof a !== typeof b) {
        return false
    }
    if (typeof a === 'string') {
        return a !== b
    }
    if (typeof b === 'number') {
        return (isNaN(a) && isNaN(b)) || (a === b)
    }
    if (a === undefined) return b === undefined
    if (a === null) return b === null
    if (Array.isArray(a)) {
        if (!Array.isArray(b)) {
            return false
        }
        if (a.length !== b.length) {
            return false
        }
        return a.reduce((result, _, index) => result && deepCompare(a[index], b[index]), true)
    }
    if (typeof a === 'object') {
        const aKeys = Object.keys(a).sort()
        const bKeys = Object.keys(b).sort()
        if (aKeys.length !== bKeys.length) {
            return false
        }
        return aKeys.reduce((result, key, index) => result && bKeys[index] === key && deepCompare(a[key], b[key]), true)
    }
}

export function differentComponent(a: Component, b: Component) {
    // Pick strategy
    return deepCompare(a, b)
}

export function generateDiff(from: ECS, to: ECS): Diff {
  const newEntityIds = getEntityIds(to).filter(_ => entityExists(from, _))
  const removedEntityIds = getEntityIds(from).filter(_ => entityExists(to, _))
  const newParents = getEntityIds(to)
    .filter(_ => parentChanged(from, to, _))
    .reduce(buildParentMapping(to), {})
  const newComponentClasses: { [componentId: number]: ComponentName } = getComponentClasses(to)
    .filter(_ => not(hasComponentClass(from, _)))
    .reduce(buildComponentNameMapping(to), {})
  const removedComponentClasses = getComponentClasses(from).filter(_ => not(hasComponentClass(to, _)))
  const newComponents = getComponents(to).filter(_ => not(componentExists(from, _)))
  const deletedComponents = getComponents(from).filter(_ => not(componentExists(to, _)))
  const updatedComponents = getComponents(to).filter(_ => differentComponent(getComponent(from, _), getComponent(to, _))
  return {
    newEntityIds,
    removedEntityIds,
    newParents,
    newComponentClasses,
    removedComponentClasses,
    newComponents,
    deletedComponents,
    updatedComponents
  }
}
