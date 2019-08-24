import { NetworkedState } from './NetworkedState'
import {
  AUTHORITY_QUERY,
  FROM,
  AUTHORITY_ANNOUNCEMENT,
  AuthorityAnnouncementMessage,
  AuthorityQueryMessage,
  AUTHORITY
} from './messages'
import { IMessageBus } from '~/dcl/interface/IMessageBus'

export const DELAY_AUTHORITY_PRESENCE_CHECKS = 5000 /* 5 second check */

export class EstablishAuthoritySystem {
  public time: number = 0
  public lastAuthorityCheck: number
  public lastAuthorityBeaconSent: number

  constructor(public state: NetworkedState, public bus: IMessageBus) {}

  activate() {
    this.time = 0
    this.setupCheckAuthorityPresence()
    this.sendAuthorityQuery()
  }

  update(dt: number) {
    this.time += dt
    if (this.weAreAuthoritative() && this.authorityBeaconTimeOverdue()) {
      this.notifyWeAreAuthoritative()
    }
    if (this.authorityCheckTimeOverdue()) {
      this.updateAuthority(this.state.syncId)
      this.notifyWeAreAuthoritative()
    }
  }

  weAreAuthoritative() {
    return this.state.authority === this.state.syncId
  }

  protected setupCheckAuthorityPresence() {
    this.setupCheckOtherAuthorityAnnouncements()
    this.setupReplyToAuthorityAnnouncements()
  }

  protected setupCheckOtherAuthorityAnnouncements() {
    this.bus.on(AUTHORITY_ANNOUNCEMENT, (key: string, message: AuthorityAnnouncementMessage) => {
      if (message[AUTHORITY] !== this.state.authority) {
        this.updateAuthority(message[AUTHORITY])
      }
      this.lastAuthorityCheck = this.now()
    })
  }
  protected setupReplyToAuthorityAnnouncements() {
    this.bus.on(AUTHORITY_QUERY, (key: string, message: AuthorityQueryMessage) => {
      if (this.weAreAuthoritative()) {
        this.notifyWeAreAuthoritative()
      }
    })
  }

  protected updateAuthority(authority: string) {
    this.lastAuthorityCheck = this.now()
    this.state.authority = authority
  }

  protected notifyWeAreAuthoritative() {
    this.lastAuthorityCheck = this.now()
    this.lastAuthorityBeaconSent = this.now()
    this.bus.emit(AUTHORITY_ANNOUNCEMENT, { [FROM]: this.state.syncId, [AUTHORITY]: this.state.syncId })
  }

  protected sendAuthorityQuery() {
    this.lastAuthorityCheck = this.now()
    this.bus.emit(AUTHORITY_QUERY, { [FROM]: this.state.syncId })
  }

  protected authorityCheckTimeOverdue() {
    return this.now() - this.lastAuthorityCheck >= DELAY_AUTHORITY_PRESENCE_CHECKS
  }

  protected authorityBeaconTimeOverdue() {
    return this.now() - this.lastAuthorityBeaconSent >= DELAY_AUTHORITY_PRESENCE_CHECKS / 2
  }

  protected now() {
    return this.time
  }
}
