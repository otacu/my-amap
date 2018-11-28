<template>
    <div>
        <draggable :list="spotList" class = "drag-dragArea">
            <div v-for="(element, index) in spotList" class="drag-dragElement">
                <div class="drag-dragElementIndex">{{index+1}}</div>
                <div class="drag-dragElementContent">{{element.name}}</div>
            </div>
        </draggable>
        <div v-on:click="save()" class="drag-saveButton">保存</div>
    </div>
</template>

<style>
    .drag-dragArea {
        display: -webkit-box;
        border:0.2rem solid #ffad47;
    }
    .drag-dragElement {
        border:0.25rem solid #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        margin:0.1rem;
        Height:4rem;
        Width:5rem;
    }
    .drag-dragElementIndex {
        color: #ffffff;
        font-weight:bold;
        Height:1.5rem;
        line-height:1.5rem;
        background-color: #ffad47;
    }
    .drag-dragElementContent {
        line-height:2.5rem
    }
    .drag-saveButton {
        border:0.25rem solid #ffad47;
        background-color: #ffad47;
        -moz-border-radius: 0.5rem;
        -khtml-border-radius: 0.5rem;
        -webkit-border-radius: 0.5rem;
        border-radius: 0.5rem;
        line-height:4rem;
        Height:4rem;
        Width:15rem;
        margin:0.2rem auto;
        font-size:2rem;
        color: #ffffff;
        font-weight:bold;
    }
</style>

<script>
    import draggable from "vuedraggable";
    export default {
        components: {
            draggable
        },
        data(){
            return {
                spotList: [
                    {name: "John"},
                    {name: "Joao"},
                    {name: "Jean"}
                ]
            }
        },
        methods: {
            save(){
                alert(JSON.stringify(this.spotList));
            }
        },
        watch: {
            'spotList' () {
                /*更新地图上的行程覆盖物*/
                console.log(this.spotList);
            }
        }
    }
</script>
