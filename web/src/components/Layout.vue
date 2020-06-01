<template>
    <div class="layout">
        <div class="main-wrapper">
            <div class="main-left">
                <Menu></Menu>
            </div>
            <div class="main-right">
                <div class="main-right-wrapper">
                    <div class="main-right-title">{{pageTitle}}</div>
                    <slot>
                        <router-view />
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import Navbar from "../components/Menu";
 
export default {
    name: "layout",
    components: {
        Navbar
    },
    data() {
        return {
            isCollapse: false,
            docWidth: document.body.clientWidth,
            pageTitle: ""
        };
    },
    computed: {},
    mounted() {
        this.pageTitle = document.title;
    }
};
</script>
 
<style scoped>

</style>