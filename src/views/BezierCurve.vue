<template>
    <div class="bezierCurve-amap-container">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo">
            <el-amap-bezier-curve v-for="(line,index) in line1" :key="`A-${index}`" :events="line.events" :path="line.path"
                                  :stroke-color="line.strokeColor" :stroke-style="line.strokeStyle"
                                  :stroke-opacity="line.strokeOpacity"></el-amap-bezier-curve>
            <el-amap-bezier-curve v-for="(line,index) in line2" :key="`B-${index}`" :events="line.events" :path="line.path"
                                  :stroke-color="line.strokeColor" :stroke-style="line.strokeStyle"
                                  :stroke-opacity="line.strokeOpacity"></el-amap-bezier-curve>
        </el-amap>
    </div>
</template>

<style>
    .bezierCurve-amap-container {
        height: 33.5rem;
        width: 100%;
    }
</style>
<script>
    export default {
        data () {
            return {
                zoom: 16,
                center: [113.296241, 23.121194],
                line1: [
                    {
                        path: [
                            [113.265398, 23.124983],//公园前地铁站D口
                            [113.266241, 23.121174],//就是这样的喵Meow Cafe
                            [113.266976, 23.120388],//越秀区少年宫(西门)
                            [113.267409, 23.120269],//越秀区少年宫(东南门)
                            [113.268802, 23.120488],//Breaktime cafe(北京路店)
                            [113.269013, 23.121227],//垚燚1点点
                            [113.268844, 23.124873],//千年古道遗址
                            [113.268907, 23.123082],//真功夫(西湖路店)
                            [113.267265, 23.122889],//光明广场(北门)
                            [113.267473, 23.121427],//光明广场(西1门)
                            [113.266241, 23.121174],//就是这样的喵Meow Cafe
                        ],
                        strokeDasharray: [10, 10],
                        strokeColor: "#FF33FF", //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 3, //线宽
                        strokeStyle: "solid" //线样式
                    }
                ],
                line2: [
                    {
                        path: [
                            [113.295051, 23.123667],//东山口地铁站F口
                            [113.295351, 23.123667,113.29479, 23.121963],//理想之家
                            [113.293117, 23.122007],//毛泽东旧居遗址
                            [113.291379, 23.121909],//喵喵屋
                            [113.291007, 23.120966],//由头到美美发·美容
                            [113.294893, 23.119397],//新疆名优干果
                            [113.295985, 23.119212],//中共三大会址纪念馆
                            [113.296382, 23.118878],//逵园1922艺术馆(东南门)
                            [113.296039, 23.11795],//广州市越秀区新河浦幼儿园(西南门)
                            [113.297621, 23.117187],//My Blue Hearen
                            [113.298189, 23.116555],//花说FlowerSays
                            [113.298873, 23.115697],//八山文化
                            [113.301498, 23.115306],//广州DHL快递
                            [113.30239, 23.117827],//达道路派出所社区警务女子中队
                            [113.301801, 23.118322],//咖啡艺术
                            [113.298216, 23.118246],//培正中学(西南门)
                            [113.29752, 23.118441],//广东省文化厅关心下一代工作委员会
                            [113.296981, 23.118604],//简园
                            [113.297845, 23.121057],//烟墩路大院
                            [113.296241, 23.121194],//广州市越秀区少年宫
                            [113.29479, 23.121963],//帝豪家纺(东山口店)
                            [113.295351, 23.123667,113.295051, 23.123667],//东山口地铁站F口
                            [113.295585, 23.124957],//东山口地铁站C口
                            [113.294674, 23.125717],//扉美术馆
                            [113.295585, 23.124957],//东山口地铁站C口
                            [113.295051, 23.123667],//东山口地铁站F口
                            [113.295351, 23.123667,113.29479, 23.121963],//理想之家
                            [113.296241, 23.121194],//广州市越秀区少年宫
                            [113.297845, 23.121057],//烟墩路大院
                            [113.299102, 23.120892],// 十号咖啡店
                            [113.300022, 23.120373],// 七号主场
                            [113.300411, 23.119988],//The Owl’s House猫头鹰主题咖啡馆(旗舰店)
                        ],
                        strokeDasharray: [10, 10],
                        strokeColor: "#FF33FF", //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 3, //线宽
                        strokeStyle: "solid" //线样式
                    }
                ]
            }
        }
    };
</script>