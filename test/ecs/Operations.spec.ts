import { emptyState } from '~/ecs/generators/emptyState'
import { addEntity } from '~/ecs/reducers/addEntity'
import { getEntityParent } from '~/ecs/selectors/getEntityParent'
import { addComponent } from '~/ecs/reducers/addComponent'
import { addComponentClass } from '~/ecs/reducers/addComponentClass'
import { generateDiff } from '~/ecs/compare/generateDiff'
import { applyDiff } from '~/ecs/generators/applyDiff'
import { componentClassIdSymbol, componentIdSymbol } from '~/ecs/Component'

test('Operations', () => {
  const state = emptyState()

  const myEntity = '1'
  const s1 = addEntity(state, myEntity)

  expect(getEntityParent(s1, myEntity)).toBe(state.rootEntityId)

  const Transform = '1'
  const TransformName = 'Transform'

  const s2 = addComponentClass(s1, Transform, TransformName)

  const ComponentId = '241'
  const s3 = addComponent(s2, myEntity, {
    [componentClassIdSymbol]: Transform,
    [componentIdSymbol]: ComponentId,
    position: { x: 0, y: 0, z: 0 }
  })

  console.log(s3)
  const diff = generateDiff(state, s3)
  console.log(diff)
  console.log(applyDiff(state, diff))
})
