import { EstablishAuthoritySystem } from '../network/systems/EstablishAuthoritySystem'
import { DecentralandInterface } from '../../dcl/interface/DCL'
import { MessageBus } from '../../dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { NetworkedDCLSystem } from './NetworkedECS'

export function newNetworkedDCLSystem(dcl: DecentralandInterface) {
  const bus = new MessageBus()
  const state = emptyNetworkedState()
  const authority = new EstablishAuthoritySystem(state, bus)
  return new NetworkedDCLSystem(dcl, bus, state, authority)
}
