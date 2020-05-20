import Vue from 'vue'

const Bus = new Vue()
const Constants = {
  'selectData': 'selectData'
}

export default {
  Bus,
  Constants,
  offBus() {
    for (let obj in Constants) {
      Bus.$off(obj);
    }
  }
}
