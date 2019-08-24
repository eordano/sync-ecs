import { NetworkedState } from '~/sync/network/NetworkedState'
import { PeerAuthoritySystem } from '~/sync/network/systems/PeerAuthoritySystem'

import { DecentralandInterface } from '~/dcl/interface/DCL'
import { ISystem } from '~/dcl/interface/ISystem'
import { IEngine } from '~/dcl/interface/IEngine'
import { MessageBus } from '~/dcl/mocks/MessageBus'
import {
  ComponentAdded,
  ComponentRemoved,
  DisposableComponentCreated,
  DisposableComponentRemoved,
  DisposableComponentUpdated,
  ParentChanged
} from '~/dcl/interface/ECSEvents'
import { IEvent } from '~/dcl/interface/IEvent'

export class NetworkedDCLSystem implements ISystem {
  constructor(
    public dcl: DecentralandInterface,
    public bus: MessageBus,
    public networkedState: NetworkedState,
    public authority: PeerAuthoritySystem
  ) {}

  /**
   * Link to the ECS Engine
   */
  engine!: IEngine

  activate(engine: IEngine) {
    this.engine = engine
    this.setupECSListeners()
    this.dcl.onEvent((event: IEvent) => {
      if (event.type === 'uuidEvent') {
        // this.bus.emit('uuidEvent', event.data)
      }
    })
  }

  onAddEntity() {}
  onRemoveEntity() {}
  onComponentAdded(event: IEvent) {}
  onComponentRemoved(event: IEvent) {}
  onDisposableComponentCreated(event: IEvent) {}
  onDisposableComponentRemoved(event: IEvent) {}
  onDisposableComponentUpdated(event: IEvent) {}
  onParentChanged(event: IEvent) {}
  setupECSListeners() {
    this.engine.eventManager.addListener(ComponentAdded, this, this.onComponentAdded)
    this.engine.eventManager.addListener(ComponentRemoved, this, this.onComponentRemoved)
    this.engine.eventManager.addListener(DisposableComponentCreated, this, this.onDisposableComponentCreated)
    this.engine.eventManager.addListener(DisposableComponentRemoved, this, this.onDisposableComponentRemoved)
    this.engine.eventManager.addListener(DisposableComponentUpdated, this, this.onDisposableComponentUpdated)
    this.engine.eventManager.addListener(ParentChanged, this, this.onParentChanged)
  }

  onUpdate(_: number) {
    if (this.authority.areWeAuthoritative()) {
      this.networkPresentEntities()
    } else {
      this.localPresentEntities()
    }
  }

  networkPresentEntities() {}

  localPresentEntities() {}
}
