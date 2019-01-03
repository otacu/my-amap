<template>
    <div class="transfer-amap-container">
        <el-amap :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin" :amap-manager="amapManager">
        </el-amap>
        <div id="panel"></div>
    </div>
</template>

<style>
    .transfer-amap-container {
        height: 20rem;
    }
</style>
<script>
    import {AMapManager} from "vue-amap"
    let amapManager=new AMapManager();
    export default {
        data () {
            const self = this;
            return {
                zoom: 13,
                center: [121.5273285, 31.21515044],
                amapManager,
                plugin: [
                    {
                        pName: 'Transfer',
                        map: amapManager.getMap(),
                        city: '上海',
//                        cityd:'目的城市',
                        panel: 'panel',
                        policy: 0,// 乘车策略，少时间0 少步行3 最少换乘2
                        events: {
                            init(o) {
                                o.search([121.5273285, 31.21515044],[121.5873285, 31.25515044],function(status,result){
                                    if(status == 'complete'){
                                        (new AMap.TransferRender()).autoRender({
                                            data:result,
                                            map:amapManager.getMap(),
                                            panel:"panel"
                                        });
                                    }else{
                                        console.log('公交路线数据查询失败' + result)
                                    }
                                });
                            }
                        }
                    }
                ]
            }
        }
    };
</script>