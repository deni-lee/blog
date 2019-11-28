<template>
    <div>

        <div class="header">
            <a href="/" class="rcorners">文章列表</a>
            <a href="login" class="rcorners">登入</a>
        </div>

        <div class="content">
            <div class="logintitle">註冊</div>  
            <div>
                <input class="logininput" type="text" placeholder="帳號" v-model="input.name"> <br>
                <input class="logininput" type="password" placeholder="密碼" v-model="input.password"> <br>
                <input class="logininput" type="password" placeholder="確認密碼" v-model="input.password_confirmation">
            </div> 
            <button @click="submithandler">確認</button>   
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import nuxtStorage from 'nuxt-storage'


export default {
    data(){
        return{
            input:{
                name:'',
                password:'',
                password_confirmation:''
            }
        }
    },
    methods:{
        submithandler(){
            axios.post('/apis/api/blog/register',this.input)
            .then((res)=>{
                if(res.data.status==='000000'){
                    alert(`${res.data.meassage}`)
                    window.location.href='/login'
                }else if(res.data.status==='E00002'){
                    alert(`${res.data.meassage}`)
                }
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        let token=nuxtStorage.localStorage.getData('token')      
        if(token!==""){
          window.location.href='/error'
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
.rcorners {
  text-decoration:none;
  font-size: 20px;
  color: gray;
  margin: 50px;
  padding: 15px;
  transition: all 1s;

}
.rcorners:hover{
  text-decoration:none;
  border-radius: 15px;
  color: white;
  background-color: gray;
  margin: 50px;
  padding: 15px;
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