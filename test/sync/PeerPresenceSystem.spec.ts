import { MessageBus } from '~/dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { IMessageBus } from '~/dcl/interface/IMessageBus'
import { NetworkedState } from '~/sync/network/NetworkedState'
import { PeerPresenceSystem, PEER_TIMED_OUT } from '~/sync/network/systems/PeerPresenceSystem'
import { PresenceBeaconSystem } from '~/sync/network/systems/PresenceBeaconSystem'
import { QUERY_PRESENCE, FROM, TO, PRESENCE } from '~/sync/network/messages'

const us = 'Wei'
const [peer1, peer2] = ['Satoshi', 'Hal']

function systemBuilder(clazz: any) {
  return function setupSystem(peer: string, bus?: IMessageBus): [NetworkedState, PeerPresenceSystem, IMessageBus] {
    if (bus === undefined) {
      bus = new MessageBus()
    }
    const state = emptyNetworkedState(peer)
    const system = new clazz(state, bus)

    return [state, system, bus]
  }
}
const setupPeerSystem = systemBuilder(PeerPresenceSystem)
const setupBeacon = systemBuilder(PresenceBeaconSystem)

test('initial state', () => {
  const [state, system, bus] = setupPeerSystem(us)
  const [peerState, system1] = setupBeacon(peer1, bus)
  const [peerState2, system2] = setupBeacon(peer2, bus)

  system.activate()
  expect(Object.keys(state.registeredPeers)).toHaveLength(0)
  system1.activate()
  expect(Object.keys(state.registeredPeers)).toHaveLength(1)
  system2.activate()
  expect(Object.keys(state.registeredPeers)).toHaveLength(2)
})

function beforeAll() {
  const [myState, mySystem, bus] = setupPeerSystem(us)
  const [state1, beacon1] = setupBeacon(peer1, bus)
  const [state2, beacon2] = setupBeacon(peer2, bus)
  const system1 = new PeerPresenceSystem(state1, bus)
  const system2 = new PeerPresenceSystem(state2, bus)
  mySystem.activate()
  system1.activate()
  system2.activate()
  beacon1.activate()
  beacon2.activate()
  return { myState, mySystem, bus, state1, system1, state2, system2, beacon1, beacon2 }
}

test('times out peers', () => {
  const { myState, mySystem } = beforeAll()
  expect(Object.keys(myState.registeredPeers)).toHaveLength(2)
  mySystem.update(PEER_TIMED_OUT / 2)
  expect(Object.keys(myState.registeredPeers)).toHaveLength(2)
  mySystem.update(PEER_TIMED_OUT / 2)
  expect(Object.keys(myState.registeredPeers)).toHaveLength(0)
})

test('peer replies to query', () => {
  const { bus } = beforeAll()
  const calls: any = {}
  bus.on(PRESENCE, (_: any, message: any) => {
    calls.data = message
  })
  bus.emit(QUERY_PRESENCE, { [FROM]: peer1, [TO]: us })
  expect(calls.data).toStrictEqual({ [FROM]: us, [TO]: peer1 })
})
