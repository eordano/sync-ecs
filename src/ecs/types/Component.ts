import { EntityId } from './EntityId'

export type ComponentId = number
export type ComponentClassId = number
export type ComponentName = string

export const componentClassIdSymbol = '__classId__symbol_'
export const componentIdSymbol = '__component__id_'
export const entityIdSymbol = '__entity__id_'

export interface Component {
  // @internal
  [componentIdSymbol]: ComponentId
  // @internal
  [componentClassIdSymbol]: ComponentClassId
}

export interface ComponentWithEntityRef extends Component {
  // @internal
  [entityIdSymbol]: EntityId
}
