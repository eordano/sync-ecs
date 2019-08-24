import { generateId } from '~/ecs/util/generateId'

export function emptyNetworkedState() {
  return {
    syncId: generateId().toString(),
    authority: undefined,
    registeredPeers: {}
  }
}
