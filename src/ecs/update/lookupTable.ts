import { addComponent } from '~/ecs/reducers/addComponent'
import { addComponentClass } from '~/ecs/reducers/addComponentClass'
import { addEntity } from '~/ecs/reducers/addEntity'
import { changeEntityParent } from '~/ecs/reducers/changeEntityParent'
import { removeComponent } from '~/ecs/reducers/removeComponent'
import { removeComponentClass } from '~/ecs/reducers/removeComponentClass'
import { removeEntity } from '~/ecs/reducers/removeEntity'
import { updateComponent } from '~/ecs/reducers/updateComponent'

export const lookupTable = {
  addComponent: addComponent,
  addComponentClass: addComponentClass,
  addEntity: addEntity,
  changeEntityParent: changeEntityParent,
  removeComponent: removeComponent,
  removeComponentClass: removeComponentClass,
  removeEntity: removeEntity,
  updateComponent: updateComponent
}
