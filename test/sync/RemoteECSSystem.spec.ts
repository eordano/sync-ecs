import { MessageBus } from '~/dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { emptyState } from '~/ecs/generators/emptyState'
import { ReplicaECS } from '~/sync/network/systems/ReplicaECS'
import { REQUEST_SNAPSHOT, DELTA } from '~/sync/network/messages'
import { decodeType } from '~/sync/network/decodeType'
import { decodeMessage } from '~/sync/network/decodeMessage'

const us = 'Us'

test('receives snapshot', () => {
  /**
   * const [authority, authorityEcs] = buildAuthorityPeer(state, bus)
   * const [peer, peerEcs] = buildClientPeer(state, bus)
   * authorityEcs.createEntity('An EntityId')
   * authorityEcs.update(1)
   * peer.requestSnapshot()
   * expect(peerEcs).toStrictlyEqual(authorityEcs)
   */
})

function beforeAll() {
  const bus = new MessageBus()
  const netState = emptyNetworkedState(us)
  const ecsState = emptyState()
  const system = new ReplicaECS(ecsState, netState, bus)
  return { ecsState, bus, netState, system }
}

test('replica system initial setup', () => {
  const { ecsState, netState, system, bus } = beforeAll()
  bus.on(REQUEST_SNAPSHOT, (_: string, data: any) => {
    console.log(decodeType(_), decodeMessage(data))
  })
  bus.on(DELTA, (_: string, data: any) => {
    console.log(decodeType(_), decodeMessage(data))
  })
  system.activate()
})
