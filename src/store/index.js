import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    option:{      //定义一个包含有JS API中js开发包和css样式文件的对象
      url: 'https://js.arcgis.com/4.14/init.js',
      css: 'https://js.arcgis.com/4.14/esri/themes/light/main.css',
    },

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
export default store
