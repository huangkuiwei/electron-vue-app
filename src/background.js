'use strict'

import { app, protocol, BrowserWindow, Menu, Tray, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { autoUpdater } from 'electron-updater'
const isDevelopment = process.env.NODE_ENV !== 'production'

const isDev = process.env.NODE_ENV === 'development'

protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

Menu.setApplicationMenu(null)

let win
let tray

function createTray() {
  tray = new Tray(isDev ? __dirname + '/../public/favicon.ico' : __dirname + '/favicon.ico')

  const menu = Menu.buildFromTemplate([
    {
      label: '退出',
      click: () => {
        app.exit()
      }
    }
  ])

  tray.on('click', () => {
    win.show()
  })

  tray.setToolTip('electron-vue-app')
  tray.setContextMenu(menu)
}

async function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      webviewTag: true,
      enableRemoteModule: true,
      allowRunningInsecureContent: true,
      webSecurity: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    createProtocol('app')
    await win.loadURL('app://./index.html')
  }
  createTray()
  win.webContents.openDevTools()
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) await createWindow()
})

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  await createWindow()
})

const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (win.isMinimized()) {
      win.restore()
    }
    if (win.isVisible()) {
      win.show()
    }
    win.focus()
  })
}

/**
 * 自动更新
 */
const feedUrl = 'https://yz-cache.oss-cn-shanghai.aliyuncs.com/js/yixiaoer'

ipcMain.on('check-update', () => {
  autoUpdater.setFeedURL(feedUrl)

  //执行自动更新检查
  autoUpdater.checkForUpdates().then(() => {})

  autoUpdater.on('error', (event, message) => {
    win.webContents.send('error', message)
  })

  autoUpdater.on('checking-for-update', (event, message) => {
    win.webContents.send('checking-for-update', message)
  })

  autoUpdater.on('update-not-available', (event, message) => {
    win.webContents.send('update-not-available', message)
  })

  // 更新下载进度事件
  autoUpdater.on('download-progress', event => {
    win.webContents.send('download-progress', event)
  })

  // 更新下载完成事件
  autoUpdater.on('update-downloaded', () => {
    win.webContents.send('isUpdateNow')
    ipcMain.on('updateNow', () => {
      autoUpdater.quitAndInstall()
    })
  })
})
