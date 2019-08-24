import { Bus } from './Bus'

export class MessageBus implements Bus {
  listeners: { [key: string]: Function[] }
  emit(messageType: string, payload: { [key: string]: any }) {
    const listenng = this.listeners[messageType]
    if (!listenng) return
    for (let i of listenng) {
      try {
        i(messageType, payload)
      } catch (e) {
        console.log(`listener ${i.toString()} error`, e.stack)
      }
    }
  }
  on(messageType: string, handler: any) {
    this.listeners[messageType] = [...(this.listeners.messageType || []), handler]
  }
}
