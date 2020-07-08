<template>
  <div class="home"></div>
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
    created() {
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

            //添加Trailheads要素图层
            //定义一个simple渲染器和设置符号属性绘制一个徒步旅行者图
            var trailheadsRenderer = {
              type: "simple",
              symbol: {
                type: "picture-marker",
                url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
                width: "18px",
                height: "18px"
              }
            };
            // 添加路径名称标签
            var trailheadsLabels = {
              symbol: {
                type: "text",
                color: "#FFFFFF",
                haloColor: "#5E8D74",
                haloSize: "2px",
                font: {
                  size: "12px",
                  family: "Noto Sans",
                  style: "italic",
                  weight: "normal"
                }
              },
              labelPlacement: "above-center",
              labelExpressionInfo: {
                expression: "$feature.TRL_NAME"
              }
            };

            //使用HTML为Trailheads图层定义弹出窗口
            // 定义一个足迹的弹窗口
            var popupTrailheads = {
              "title": "Trailhead",
              "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
            };
            var trailheadsLayer = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
              renderer: trailheadsRenderer,
              labelingInfo: [trailheadsLabels],
              outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
              popupTemplate: popupTrailheads
            });

            map.add(trailheadsLayer);

            //定义不同的符号要素样式
            var trailsRenderer = {
              type: "simple",
              symbol: {
                color: "#BA55D3",
                type: "simple-line",
                style: "solid"
              },
              visualVariables: [
                {
                  type: "size",
                  field: "ELEV_GAIN",
                  minDataValue: 0,
                  maxDataValue: 2300,
                  minSize: "3px",
                  maxSize: "7px"
                }
              ]
            };

            // 为步道定义一个弹窗口
            var popupTrails = {
              title: "Trail Information",
              // content: function(){
              //   return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing.";
              // }
              content: [{
                type: "media",
                mediaInfos: [{
                  type: "column-chart",
                  caption: "",
                  value: {
                    fields: [ "ELEV_MIN","ELEV_MAX" ],
                    normalizeField: null,
                    tooltipField: "Min and max elevation values"
                  }
                }]
              }]
            };
            // 添加步道和公园以及开放空间要素图层
            var trailsLayer = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
              renderer: trailsRenderer,
              opacity: .75,
              outFields: ["TRL_NAME","ELEV_GAIN"],
              popupTemplate: popupTrails
            });
            map.add(trailsLayer, 0);

            // 为公园以及开放空间定义一个弹窗口
            var popupOpenspaces = {
              "title": "{PARK_NAME}",
              "content": [{
                "type": "fields",
                "fieldInfos": [
                  {
                    "fieldName": "AGNCY_NAME",
                    "label": "Agency",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                  },
                  {
                    "fieldName": "TYPE",
                    "label": "Type",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                  },
                  {
                    "fieldName": "ACCESS_TYP",
                    "label": "Access",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": null,
                    "stringFieldOption": "text-box"
                  },
                  {
                    "fieldName": "GIS_ACRES",
                    "label": "Acres",
                    "isEditable": true,
                    "tooltip": "",
                    "visible": true,
                    "format": {
                      "places": 2,
                      "digitSeparator": true
                    },
                    "stringFieldOption": "text-box"
                  }
                ]
              }]
            };
            var openspaces = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
              outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
              popupTemplate: popupOpenspaces
            });
            map.add(openspaces,0);

            // 设置小径图层的样式以显示仅自行车的小径
            var bikeTrailsRenderer = {
              type: "simple",
              symbol: {
                type: "simple-line",
                style: "short-dot",
                color: "#FF91FF",
                width: "1px"
              }
            };
            var bikeTrails = new FeatureLayer({
              url:
                "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
              renderer: bikeTrailsRenderer,
              definitionExpression: "USE_BIKE = 'YES'"
            });
            map.add(bikeTrails, 1);

            //风格独特的公园区
            function createFillSymbol(value, color) {
              return {
                "value": value,
                "symbol": {
                  "color": color,
                  "type": "simple-fill",
                  "style": "solid",
                  "outline": {
                    "style": "none"
                  }
                },
                "label": value
              };
            }
            var openSpacesRenderer = {
              type: "unique-value",
              field: "TYPE",
              uniqueValueInfos: [
                createFillSymbol("Natural Areas", "#9E559C"),
                createFillSymbol("Regional Open Space", "#A7C636"),
                createFillSymbol("Local Park", "#149ECE"),
                createFillSymbol("Regional Recreation Park", "#ED5151")
              ]
            };
            // 创建一个图层并将其添加到地图中
            var openspaces = new FeatureLayer({
              url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0",
              renderer: openSpacesRenderer,
              opacity: 0.5
            });
            map.add(openspaces,0);

          }).catch((err) => {
          _self.$message('地图创建失败，' + err);
        });
      }
    }
  }
</script>

<style lang="less">
  .home{
    width: 100%;
    height: 100%;
  }
</style>
