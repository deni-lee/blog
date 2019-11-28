<template>
<div>
    <p class="error">404 page not found</p>
    <p class="back" @click="backhandler">回首頁</p>
</div>
</template>

<script>
import nuxtStorage from 'nuxt-storage'

export default {
    methods:{
        backhandler(){
            let token = nuxtStorage.localStorage.getData('token')
            if(token!=""){
                window.location.href='/loging'
            }else{
                window.location.href='/'
            }
        }
    }
}
</script>

<style scoped>
.error{
    font-size: 80px;
    text-align: center;
    color: gray;
    margin-top: 20%;
}
.back{
    background-color: gray;
    color: white;
    text-align: center;
    margin: 50px;
    padding: 10px;
    cursor: pointer;
}
</style>