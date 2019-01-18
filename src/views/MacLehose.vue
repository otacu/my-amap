<template>
    <div class="complete-amap-container">
        <!--<el-amap-search-box class="search-box" :search-option="searchOption"-->
                            <!--:on-search-result="onSearchResult"></el-amap-search-box>-->
        <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom" :amap-manager="amapManager" :events="events">
            <el-amap-info-window v-for="(infoWindow,index) in infoWindows" :key="`B-${index}`"
                                 :position="infoWindow.position"
                                 :content="infoWindow.content"
                                 :visible="infoWindow.visible"
                                 :events="infoWindow.events">
            </el-amap-info-window>
            <el-amap-circle-marker v-for="(marker,index) in spotMarkers" :key="`C-${index}`" :center="marker.center"
                                   :radius="marker.radius"
                                   :fill-color="marker.fillColor" :fill-opacity="marker.fillOpacity"
                                   :events="marker.events"></el-amap-circle-marker>
        </el-amap>

    </div>
</template>

<script>
    import {AMapManager} from "vue-amap"
    let amapManager = new AMapManager();
    export default {
        components: {},
        data(){
            const self = this;
            return {
                center: [114.259607, 22.402551],
                zoom: 12,
                lng: 0,
                lat: 0,
                loaded: false,
                amapManager,
                events: {},
                plugin: [
                    {
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 1000,          //超过10秒后停止定位，默认：无穷大
                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                    showButton: true,        //显示定位按钮，默认：true
                    buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                    zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
                    extensions: 'all',
                    pName: 'Geolocation',
                    events: {
                        init(o) {
                            // o 是高德地图定位插件实例
                            o.getCurrentPosition((status, result) => {
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.loaded = true;
                                    self.zoom = 13;
                                    self.$nextTick();
                                }
                            });
                        }
                    }
                }
                ],
                infoWindows: [],
                searchOption: {
                    city: '香港',
                    citylimit: true
                },
                spotMarkers: [
                    {
                        center: [114.324013, 22.393906],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "北潭涌(公交站)",
                                    address: "九巴94路;九巴96R路",
                                    lat: 22.393906,
                                    lng: 114.324013
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.32952, 22.397586],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "西貢東郊野公園-北潭涌",
                                    address: "大綱仔路北100米",
                                    lat: 22.397586,
                                    lng: 114.32952
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.33532, 22.391886],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "大綱仔路与西貢万宜路交接处",
                                    address: "自定义地点",
                                    lat: 22.397586,
                                    lng: 114.32952
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.34027, 22.379133],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "西貢万宜路",
                                    address: "西贡区",
                                    lat: 22.379133,
                                    lng: 114.34027
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.345419, 22.37095],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "西貢東郊野公園-万宜水库西坝",
                                    address: "西貢",
                                    lat: 22.37095,
                                    lng: 114.345419
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.377667, 22.361394],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "西貢東郊野公園-万宜水库东坝",
                                    address: "西贡",
                                    lat: 22.361394,
                                    lng: 114.377667
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.379482, 22.373286],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "浪茄",
                                    address: "西贡区",
                                    lat: 22.373286,
                                    lng: 114.379482
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.38267, 22.384731],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "西湾山",
                                    address: "西贡区",
                                    lat: 22.384731,
                                    lng: 114.38267
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.370208, 22.399364],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "大浪西灣",
                                    address: "新界西贡东郊野公园东岸",
                                    lat: 22.399364,
                                    lng: 114.370208
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.383543, 22.408331],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "咸田湾",
                                    address: "麦理浩径",
                                    lat: 22.408331,
                                    lng: 114.383543
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.37104, 22.416885],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "大浪坳",
                                    address: "西贡区",
                                    lat: 22.416885,
                                    lng: 114.37104
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.358949, 22.421957],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "白普理堂(赤徑)青年旅舍",
                                    address: "新界西贡赤径口渡轮码头旁",
                                    lat: 22.421957,
                                    lng: 114.358949
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.337106, 22.417238],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "北潭凹",
                                    address: "新界西贡半岛北部北潭路一带",
                                    lat: 22.417238,
                                    lng: 114.337106
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.327385, 22.418991],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "牛耳石山",
                                    address: "西贡麦理浩径3段",
                                    lat: 22.418991,
                                    lng: 114.327385
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.309284, 22.410686],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "雷打石",
                                    address: "西贡区",
                                    lat: 22.410686,
                                    lng: 114.309284
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.295032, 22.413217],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "鸡公山",
                                    address: "西贡麦理浩径3段",
                                    lat: 22.413217,
                                    lng: 114.295032
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.274668, 22.413075],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "企岭下新围",
                                    address: "西沙路",
                                    lat: 22.413075,
                                    lng: 114.274668
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },
                    {
                        center: [114.280202, 22.399782],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                let spot = {
                                    name: "水浪窩營地",
                                    address: "企嶺下林道东50米",
                                    lat: 22.399782,
                                    lng: 114.280202
                                }
                                this.addInfoWindow(spot);
                            }
                        }
                    },

                ]
            }
        },
        methods: {
            addInfoWindow(poi){
                let infoWindow = {
                    position: [poi.lng, poi.lat],
                    content: '<div>名称：' + poi.name + '</div><div>地址：' + poi.address + '</div>',
                    events: {},
                    visible: true
                };
                this.infoWindows.push(infoWindow);
            },
//            onSearchResult(pois) {
//                console.log(pois);
//            }
        },
        mounted: function () {
        }

    }

</script>

<style>


</style>