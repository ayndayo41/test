const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  onUrl: (callback) => ipcRenderer.on('url', (_event, value) => callback(value)),
  sendUrl: (url) =>   ipcRenderer.send('url-k1', url),
  sendNavigation: (msg) =>   ipcRenderer.send('nav-k1', msg),

})

