/*计算注数*/
import Vue from 'vue'

export default {

  countSum(arry, num) {
    //arry长度代表选中比赛场次数， arry中元素代表各场次选中的玩法数
    //num代表几串1
    var list = arry;
    var m = list.length,
      n = num;
    var groups = []; //所有排列组合后的可能存放在这
    var playSum = 0; //计算共几种玩法,及注数
    function cloneObj(obj) {
      //深拷贝
      var str, newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj), //序列化对象
          newobj = JSON.parse(str); //还原
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    };
    for (var i = 0; i <= m - n; i++) {
      var data = [];
      var dif = [];
      data.push(list[i]);
      dif.push(i);
      var count = n;
      count = count - 1;
      function aa(data, datadif, c, ii) {
        var cc = c;
        var dd = cloneObj(data);
        var di = cloneObj(datadif);
        for (var j = 1 + ii; j < m; j++) {
          var ddd = cloneObj(dd);
          var ddi = cloneObj(di);
          var ccc = cc;
          if (ccc > 0) {
            ddd.push(list[j]);
            if (ddd.length == n) {
              groups.push(ddd)
            }
            ddi.push(j);
            ccc = ccc - 1;
            aa(ddd, ddi, ccc, j)
          }
        }
      }
      aa(data, dif, count, i)
    }
    //console.log ('组合'+groups);
    for (var l in groups) {
      var sum = 1;
      for (var m in groups[l]) {
        sum = sum * groups[l][m]
      }
      playSum += sum;
    }
    return playSum;
  }
}
