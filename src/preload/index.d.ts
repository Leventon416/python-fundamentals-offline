import { ElectronAPI } from '@electron-toolkit/preload'
import { OfflineApi } from './preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: OfflineApi
  }
}
