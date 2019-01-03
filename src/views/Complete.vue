<template>
    <div class="complete-amap-container" @click="addToRoute($event)">
        <el-amap-search-box class="search-box" :search-option="searchOption"
                            :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom" :amap-manager="amapManager" :events="events">
            <el-amap-marker v-for="(marker,index) in searchResultMarkers" :key="`A-${index}`"
                            :position="marker.position"
                            :events="marker.events"></el-amap-marker>
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
            <el-amap-polyline :editable="polyline.editable" :path="polyline.path"></el-amap-polyline>
        </el-amap>

        <div class="dragFrame">
            <draggable :list="spotList" class="dragArea">
                <div v-for="(element, index) in spotList" :key="`D-${index}`" class="dragElement">
                    <div class="dragElementIndex">{{index + 1}}</div>
                    <div class="dragElementContent">{{element.name}}</div>
                    <div class="deleteButton" v-on:click="delFromRoute(index)">×</div>
                </div>
            </draggable>
        </div>
        <div v-on:click="saveRoute()" class="saveButton">保存</div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import {AMapManager} from "vue-amap"
    let amapManager = new AMapManager();
    export default {
        components: {
            draggable
        },
        data(){
            const self = this;
            return {
                center: [0, 0],
                zoom: 12,
                lng: 0,
                lat: 0,
                loaded: false,
                searchResultPoiArray: [],//搜索结果列表
                clickedHotSpot: {},
                amapManager,
                isHotspot: true,//使用热点
                events: {
                    init(o) {
                        AMap.event.addListener(amapManager.getMap(), 'hotspotclick', function (result) { //添加点击事件,传入对象名，事件名，回调函数
                            let placeSearch = new AMap.PlaceSearch({
                                city: this.city, // 兴趣点城市
                                citylimit: true  //是否强制限制在设置的城市内搜索
                            });
                            //详情查询
                            placeSearch.getDetails(result.id, function (status, result) {
                                if (status === 'complete' && result.info === 'OK') {
                                    let poi = result.poiList.pois[0];
                                    poi["lng"] = poi.location.lng;
                                    poi["lat"] = poi.location.lat;
                                    self.addInfoWindowOfHotSpot(poi);
                                }
                            });
                        })
                    }
                },
                plugin: [{
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
//                                var log = {};
//                                log.name = "定位结果";
//                                log.obj = result;
//                                console.log("%o", log);
                                if (result && result.position) {
                                    self.lng = result.position.lng;
                                    self.lat = result.position.lat;
                                    self.center = [self.lng, self.lat];
                                    self.loaded = true;
                                    self.zoom = 13;
                                    self.searchOption.city = result.addressComponent.city;
                                    self.$nextTick();
                                }
                            });
                        }
                    }
                }],
                spotList: [],
                searchResultMarkers: [],
                infoWindows: [],
                searchOption: {
                    city: '全国',
                    citylimit: true
                },
                spotMarkers: [],
                polyline: {
                    path: [],
                    editable: false
                }
            }
        },
        methods: {
            saveRoute(){
                this.axios.post('http://' + document.domain + ':8088/saveRoutePoiList', {
                    list: this.spotList
                })
                    .then((response) => {
                        if (200 == response.data.status) {
                            alert("成功");
                        } else {
                            console.log("错误信息：" + response.data.msg);
                            alert("失败");
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            onSearchResult(pois) {
                this.searchResultMarkers.splice(0, this.searchResultMarkers.length);
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    /*将搜索结果显示位点覆盖物*/
                    this.searchResultPoiArray = [].concat(pois);
                    pois.forEach((poi, idx) => {
                        //console.log(poi);
                        lngSum += poi.lng;
                        latSum += poi.lat;
                        let marker = {
                            position: [poi.lng, poi.lat],
                            events: {
                                /*点击覆盖物打开信息窗口*/
                                click: () => {
                                    this.addInfoWindowOfSearchResult(poi, idx);
                                }
                            }
                        };
                        this.searchResultMarkers.push(marker);
                    });
                    /*将地图中心设置为搜索结果分布的中心位置*/
                    let center = {
                        lng: lngSum / pois.length,
                        lat: latSum / pois.length
                    };
                    this.center = [center.lng, center.lat];
                }
            },
            addToRoute(event){
                let el = event.target;
                if (el.className.indexOf("addButton") != -1) {
                    let poi;
                    if (el.className.indexOf("addButtonOfSearchResult") != -1) {
                        let index = el.getAttribute('data-idx');
                        poi = this.searchResultPoiArray[index];
                    }
                    else if (el.className.indexOf("addButtonOfHotSpot") != -1) {
                        poi = this.clickedHotSpot;
                    }
                    /*行程里已经有的就不显示添加按钮*/
                    let hadThisSpot = false;
                    for (let i in this.spotList) {
                        if (poi.id == this.spotList[i].id) {
                            hadThisSpot = true;
                            break;
                        }
                    }
                    if (!hadThisSpot) {
                        this.spotList.push(poi);
//                        var log = {};
//                        log.name = "加入行程的地点";
//                        log.obj = poi;
//                        console.log("%o", log);
                    }
                }
            },
            delFromRoute(index){
                this.spotList.splice(index, 1);
            },
            initRoute(){
                /*初始化行程*/
                this.axios.post('http://' + document.domain + ':8088/getRoutePoiList', {})
                    .then((response) => {
                        this.spotList = response.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            addInfoWindow(poi){
                let infoWindow = {
                    position: [poi.lng, poi.lat],
                    content: '<div>名称：' + poi.name + '</div><div>地址：' + poi.address + '</div>',
                    events: {},
                    visible: true
                };
                this.infoWindows.push(infoWindow);
            },
            addInfoWindowOfSearchResult(poi, idx){
                let addButton = '<div data-idx="' + idx + '" class="addButton addButtonOfSearchResult">加入行程</div>';
                let infoWindow = {
                    position: [poi.lng, poi.lat],
                    content: '<div>名称：' + poi.name + '</div><div>地址：' + poi.address + '</div>' + addButton,
                    events: {},
                    visible: true
                };
                this.infoWindows.push(infoWindow);
            },
            addInfoWindowOfHotSpot(poi){
                let addButton = '<div class="addButton addButtonOfHotSpot">加入行程</div>';
                let infoWindow = {
                    position: [poi.lng, poi.lat],
                    content: '<div>名称：' + poi.name + '</div><div>地址：' + poi.address + '</div>' + addButton,
                    events: {},
                    visible: true
                };
                this.infoWindows.push(infoWindow);
                this.clickedHotSpot = poi;
            }
        },
        mounted: function () {
            this.initRoute();
        },
        watch: {
            /*监听行程的变化来更新覆盖物*/
            'spotList' () {
                /*更新地图上的行程覆盖物*/
                this.spotMarkers.splice(0, this.spotMarkers.length);
                this.polyline.path.splice(0, this.polyline.path.length);
                this.spotList.forEach(spot => {
                    let spotMarker = {
                        center: [spot.lng, spot.lat],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            /*点击覆盖物打开信息窗口*/
                            click: () => {
                                this.addInfoWindow(spot);
                            }
                        }
                    };
                    this.spotMarkers.push(spotMarker);
                    this.polyline.path.push([spot.lng, spot.lat]);
                });
            }
        }

    }

</script>

<style>
    .complete-amap-container {
        height: 20rem;
        width: 100%;
    }

    .dragArea {
        /*子元素水平展示*/
        display: -webkit-box;
        Height: 4.2rem;
    }

    .dragFrame {
        border: 0.1rem solid #ffad47;
        width: 100%;
        Height: 5rem;
        overflow-x: scroll;
    }

    .dragElement {
        position: relative;
        border: 0.17rem solid #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        margin: 0.1rem;
        Height: 3.7rem;
        Width: 4rem;
    }

    .dragElementIndex {
        color: #ffffff;
        font-weight: bold;
        Height: 1rem;
        line-height: 1rem;
        background-color: #ffad47;
    }

    .dragElementContent {
        line-height: 1rem;
        margin: 0.3rem auto;
        font-size: 0.5rem;
    }

    .saveButton {
        border: 0.25rem solid #ffad47;
        background-color: #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        line-height: 1.8rem;
        Height: 1.7rem;
        Width: 3.7rem;
        margin: 0.1rem auto;
        font-size: 1rem;
        color: #ffffff;
        font-weight: 500;
        cursor: pointer;
    }

    .addButton {
        border: 0.25rem solid #ffad47;
        background-color: #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        line-height: 1rem;
        Height: 1rem;
        Width: 4rem;
        margin: 0.2rem auto;
        font-size: 0.5rem;
        color: #ffffff;
        text-align: center;
        cursor: pointer;
    }

    .search-box {
        position: absolute;
        top: 0rem;
        left: 0rem;
        Width: 1rem;
    }

    .deleteButton {
        position: absolute;
        top: 0;
        right: 0;
        border: 0.0rem solid #ffad47;
        height: 1rem;
        width: 1rem;
        line-height: 1rem;
        font-size: 1rem;
        color: #ffffff;
        -moz-border-radius: 1rem;
        -khtml-border-radius: 1rem;
        -webkit-border-radius: 1rem;
        border-radius: 1rem;
        background-color: #ffad47;
        cursor: pointer;
        margin-top: -0.1rem;
    }
</style>