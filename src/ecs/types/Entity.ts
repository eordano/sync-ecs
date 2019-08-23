import { Component } from './Component'
import { EntityId } from './EntityId'

export interface EntityView {
  entityId: EntityId
  components: {
    [componentClass: number]: Component
  }
}

export interface FullEntityView {
  parentId: EntityId
  entityId: EntityId
  components: {
    [componentClass: number]: Component
  }
  childs: {
    [entityId: number]: FullEntityView
  }
}
