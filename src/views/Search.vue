<template>
    <div class="amap-page-container">
        <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        <el-amap vid="amapDemo" :center="center" :zoom="zoom" class="amap-demo">
            <el-amap-marker v-for="marker in searchResultMarkers" :position="marker.position" :events="marker.events"></el-amap-marker>
            <el-amap-info-window v-for="infoWindow in searchResultInfoWindows"
                    :position="infoWindow.position"
                    :content="infoWindow.content"
                    :visible="infoWindow.visible"
                    :events="infoWindow.events">
            </el-amap-info-window>
        </el-amap>
    </div>
</template>

<style>
    .amap-demo {
        height: 300px;
    }

    .search-box {
        position: absolute;
        top: 25px;
        left: 20px;
    }

    .amap-page-container {
        position: relative;
    }

</style>

<script>
    export default {
        data: function() {
            return {
                searchResultMarkers: [
                ],
                searchOption: {
                    city: '上海',
                    citylimit: true
                },
                center: [121.59996, 31.197646],
                zoom: 12,
                searchResultInfoWindows: []
            };
        },
        methods: {
            onSearchResult(pois) {
                let latSum = 0;
                let lngSum = 0;
                if (pois.length > 0) {
                    /*将搜索结果显示位点覆盖物*/
                    pois.forEach(poi => {
                        console.log(poi);
                        lngSum += poi.lng;
                        latSum += poi.lat;
                        let marker = {
                            position: [poi.lng, poi.lat],
                            events: {
                                /*点击覆盖物打开信息窗口*/
                                click: () => {
                                    let infoWindow = {
                                        position: [poi.lng, poi.lat],
                                        content: '<div>名称：'+poi.name+'</div><div>地址：'+poi.address+'</div>',
                                        events: {},
                                        visible: true
                                    };
                                    this.searchResultInfoWindows.push(infoWindow);
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
            }
        }
    };
</script>