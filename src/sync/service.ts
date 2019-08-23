export const buildPresence = (syncId: string) => ({ a: syncId })
export const buildPresenceAck = (mySyncId: string, otherSyncId: string) => ({ a: mySyncId, b: otherSyncId })

export const requestSnapshotMessage = (mySyncId: string) => ({ a: mySyncId })
export const buildSnapshotMessage = (mySyncId: string, otherSyncId: string, data: any) => ({ a: mySyncId, s: data })

export const requestDeltaMessage = (mySyncId: string, lookupId: string, from: number) => ({ a: mySyncId })
export const buildTrySnapshot = (mySyncId: string, otherSyncId: string, lookupId: string) => ({ a: mySyncId })

export const buildDeltaMessage = (
  mySyncId: string,
  otherSyncId: string,
  lookupId: string,
  from: number,
  to: number,
  data: any
) => ({ a: mySyncId, s: data })

export const _ComponentAdded = 'g'
export const _ComponentRemoved = 'f'
export const _DisposableComponentAdded = 'h'
export const _DisposableComponentRemoved = 'i'
export const _DisposableComponentUpdated = 'j'
export const _ParentChanged = 'k'
