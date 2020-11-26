module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'customAppId',
        productName: 'customProductName',
        copyright: 'customCopyright',
        artifactName: '${productName} ${version}.${ext}',
        asar: true,
        publish: {
          provider: 'generic',
          url: 'https://yz-cache.oss-cn-shanghai.aliyuncs.com/js/yixiaoer' //所要进行更新的服务器
        },
        nsis: {
          oneClick: false, // 静默安装
          perMachine: true, // 始终为本机安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          deleteAppDataOnUninstall: true, // 卸载时删除应用数据
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true // 创建开始菜单图标
        },
        win: {
          icon: 'public/favicon.ico',
          target: {
            target: 'nsis',
            arch: ['ia32']
          }
        }
      }
    }
  }
}
