import { NetworkedState } from './NetworkedState'
import {
  AUTHORITY_QUERY,
  FROM,
  AUTHORITY_ANNOUNCEMENT,
  AuthorityAnnouncementMessage,
  AuthorityQueryMessage,
  AUTHORITY
} from './messages'

export const DELAY_AUTHORITY_PRESENCE_CHECKS = 5000 /* 5 second check */

export class EstablishAuthoritySystem implements ISystem {
  private time: number = 0
  private lastAuthorityCheck: number
  private lastAuthorityBeaconSent: number

  constructor(private state: NetworkedState, private bus: MessageBus) {}

  activate(_: Engine) {
    this.setupCheckAuthorityPresence()
    this.sendAuthorityQuery()
  }

  update(dt: number) {
    this.time += dt
    if (this.authorityCheckTimeOverdue()) {
      this.updateAuthority(this.state.syncId)
      this.notifyWeAreAuthoritative()
    }
    if (this.weAreAuthoritative() && this.authorityBeaconTimeOverdue()) {
      this.notifyWeAreAuthoritative()
    }
  }

  weAreAuthoritative() {
    return this.state.authority === this.state.syncId
  }

  private setupCheckAuthorityPresence() {
    this.bus.on(AUTHORITY_ANNOUNCEMENT, (message: AuthorityAnnouncementMessage, __: string) => {
      if (message[AUTHORITY] !== this.state.authority) {
        this.updateAuthority(message[AUTHORITY])
      }
    })
    this.bus.on(AUTHORITY_QUERY, (_: AuthorityQueryMessage, __: string) => {
      if (this.weAreAuthoritative()) {
        this.notifyWeAreAuthoritative()
      }
    })
  }

  private updateAuthority(authority: string) {
    this.lastAuthorityCheck = this.now()
    this.state.authority = authority
  }

  private notifyWeAreAuthoritative() {
    this.lastAuthorityCheck = this.now()
    this.lastAuthorityBeaconSent = this.now()
    this.bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: this.state.syncId, [AUTHORITY]: this.state.syncId })
  }

  private sendAuthorityQuery() {
    this.lastAuthorityCheck = this.now()
    this.bus.emit(AUTHORITY_QUERY, { [FROM]: this.state.syncId })
  }

  private authorityCheckTimeOverdue() {
    return this.now() - this.lastAuthorityCheck > DELAY_AUTHORITY_PRESENCE_CHECKS
  }

  private authorityBeaconTimeOverdue() {
    return this.now() - this.lastAuthorityBeaconSent > DELAY_AUTHORITY_PRESENCE_CHECKS
  }

  private now() {
    return this.time
  }
}
