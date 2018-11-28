<template>
    <div class="transfer-amap-container">
        <el-amap :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
        </el-amap>
        <div id="panel"></div>
    </div>
</template>

<style>
    .transfer-amap-container {
        height: 5rem;
    }
</style>
<script>
    export default {
        data () {
            const self = this;
            return {
                zoom: 13,
                center: [121.5273285, 31.21515044],
                plugin: [
                    {
                        pName: 'Transfer',
                        // TODO 这里应该不是填这个的
                        map: self,
                        city: '上海',
//                        cityd:'目的城市',
                        panel: 'panel',
                        policy: 0,// 乘车策略，少时间0 少步行3 最少换乘2
                        events: {
                            init(o) {
                                console.log(o);
                                o.search([121.5273285, 31.21515044],[121.5873285, 31.25515044],function(status,result){
                                    console.log(result);
                                });
                            }
                        }
                    }
                ]
            }
        }
    };
</script>