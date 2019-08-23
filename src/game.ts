import { NetworkedSyncSystem } from './sync/service'

import { SmokeSource, ThrowSmoke } from './smoke/source'
import { SmokeSystem } from './smoke/particles'

declare var dcl: any

// Add a new instance of the system to the engine
engine.addSystem(new NetworkedSyncSystem(dcl))

// add fireplace
let fire = new Entity()
fire.addComponent(new GLTFShape('models/Fireplace.glb'))
fire.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8)
  })
)

// Add a smoke source that creates a smoke puff every 0.2 seconds
fire.addComponent(new SmokeSource(0.2))
engine.addEntity(fire)

// Add the ground
let floor = new Entity()
floor.addComponent(new GLTFShape('models/FloorBaseGrass.glb'))
floor.addComponent(
  new Transform({
    position: new Vector3(8, 0, 8),
    scale: new Vector3(1.6, 0.1, 1.6)
  })
)
engine.addEntity(floor)

// Initiate systems
engine.addSystem(new ThrowSmoke())
engine.addSystem(new SmokeSystem())
