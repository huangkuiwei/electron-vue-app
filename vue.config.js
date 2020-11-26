module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'customAppId',
        productName: 'customProductName',
        copyright: 'customCopyright',
        artifactName: '${productName} ${version}.${ext}',
        asar: true
      }
    }
  }
}
