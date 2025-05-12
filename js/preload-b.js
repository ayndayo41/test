const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  onUrl: (callback) => ipcRenderer.on('url', (_event, value) => callback(value)),
  sendUrl: (url) =>   ipcRenderer.send('url-b', url),
  sendNavigation: (msg) =>   ipcRenderer.send('nav-b', msg),

})

