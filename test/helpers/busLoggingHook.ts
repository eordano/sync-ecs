import { decodeType } from '~/sync/network/decodeType'
import { decodeMessage } from '~/sync/network/decodeMessage'

export function busLoggingHook(_: string, data: any) {
  console.log(decodeType(_), decodeMessage(data))
}
