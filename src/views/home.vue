<template>
  <div class="home">
    <webview
      id="webview"
      src="/webview/webview.html"
      :preload="getPreloadUrl()"
      enableRemoteModule
      nodeIntegrationInWorker
    />
  </div>
</template>

<script>
import { getPreloadUrl } from '@/tools'

export default {
  name: 'home',
  data() {
    return {
      getPreloadUrl
    }
  },
  created() {
    this.$http
      .post('http://localhost:3000', {
        name: 'huang'
      })
      .then(data => {
        console.log(data)
      })
  },
  mounted() {
    this.$nextTick(() => {
      const webview = document.getElementById('webview')

      webview.addEventListener('dom-ready', () => {
        // webview.openDevTools()
      })
    })
  }
}
</script>

<style scoped lang="less">
.home {
}
</style>
