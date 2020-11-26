<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron')

export default {
  name: 'app',
  mounted() {
    setTimeout(() => {
      console.log('check-update')
      ipcRenderer.send('check-update')
    }, 1000)

    ipcRenderer.on('error', (event, args) => {
      console.log('更新失败')
      console.log(args)
    })

    ipcRenderer.on('checking-for-update', (event, args) => {
      console.log('开始检查更新')
      console.log(args)
    })

    ipcRenderer.on('update-not-available', (event, args) => {
      console.log('更新不可用')
      console.log(args)
    })

    ipcRenderer.on('download-progress', (event, args) => {
      console.log('下载进度')
      console.log(args)
    })

    ipcRenderer.on('isUpdateNow', () => {
      console.log('下载完成')

      setTimeout(() => {
        console.log(1)
        ipcRenderer.send('updateNow')
      }, 5000)
    })
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
