import { PeerAuthoritySystem } from '~/sync/network/systems/PeerAuthoritySystem'
import { MessageBus } from '~/dcl/mocks/MessageBus'
import { emptyNetworkedState } from '~/sync/network/emptyNetworkedState'
import { AUTHORITY_QUERY, AUTHORITY_ANNOUNCEMENT, FROM, TO, AUTHORITY } from '~/sync/network/messages'
import { IMessageBus } from '~/dcl/interface/IMessageBus'
import { NetworkedState } from '~/sync/network/NetworkedState'
import { AUTHORITY_QUERY_TIMEOUT } from '~/sync/network/systems/AuthorityAwareSystem'
import { AUTHORITY_BEACON_INTERVAL, AuthorityBeaconSystem } from '~/sync/network/systems/AuthorityBeaconSystem'
import { BEACON_INTERVAL } from '~/sync/network/systems/PresenceBeaconSystem'

const us = 'Us'
const somebody = 'Someone'

function beforeAll(): [IMessageBus, NetworkedState, PeerAuthoritySystem] {
  const bus = new MessageBus()
  const state = emptyNetworkedState(us)
  const system = new PeerAuthoritySystem(state, bus)
  return [bus, state, system]
}

test('initial state', () => {
  const [_, __, system] = beforeAll()
  expect(system.weAreAuthoritative()).toBe(false)
})

test('state after activation', () => {
  const [bus, _, system] = beforeAll()
  var calledAuthorityCheck = { called: false, args: null }
  bus.on(AUTHORITY_QUERY, (args: any) => {
    calledAuthorityCheck.called = true
    calledAuthorityCheck.args = args
  })
  system.activate()
  expect(system.time).toBe(0)
  expect(system.weAreAuthoritative()).toBe(false)
  expect(calledAuthorityCheck.called).toBe(true)
})

test('received authority info', () => {
  const [bus, state, system] = beforeAll()
  bus.on(AUTHORITY_QUERY, (_: any) => {
    bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: somebody, [AUTHORITY]: somebody })
  })
  system.activate()
  expect(system.weAreAuthoritative()).toBe(false)
  expect(state.authority).toBe(somebody)
})

test('timeout receiving authority info', () => {
  const [_, state, system] = beforeAll()
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  expect(system.weAreAuthoritative()).toBe(true)
  expect(state.authority).toBe(state.syncId)
})

test('we send an authority beacon on becoming authority', () => {
  const [bus, state, system] = beforeAll()
  const calledAuthorityCheck: any = {}
  bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
    calledAuthorityCheck.args = args
  })
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  expect(calledAuthorityCheck.args).toStrictEqual({ [FROM]: state.syncId, [AUTHORITY]: state.syncId })
})

test('we reply to authority queries', () => {
  const [bus, state, system] = beforeAll()
  const us = state.syncId
  const ourBeacon = { [FROM]: us, [AUTHORITY]: us }
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  bus.on(AUTHORITY_QUERY, (messageType: string, args: any) => {
    bus.emit(AUTHORITY_ANNOUNCEMENT, ourBeacon)
  })
  const peerSystem = new PeerAuthoritySystem(emptyNetworkedState(1), bus)
  peerSystem.activate()
  expect(peerSystem.state.syncId).not.toBe(state.syncId)
  expect(peerSystem.state.authority).toBe(us)
})

test('we send a beacon every now and then', () => {
  const [bus, state, system] = beforeAll()
  const us = state.syncId
  const ourBeacon = { [FROM]: us, [AUTHORITY]: us }
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  const callCount = { counter: 0 }
  bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
    callCount.counter++
    expect(args).toStrictEqual(ourBeacon)
  })
  expect(callCount.counter).toBe(0)
  system.update(AUTHORITY_BEACON_INTERVAL - 1)
  expect(callCount.counter).toBe(0)
  system.update(1)
  expect(callCount.counter).toBe(1)
  system.update(AUTHORITY_BEACON_INTERVAL)
  expect(callCount.counter).toBe(2)
  system.update(AUTHORITY_BEACON_INTERVAL)
  expect(callCount.counter).toBe(3)
})

class BullyAuthoritySystem extends AuthorityBeaconSystem {
  activate() {
    super.activate()
    this.sendAuthorityBeacon()
  }
  weAreAuthoritative() {
    return true
  }
}

test('new authority arrives', () => {
  const [bus, state, system] = beforeAll()
  const us = state.syncId
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  expect(state.authority).toBe(us)
  const peerSystem = new BullyAuthoritySystem(emptyNetworkedState(somebody), bus)
  peerSystem.activate()
  expect(state.authority).toBe(somebody)
})

test('emptyNetworkedState allows strings', () => {
  const newState = emptyNetworkedState(somebody)
  expect(newState).toStrictEqual({ syncId: somebody, registeredPeers: {}, authority: undefined })
})

test('stop sending beacons if another authority is present', () => {
  const [bus, state, system] = beforeAll()
  system.activate()
  system.update(AUTHORITY_QUERY_TIMEOUT + 1)
  const peerSystem = new BullyAuthoritySystem(emptyNetworkedState(somebody), bus)
  peerSystem.activate()
  expect(state.authority).toBe(somebody)
  const callCount = { counter: 0 }
  bus.on(AUTHORITY_ANNOUNCEMENT, (messageType: string, args: any) => {
    expect(args).toStrictEqual({ [FROM]: somebody, [AUTHORITY]: somebody })
    callCount.counter++
  })
  peerSystem.update(BEACON_INTERVAL)
  system.update(BEACON_INTERVAL)
  peerSystem.update(BEACON_INTERVAL)
  system.update(BEACON_INTERVAL)
  expect(callCount.counter).toBe(2)
})
