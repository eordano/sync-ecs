import { CommsMessage, KEY } from '../network/messages'
import { NetworkedState } from '../network/NetworkedState'
import { EstablishAuthoritySystem } from '../network/establishAuthoritySystem'

export class NetworkedDCLSystem implements ISystem {
  constructor(public dcl: DecentralandInterface) {}

  /**
   * Link to the ECS Engine
   */
  engine!: Engine

  /**
   * Reference to DCL Sync System
   */
  syncSystem: ISystem

  /**
   * Communications broker
   */
  bus = new MessageBus()

  /**
   * Networked status
   */
  networkedStatus: NetworkedState

  /**
   * Subsystem to establish authority
   */
  authority = new EstablishAuthoritySystem(this.networkedStatus, this.bus)

  activate(engine: Engine) {
    this.engine = engine
    this.overrideSyncSystem()
    engine.addSystem(this.authority)
  }

  overrideSyncSystem() {
    // this.disableSyncSystem()
    // this.dcl.onUpdate(this.networkedSyncOnUpdate.bind(this))
    this.setupECSListeners()
    this.dcl.onEvent(event => {
      if (event.type === 'uuidEvent') {
        // this.bus.emit('uuidEvent', event.data)
      }
    })
  }

  onAddEntity() {}
  onRemoveEntity() {}
  setupECSListeners() {
    this.engine.eventManager.addListener(ComponentAdded, this, this.componentAdded)
    this.engine.eventManager.addListener(ComponentRemoved, this, this.componentRemoved)
    this.engine.eventManager.addListener(DisposableComponentCreated, this, this.disposableComponentCreated)
    this.engine.eventManager.addListener(DisposableComponentRemoved, this, this.disposableComponentRemoved)
    this.engine.eventManager.addListener(DisposableComponentUpdated, this, this.disposableComponentUpdated)
    this.engine.eventManager.addListener(ParentChanged, this, this.parentChanged)
  }

  disableSyncSystem() {
    this.syncSystem = this.detectSyncSystem()
    this.engine.removeSystem(this.syncSystem)
  }

  detectSyncSystem() {
    return (engine as any).addedSystems.filter((e: any) => e.cachedComponents)[0] as ISystem
  }

  onUpdate(_: number) {
    if (this.authority.weAreAuthoritative()) {
      this.networkPresentEntities()
    } else {
      this.localPresentEntities()
    }
  }

  networkPresentEntities() {}

  localPresentEntities() {}

  sendIt<T extends CommsMessage>(message: T) {
    const type = message[KEY]
    delete message[KEY]
    this.bus.emit(type, message)
  }
}
