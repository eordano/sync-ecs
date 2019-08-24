import { MessageBus } from '~/dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { emptyState } from '~/ecs/generators/emptyState'
import { ReplicaECS } from '~/sync/network/systems/ReplicaECS'
import { IMessageBus } from '~/dcl/interface/IMessageBus'
import { us } from '../RemoteECSSystem.spec'
export function buildClientPeer(name: string, bus?: IMessageBus) {
  if (!bus) {
    bus = new MessageBus()
  }
  const netState = emptyNetworkedState(us)
  const ecsState = emptyState()
  const system = new ReplicaECS(ecsState, netState, bus)
  return { bus, netState, system }
}
