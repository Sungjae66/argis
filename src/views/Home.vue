<template>
  <div class="home">

  </div>
</template>

<script>
  // @ is an alias to /src

  import {loadModules} from 'esri-loader';
  import store from '../store'

  export default {
    name: 'home',
    data() {
      return {

      }
    },
    computed: {
      option() {
        return store.state.option
      }
    },
    mounted() {
      this.createMap();
    },
    methods: {
      createMap() {
        const _self = this;   //定义一个_self防止后续操作中this丢失
        // const option = {      //定义一个包含有JS API中js开发包和css样式文件的对象
        //   url: 'https://js.arcgis.com/4.14/init.js',
        //   css: 'https://js.arcgis.com/4.14/esri/themes/light/main.css',
        // };

        //通过loadModules来做衔接
        loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/Basemap",
          "esri/layers/VectorTileLayer",
          "esri/widgets/BasemapToggle",
          "esri/widgets/BasemapGallery",
          "esri/layers/FeatureLayer"
        ], _self.option)
          .then(([Map, MapView, Basemap, VectorTileLayer, BasemapToggle, BasemapGallery, FeatureLayer]) => {
            var basemap = new Basemap({
              baseLayers: [
                new VectorTileLayer({
                  portalItem: {
                    id: "d2ff12395aeb45998c1b154e25d680e5" // Forest and Parks Canvas
                  }
                })
              ]
            });

            var map = new Map({
              //*** UPDATE ***//
              basemap: "topo-vector",
              // basemap: basemap
            });

            var view= new MapView({
              container: "app",
              map: map,
              center: [-118.80500, 34.02700], // longitude, latitude
              zoom: 13
            });

            //使用小部件选择底图
            var basemapToggle = new BasemapToggle({
              view: view,
              nextBasemap: "satellite"
            });
            view.ui.add(basemapToggle, "top-right");

            //添加图层到底图
            var trailheadsLayer = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
            });

            map.add(trailheadsLayer);
            // Trails feature layer (lines)
            var trailsLayer = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
            });

            map.add(trailsLayer, 0);

            // Parks and open spaces (polygons)
            var parksLayer = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
            });

            map.add(parksLayer, 0);
            //使用小部件选择底图
            // var basemapGallery = new BasemapGallery({
            //   view: view,
            //   source: {
            //     portal: {
            //       url: "https://www.arcgis.com",
            //       useVectorBasemaps: true  // Load vector tile basemaps
            //     }
            //   }
            // });
            // view.ui.add(basemapGallery, "top-right");
          }).catch((err) => {
          _self.$message('地图创建失败，' + err);
        });
      }
    }
  }
</script>
