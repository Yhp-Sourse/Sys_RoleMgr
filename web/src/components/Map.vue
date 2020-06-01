<template>
    <div id="v_map">
       <div id="container"></div> 
    </div>
</template>

<script>
export default {
    name: 'v_map',
    data () {
        return {
            msg: '我是地图组件'
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        initMap(){
            var map = new AMap.Map('container', {
                zoom:7,
                pitch:75, // 地图俯仰角度，有效范围 0 度- 83 度
                viewMode:'2D' // 地图模式可选值：3D
            });

            // 创建一个 Marker 实例：
            var marker1 = new AMap.Marker({
                position: new AMap.LngLat(114.30175781250001, 30.59595661670199),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '武汉'
            });
            var marker2 = new AMap.Marker({
                position: new AMap.LngLat(112.856544000000000, 28.326510244000000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '望城经开区管委会'
            });
            var marker3 = new AMap.Marker({
                position: new AMap.LngLat(113.080347710000000, 28.247772034000000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '长沙县政府'
            });
            var marker4 = new AMap.Marker({
                position: new AMap.LngLat(112.555600120000000, 28.276173905000000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '宁乡县环保局'
            });
            var marker5 = new AMap.Marker({
                position: new AMap.LngLat(113.634986020000000, 28.157563601000000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '浏阳市环保局'
            });
            var marker6 = new AMap.Marker({
                position: new AMap.LngLat(113.175695960000000, 28.255267637000000),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '长沙县长龙站'
            });
            // 长沙市省控点多个点实例组成的数组
            var markerList = [marker1, marker2, marker3,marker4,marker5,marker6];
            map.add(markerList);
            // // 移除已创建的 marker
            // map.remove(marker1);

        },
    },
    components:{


    }

}
</script>

<style scoped>
#container {width:100%; height: 900px; }  
</style>