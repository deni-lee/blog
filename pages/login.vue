<template>
    <div>

        <div class="header">
            <p class="rcorners">文章列表</p>
        </div>

        <div class="content">
            <div class="logintitle">登入</div>  
            <div>
                <input class="logininput" type="text" placeholder="帳號" v-model="input.name"> <br>
                <input class="logininput" type="text" placeholder="密碼" v-model="input.password">
            </div> 
            <button @click="login">確認</button>         
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { mapMutations } from 'vuex'

export default {
    data(){
        return{
            input:{
                name:'',
                password:''
            },
            token:''
        }
    },
    methods:{
        login(){
            axios.post('/apis/api/blog/login',this.input)
            .then((res)=>{
                if(res.data.status === '000000'){
                    this.token=res.data.value
                    this.$store.commit('loginvuex', this.token)
                    window.location.href='/loging'
                }else if(res.data.status === 'E00002'){
                    this.token=res.data.value
                    this.$store.commit('loginvuex', this.token)
                    alert(` ${res.data.meassage} `)
                    this.cancelhandler()
                    console.log(res)
                }
                console.log(this.$store.state.token)
            }).catch((err)=>{
                console.log(err)
            })
        },
        cancelhandler(){
            this.input.name=''
            this.input.password=''
        }
    }
}
</script>

<style scoped>
.header {
    background-color: #DDDDDD;
    text-align: center;
    padding: 25px;
}

.sidebar_left {
    position:relative;
    width: 50%;
    float: left;
   
}

.sidebar_right {
    position: relative;
    width: 50%;
    float: right;
    text-align: center;
}

.content {
    margin-left: 450px;
    margin-right: 450px;
    text-align: center;
    margin-top: 60px;
    background-color: #F5F5F5;
    padding: 30px;

}

.rcorners{
    font-size: 20px;
    color: gray;
}
.logintitle{
    background-color: #666666;
    border-radius: 20%;
    width: 150px;
    font-size: 35px;
    font-weight: bolder;
    color: #DDDDDD;
    margin-left: 43%;
    margin-top: 40px;
    margin-bottom: 30px;
}
.logininput{
    width: 200px;
    height: 40px;
    margin: 20px;
}
.logininput::placeholder{
    padding-left: 15px;
}
button{
    font-size: 15px;
    padding: 10px;
    background-color: #2f4256;
    color: white;
    margin: 10px;
}
</style>