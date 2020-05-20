import Utils from '../utils'
import request from './request'
var wdnmd = 'http://hhsj.gzlixing233.com:5555/'

export default {
  cas: process.env.API_CAS,
  pos: process.env.API_POS,
  interfacePlatform: process.env.API_OTHER,
  moxie: process.env.API_MOXIE,
  imgDPR() {
    if (window.devicePixelRatio >= 2.5) {
      var lowresImages = document.getElementsByTagName("img");
      for (var i in lowresImages) {
        var lowres = lowresImages[i].src;
        if (lowres) {
          var highres = lowres.replace('@2x', '@3x');
          lowresImages[i].src = highres;
        }
      }
    }
  },
  // 接口请求公用参数
  getKeyParams(platform, version) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let keyParams = {
      "token": "",
      "userId": "",
      "timestamp": new Date().getTime(),
      "appType": 1,
      "appName": "花花世界",
      "version": '1.0',
    };
    if (isAndroid) {
      keyParams.phoneType = "0";
    } else if (isiOS) {
      keyParams.phoneType = "1";
    }
    if (platform) {
      keyParams.platform = platform;
    }
    if (version) {
      keyParams.version = version;
    }

    if (!Utils.isEmpty(localStorage['userMes'])) {
      keyParams.userId = JSON.parse(localStorage['userMes']).userId;
    }
    if (!Utils.isEmpty(localStorage['token'])) {
      keyParams.token = localStorage['token'];
    }
    console.log(JSON.stringify(keyParams))
    return Utils.encrypt(Utils.encrypt(JSON.stringify(keyParams)));
    // return JSON.stringify(keyParams);
  },
  // 接口请求公用参数
  getKeyParams2(platform, version) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let keyParams = {
      "token": "",
      "userId": "",
      "timestamp": new Date().getTime(),
      "appType": 1
    };
    if (isAndroid) {
      keyParams.phoneType = "0";
    } else if (isiOS) {
      keyParams.phoneType = "1";
    }
    if (platform) {
      keyParams.platform = platform;
    }
    if (version) {
      keyParams.version = version;
    }
    if (!Utils.isEmpty(localStorage['userMes'])) {
      keyParams.userId = JSON.parse(localStorage['userMes']).userId;
    }
    if (!Utils.isEmpty(localStorage['token'])) {
      keyParams.token = localStorage['token'];
    }
    // return Utils.encrypt(Utils.encrypt(JSON.stringify(keyParams)));
    return JSON.stringify(keyParams);
  },
  requestPos(params, url) {
    return request({
      url: wdnmd + 'pos' + url,
      method: 'post',
      data: params
    })
  },
  requestCasImg(params, data, url) {
    return request({
      url: wdnmd + 'cas' + url,
      method: 'post',
      params: params,
      data: data
    })
  },
  requestCas(params, url) {
    return request({
      url: wdnmd + 'cas' + url,
      method: 'post',
      data: params
    })
  },
  requestOther(params, url) {
    return request({
      url: wdnmd + 'interfacePlatform' + url,
      method: 'post',
      data: params
    })
  },
  requestMoxie(params, url) {
    return request({
      url: wdnmd + 'moxie' + url,
      method: 'post',
      data: params
    })
  },
  getHost(){
    return new Promise((resolve, reject) => {
      let params1 = {
        jsonObject: {
          "appName":"花花世界"
        }
      }

      request({
        url: 'http://yss.ballwincall.cn:10088/hide/appUser/appName',
        method: 'post',
        params: params1
      }).then((response) => {
        if (response.data.status == 'SUCCESS') {
          wdnmd = response.data.t.appYm.trim()
          resolve()
        } else {
          wdnmd = 'http://hhsj.gzlixing233.com:5555/'
        }
      }).catch(error => {
        wdnmd = 'http://hhsj.gzlixing233.com:5555/'
        reject(error)
      });

    })

  }
}

