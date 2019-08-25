import { MessageBus } from '~/dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { emptyState } from '~/ecs/generators/emptyState'
import { IMessageBus } from '~/dcl/interface/IMessageBus'
import { PrimaryECS } from '~/sync/network/systems/PrimaryECS'
export function buildAuthorityPeer(name: string, bus: IMessageBus) {
  if (!bus) {
    bus = new MessageBus()
  }
  const authNet = emptyNetworkedState(name)
  const initialEcsState = emptyState()
  const authSystem = new PrimaryECS(initialEcsState, authNet, bus)
  return { bus, authNet, authSystem, initialEcsState }
}
