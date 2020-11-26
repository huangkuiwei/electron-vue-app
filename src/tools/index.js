export function getPreloadUrl() {
  let url = ''

  if (process.env.NODE_ENV === 'development') {
    url = __static + '/webview/webview.js'
  } else {
    url = __dirname + '/webview/webview.js'
  }

  return 'file://' + url
}
