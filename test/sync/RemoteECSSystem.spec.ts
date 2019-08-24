import { REQUEST_SNAPSHOT, DELTA, SNAPSHOT } from '~/sync/network/messages'
import { buildClientPeer } from './helpers/buildClientPeer'
import { buildAuthorityPeer } from './helpers/buildAuthorityPeer'
import { busLoggingHook } from '../helpers/busLoggingHook'

export const us = 'Us'

test('replica system initial setup', () => {
  const { system, bus } = buildClientPeer(us)
  const { authSystem } = buildAuthorityPeer('auth', bus)
  bus.on(REQUEST_SNAPSHOT, busLoggingHook)
  bus.on(DELTA, busLoggingHook)
  bus.on(SNAPSHOT, busLoggingHook)
  authSystem.activate()
  system.activate()
  expect(system.state).toStrictEqual(authSystem.state)
})
