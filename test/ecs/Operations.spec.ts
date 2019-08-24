import { emptyState } from '~/ecs/generators/emptyState'
import { addEntity } from '~/ecs/reducers/addEntity'
import { getEntityParent } from '~/ecs/selectors/getEntityParent'
import { addComponent } from '~/ecs/reducers/addComponent'
import { addComponentClass } from '~/ecs/reducers/addComponentClass'
import { generateDiff } from '~/ecs/compare/generateDiff'
import { applyDiff } from '~/ecs/generators/applyDiff'
import { generateStringId } from '~/ecs/util/generateStringId'
import { EntityId } from '~/ecs/Entity'
import { ECS } from '~/ecs/EntityComponentState'

test('Operations', () => {
  const empty = emptyState()

  const myEntity = '1'
  const s1 = addEntity(empty, myEntity)

  expect(getEntityParent(s1, myEntity)).toBe(empty.rootEntityId)

  const TransformId = '1'
  const TransformName = 'Transform'

  const s2 = addComponentClass(s1, TransformId, TransformName)

  const ComponentId = '241'
  const s3 = addComponent(
    s2,
    myEntity,
    TransformId,
    {
      position: { x: 0, y: 0, z: 0 }
    },
    ComponentId
  )

  console.log(s3)
  const diff = generateDiff(empty, s3)
  console.log(diff)
  console.log(applyDiff(empty, diff))

  function addNewTransform(state: ECS, targetEntity: EntityId, x: number, y: number, z: number) {
    const [newId, seed] = generateStringId(state.seed)
    return {
      ...addComponent(state, targetEntity, TransformId, {
        x,
        y,
        z
      }),
      seed
    }
  }

  const s4 = addNewTransform(s2, myEntity, 0, 2, 3)
  console.log(s4)
})
