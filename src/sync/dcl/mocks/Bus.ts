export interface Bus {
  emit(
    messageType: string,
    payload: {
      [key: string]: any
    }
  )
  on(messageType: string, handler: any) /* (messageType: T, payload: { [key: string]: any }) => void) */
}
