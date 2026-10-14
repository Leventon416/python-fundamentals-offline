import { app, BrowserWindow, ipcMain, protocol, net, session } from 'electron'
import { join } from 'path'
import { existsSync } from 'fs'
import { pathToFileURL } from 'url'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// Register privileged custom scheme 'app' for 100% offline asset loading with WebAssembly & Web Worker support
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true
    }
  }
])

export function createWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    title: 'Python Fundamentals - Offline',
    width: 1360,
    height: 850,
    minWidth: 1024,
    minHeight: 680,
    backgroundColor: '#0f172a',
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.setTitle('Python Fundamentals - Offline')
    mainWindow.show()
  })

  // Deny opening new browser windows to enforce strict offline local operation
  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: 'deny' }
  })

  // Prevent navigation to any external site
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const isDevUrl =
      is.dev &&
      process.env['ELECTRON_RENDERER_URL'] &&
      navigationUrl.startsWith(process.env['ELECTRON_RENDERER_URL'])
    const isFileUrl = navigationUrl.startsWith('file:')
    const isAppUrl = navigationUrl.startsWith('app:')
    if (!isDevUrl && !isFileUrl && !isAppUrl) {
      event.preventDefault()
    }
  })

  // Load the remote URL for development or the local app scheme for production
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL('app://app/index.html')
  }

  return mainWindow
}

// Initialize Electron application lifecycle
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.pythonjourney.offline')

  // Register custom protocol handler for offline assets, web workers, and Pyodide runtime files
  protocol.handle('app', (request) => {
    const url = new URL(request.url)
    let relativePath = decodeURIComponent(url.pathname)
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1)
    }
    if (!relativePath) {
      relativePath = 'index.html'
    }

    // 1. Pyodide runtime assets (check resources/pyodide from extraResources first, then renderer/pyodide)
    if (relativePath.startsWith('pyodide/')) {
      const packagedPyodidePath = join(process.resourcesPath, relativePath)
      if (existsSync(packagedPyodidePath)) {
        return net.fetch(pathToFileURL(packagedPyodidePath).toString())
      }
      const localPyodidePath = join(__dirname, '../renderer', relativePath)
      if (existsSync(localPyodidePath)) {
        return net.fetch(pathToFileURL(localPyodidePath).toString())
      }
    }

    // 2. All renderer assets (index.html, JS chunks, Monaco workers, CSS, fonts)
    const targetPath = join(__dirname, '../renderer', relativePath)
    if (existsSync(targetPath)) {
      return net.fetch(pathToFileURL(targetPath).toString())
    }

    // 3. Fallback: check process.resourcesPath for extra resources
    const resourceFallback = join(process.resourcesPath, relativePath)
    if (existsSync(resourceFallback)) {
      return net.fetch(pathToFileURL(resourceFallback).toString())
    }

    return net.fetch(pathToFileURL(join(__dirname, '../renderer/index.html')).toString())
  })

  // Fallback interception for file:// protocol requests referencing /pyodide/
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['file://*pyodide*'] },
    (details, callback) => {
      const url = details.url
      if (url.includes('/pyodide/')) {
        const subPath = url.substring(url.indexOf('/pyodide/') + 1)
        const packagedPath = join(process.resourcesPath, subPath)
        if (existsSync(packagedPath)) {
          return callback({ redirectURL: pathToFileURL(packagedPath).toString() })
        }
        const rendererPath = join(__dirname, '../renderer', subPath)
        if (existsSync(rendererPath)) {
          return callback({ redirectURL: pathToFileURL(rendererPath).toString() })
        }
      }
      callback({})
    }
  )

  // Watch window shortcuts (F12 in dev)
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Sample IPC handlers for offline ping/pong or system telemetry
  ipcMain.on('ping', (event) => {
    event.reply('pong', 'pong')
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
