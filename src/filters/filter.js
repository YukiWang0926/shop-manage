import moment from "moment"
import Vue from "vue"

const formatTime = (value) => {
  return moment(value*1000).format('YYYY/MM/DD HH:mm:ss')
}
Vue.filter("formatTime", formatTime)