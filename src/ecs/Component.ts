export type ComponentId = string
export type ComponentClassId = string
export type ComponentName = string

export const componentClassIdSymbol = '$'
export const componentIdSymbol = '#'

export interface Component {
  // @internal
  [componentIdSymbol]: ComponentId
  // @internal
  [componentClassIdSymbol]: ComponentClassId
}
