<template>
    <div class="marker-amap-container">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
            <el-amap-circle-marker v-for="(marker,index) in markers" :key="index" :center="marker.center" :radius="marker.radius"
                                   :fill-color="marker.fillColor" :fill-opacity="marker.fillOpacity"
                                   :events="marker.events"></el-amap-circle-marker>
            <el-amap-polyline :editable="polyline.editable" :path="polyline.path"></el-amap-polyline>
        </el-amap>
    </div>
</template>

<style>
    .marker-amap-container {
        height: 10rem;
    }
</style>
<script>
    export default {
        data () {
            return {
                zoom: 13,
                center: [121.5273285, 31.21515044],
                markers: [
                    {
                        center: [121.5273285, 31.21515044],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            click: () => {
                                alert('click');
                            }
                        }
                    },
                    {
                        center: [121.5873285, 31.25515044],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            click: () => {
                                alert('click');
                            }
                        }
                    },
                    {
                        center: [121.5173285, 31.25515044],
                        radius: 10,  //半径
                        fillColor: "#74ee59",  //填充颜色
                        fillOpacity: 1, //填充透明度
                        events: {
                            click: () => {
                                alert('click');
                            }
                        }
                    }
                ],
                polyline: {
                    path: [[121.5273285, 31.21515044], [121.5873285, 31.25515044], [121.5173285, 31.25515044]],
                    editable: false
                }
            }
        }
    };
</script>