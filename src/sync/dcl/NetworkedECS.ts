import { NetworkedState } from '../network/NetworkedState'
import { EstablishAuthoritySystem } from '../network/EstablishAuthoritySystem'

import { ISystem, Engine, DecentralandInterface } from './mocks/types'
import { generateId } from '~/ecs/util/generateId'
import { MessageBus } from './mocks/MessageBus'

export const newNetworkedDCLSystem = (dcl: DecentralandInterface) => {
  const bus = new MessageBus()
  const networkedState = {
    syncId: generateId().toString(),
    authority: undefined,
    registeredPeers: {}
  }
  const authority = new EstablishAuthoritySystem(networkedState, bus)
  return new NetworkedDCLSystem(dcl, bus, networkedState, authority)
}

export class NetworkedDCLSystem implements ISystem {
  constructor(
    public dcl: DecentralandInterface,
    public bus: MessageBus,
    public networkedState: NetworkedState,
    public authority: EstablishAuthoritySystem
  ) {}

  /**
   * Link to the ECS Engine
   */
  engine!: Engine

  activate(engine: Engine) {
    this.engine = engine
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

  onUpdate(_: number) {
    if (this.authority.weAreAuthoritative()) {
      this.networkPresentEntities()
    } else {
      this.localPresentEntities()
    }
  }

  networkPresentEntities() {}

  localPresentEntities() {}
}
