import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom offline API exposed safely to renderer
export const offlineApi = {
  ping: (): void => {
    ipcRenderer.send('ping')
  },
  onPong: (callback: (response: string) => void): (() => void) => {
    const handler = (_: Electron.IpcRendererEvent, response: string): void => callback(response)
    ipcRenderer.on('pong', handler)
    return () => {
      ipcRenderer.removeListener('pong', handler)
    }
  }
}

// Strict context isolation exposure
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', offlineApi)
  } catch (error) {
    console.error('Failed to expose APIs via contextBridge:', error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = offlineApi
}

export type OfflineApi = typeof offlineApi
