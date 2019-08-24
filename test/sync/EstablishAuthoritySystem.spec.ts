import { EstablishAuthoritySystem } from '~/sync/network/EstablishAuthoritySystem'
import { MessageBus } from '~/dcl/mocks/MessageBus'

test('Establish Authority System', () => {
  const bus = new MessageBus()
  const state = emptyNetworkedState()
  const system = new EstablishAuthoritySystem()
})
