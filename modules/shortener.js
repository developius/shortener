function shorten(url, customURL, callback) {

}

function retrieve(shortURL, callback) {

}

function checkURL(url, callback) {
  var urlRegExp = /^((ht|f)tps?:\/\/|)[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/
  if (url.indexOf('http') == -1) { // this also accounts for https
    url = 'http://' + url
    callback({ status: true, url: url })
  }
  if (url.indexOf('subr.pw') != -1 || !url || !urlRegExp.test(url)) { // if us, doesn't exist or isn't valid url
    callback({ status: false, url: null })
  }
} 

function logStats(useragent) {
  stats = {
    browser: useragent.browser,
    version: useragent.version,
    os: useragent.os,
    platform: useragent.platform,
    useragent: useragent.source
  }
}

module.exports = {
    retrieve: retrieve,
    shorten: shorten,
    checkURL: checkURL,
    logStats: logStats
};