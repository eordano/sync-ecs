import { NetworkedState } from './NetworkedState'
import { PRESENCE, QUERY_PRESENCE, QueryPresenceMessage, FROM, TO } from './messages'
import { IMessageBus } from '~/dcl/interface/IMessageBus'

export const PEER_TIMED_OUT = 5000

export class PeerPresenceSystem {
  public time: number = 0

  constructor(public state: NetworkedState, public bus: IMessageBus) {}

  activate() {
    this.time = 0
    this.setupAcknowledgePresence()
    this.setupListenToPresence()
  }

  update(dt: number) {
    this.time += dt
    this.clearOldPeers()
  }

  setupAcknowledgePresence() {
    this.bus.on(QUERY_PRESENCE, (key: string, message: QueryPresenceMessage) => {
      if (message[TO] === this.state.syncId) {
        this.bus.emit(PRESENCE, { [FROM]: this.state.syncId, [TO]: message[FROM] })
      }
    })
  }

  setupListenToPresence() {
    this.bus.on(PRESENCE, (key: string, message: QueryPresenceMessage) => {
      this.state.registeredPeers[message[FROM]] = {
        syncId: message[FROM],
        lastPing: this.now()
      }
    })
  }

  clearOldPeers() {
    const peers = Object.keys(this.state.registeredPeers)
    for (let peer of peers) {
      if (this.hasPeerTimedOut(peer)) {
        this.clearPresence(peer)
      }
    }
  }

  hasPeerTimedOut(peer: string) {
    return this.now() - this.state.registeredPeers[peer].lastPing >= PEER_TIMED_OUT
  }

  clearPresence(peer: string) {
    delete this.state.registeredPeers[peer]
  }

  protected now() {
    return this.time
  }
}
