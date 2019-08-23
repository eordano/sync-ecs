export type ComponentId = number
export type ComponentClassId = number
export type ComponentName = string

export const componentClassIdSymbol = '__classId__symbol_'
export const componentIdSymbol = '__component__id_'

export interface Component {
  // @internal
  [componentIdSymbol]: ComponentId
  // @internal
  [componentClassIdSymbol]: ComponentClassId
}
