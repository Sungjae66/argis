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
  html, body{
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    font-size: 62.5%;
  }
#app {
  position: absolute;
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
