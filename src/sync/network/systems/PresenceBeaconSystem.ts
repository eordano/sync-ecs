import { NetworkedState } from '../NetworkedState'
import { PRESENCE, FROM } from '../messages'
import { IMessageBus } from '~/dcl/interface/IMessageBus'

export const BEACON_INTERVAL = 1000

export class PresenceBeaconSystem {
  public time: number = 0
  public lastBeacon: number = 0

  constructor(public state: NetworkedState, public bus: IMessageBus) {}

  activate() {
    this.time = 0
    this.sendBeacon()
  }

  update(dt: number) {
    this.time += dt
    this.checkAndSendBeacon()
  }

  checkAndSendBeacon() {
    if (this.shouldSendBeacon()) {
      this.sendBeacon()
    }
  }

  shouldSendBeacon() {
    return this.now() - this.lastBeacon > BEACON_INTERVAL
  }

  sendBeacon() {
    this.bus.emit(PRESENCE, { [FROM]: this.state.syncId })
    this.lastBeacon = this.now()
  }

  protected now() {
    return this.time
  }
}
