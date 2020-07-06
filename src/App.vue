<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return{

      }
    },
    mounted(){

    },
    methods: {

    }
  }

</script>
<style lang="less">
  html, body, #app {
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
#app {
  position: absolute;   /**使这个div的大小撑满整个屏幕 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
