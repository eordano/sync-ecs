import { ECS } from '../EntityComponentState'

import { addComponent } from '~/ecs/reducers/addComponent'
import { addComponentClass } from '~/ecs/reducers/addComponentClass'
import { addEntity } from '~/ecs/reducers/addEntity'
import { changeEntityParent } from '~/ecs/reducers/changeEntityParent'
import { removeComponent } from '~/ecs/reducers/removeComponent'
import { removeComponentClass } from '~/ecs/reducers/removeComponentClass'
import { removeEntity } from '~/ecs/reducers/removeEntity'
import { updateComponent } from '~/ecs/reducers/updateComponent'

export interface Update {
  type: string
  payload: any[]
}
export const functions = [
  addComponent,
  addComponentClass,
  addEntity,
  changeEntityParent,
  removeComponent,
  removeComponentClass,
  removeEntity,
  updateComponent
]
export const lookupTable: any = {}
for (let fun of functions) {
  lookupTable[fun.name] = fun
}
export function applyUpdate(state: ECS, update: Update) {
  return lookupTable[update.type](state, ...update.payload)
}
