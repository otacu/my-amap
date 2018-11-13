<template>
    <div class="amap-page-container" @click="add($event)">
        <el-amap-search-box class="search-box" :search-option="searchOption"
                            :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap vid="amap" :plugin="plugin" :center="center" :zoom="zoom">
            <el-amap-marker v-for="marker in searchResultMarkers" :position="marker.position"
                            :events="marker.events"></el-amap-marker>
            <el-amap-info-window v-for="infoWindow in infoWindows"
                                 :position="infoWindow.position"
                                 :content="infoWindow.content"
                                 :visible="infoWindow.visible"
                                 :events="infoWindow.events">
            </el-amap-info-window>
            <el-amap-circle-marker v-for="marker in spotMarkers" :center="marker.center" :radius="marker.radius"
                                   :fill-color="marker.fillColor" :fill-opacity="marker.fillOpacity"
                                   :events="marker.events"></el-amap-circle-marker>
            <el-amap-polyline :editable="polyline.editable" :path="polyline.path"></el-amap-polyline>
        </el-amap>

        <draggable :list="spotList" class="dragArea">
                <div v-for="(element, index) in spotList" class="dragElement">
                        <div class="dragElementIndex">{{index + 1}}</div>
                        <div class="dragElementContent">{{element.name}}</div>
                        <div class="deleteButton" v-on:click="del(index)">×</div>
                </div>
        </draggable>
        <div v-on:click="save()" class="saveButton">保存</div>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
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
                poisArray: [],//搜索结果列表
                transfer:{},
                plugin: [{
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 100,          //超过10秒后停止定位，默认：无穷大
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
                                var log = {};
                                log.name = "定位结果";
                                log.obj = result;
                                console.log("%o", log);
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
            save(){
                alert(JSON.stringify(this.spotList));
            },
            onSearchResult(pois) {
                this.searchResultMarkers.splice(0, this.searchResultMarkers.length);
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    /*将搜索结果显示位点覆盖物*/
                    this.poisArray = [].concat(pois);
                    pois.forEach((poi, idx) => {
                        //console.log(poi);
                        lngSum += poi.lng;
                        latSum += poi.lat;
                        let marker = {
                            position: [poi.lng, poi.lat],
                            events: {
                                /*点击覆盖物打开信息窗口*/
                                click: () => {
                                    let addButton = '<div data-idx="' + idx + '" class="addButton">加入行程</div>';
                                    let infoWindow = {
                                        position: [poi.lng, poi.lat],
                                        content: '<div>名称：' + poi.name + '</div><div>地址：' + poi.address + '</div>' + addButton,
                                        events: {},
                                        visible: true
                                    };
                                    this.infoWindows.push(infoWindow);
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
            add(event){
                let el = event.target;
                if (el.className == 'addButton') {
                    let index = el.getAttribute('data-idx');
                    let poi = this.poisArray[index];
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
                        var log = {};
                        log.name = "加入行程的地点";
                        log.obj = poi;
                        console.log("%o", log);
                    }
                }
            },
            del(index){
                this.spotList.splice(index, 1);
            }
        },
        mounted() {
            this.$nextTick(function () {

            });
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
                                let infoWindow = {
                                    position: [spot.lng, spot.lat],
                                    content: '<div>名称：' + spot.name + '</div><div>地址：' + spot.address + '</div>',
                                    events: {},
                                    visible: true
                                };
                                this.infoWindows.push(infoWindow);
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
    .amap-page-container {
        height: 35rem;
    }
    .dragArea {
        /*子元素水平展示*/
        display: -webkit-box;
        border: 0.2rem solid #ffad47;
        Height: 6.7rem;
        overflow: auto;
    }
    .dragElement {
        position: relative;
        border: 0.25rem solid #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        margin: 0.11rem;
        Height: 6rem;
        Width: 8rem;
    }
    .dragElementIndex {
        color: #ffffff;
        font-weight: bold;
        Height: 1.5rem;
        line-height: 1.5rem;
        background-color: #ffad47;
    }
    .dragElementContent {
        line-height: 1.8rem;
        margin: 0.6rem auto;
        font-size: 0.5rem;
    }
    .saveButton {
        border: 0.25rem solid #ffad47;
        background-color: #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        line-height: 2.8rem;
        Height: 2.7rem;
        Width: 7rem;
        margin: 0.2rem auto;
        font-size: 2rem;
        color: #ffffff;
        font-weight: 500;
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
    }
    .search-box {
        position: absolute;
        top: 3.5rem;
        left: 1rem;
        Width: 1rem;
    }
    .deleteButton {
        position: absolute;top: 0;right: 0;
        border: 0.0rem solid #ffad47;
        height: 1.5rem;
        width: 1.5rem;
        line-height: 1.5rem;
        font-size: 2rem;
        color: #ffffff;
        -moz-border-radius: 1rem;
        -khtml-border-radius: 1rem;
        -webkit-border-radius: 1rem;
        border-radius: 1rem;
        background-color: #ffad47;
        cursor:pointer;
        margin-top: -0.1rem;
    }
</style>