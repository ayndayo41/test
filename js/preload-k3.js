const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('electronAPI', {
  onUrl: (callback) => ipcRenderer.on('url', (_event, value) => callback(value)),
  sendUrl: (url) =>   ipcRenderer.send('url-k3', url),
  sendNavigation: (msg) =>   ipcRenderer.send('nav-k3', msg),

})

