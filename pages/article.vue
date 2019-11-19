<template>
    <div>
    <div class="header">
        <a href="/" class="rcorners">文章列表</a>
        <a href="/article" class="rcorners">文章管理</a>
    </div>

    <div class="content">

        <div class="sidebar_left">
            <p><a href="/article" class="now">新增文章</a> </p>
            <p><a href="/deletearticle" class="new">刪除文章</a></p>
            <p><a href="/newtype" class="new">新增分類</a> </p>
        </div>

        <div class="sidebar_right">
            <div>
                <input type="text" class="title" placeholder="標題" v-model= "input.title">
                
            <select v-model= "input.category_id">
                    <option v-for="(item, index) in type" :key="index+2" :value="index+2">{{ item.name }}-{{index+2}}</option>
                    
                </select>
            </div>

            <div>
                <textarea cols="100" rows="40" v-model= "input.content"></textarea>
                <input type="text" class="title" placeholder="備註" v-model= "input.remark">
                <input type="text" class="title" placeholder="圖片" v-model= "input.image">
                <button class="submit" @click= "submitHandler">新增</button>
            </div>
            
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            type:[],
            input:{
                title:'',
                image:'',
                remark:'',
                category_id:'',
                content:'',
            }
        }
    },
    methods:{
        submitHandler(index){
            // if(!input.article_id || !input.title || !input.content) return
            axios.post('apis/api/blog/article',this.input)
            .then((res)=>{
                if(res.data.status === 'E00002'){
                    alert(`${res.data.value}`)
                }else{
                    alert('新增成功')
                    this.clear()
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        clear(){
            this.input.title='',
            this.input.image='',
            this.input.remark='',
            this.input.category_id='',
            this.input.content=''
        }
        
    },
    mounted(){
        axios.get('/apis/api/blog/category')
        .then((res)=>{
          if(res.data.status=='000000')
          this.type=res.data.value            
        }).catch((err)=>{
            console.log(err)
        })
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
    width: 200px;
    float: left;
   
}

.sidebar_right {
    position: relative;
    width: 500px;
    float: right;
   
}

.content {
    margin-left: 450px;
    margin-right: 450px;
    text-align: center;
}

.rcorners {
    text-decoration:none;
    font-size: 20px;
    color: gray;
    margin: 50px;
    padding: 15px;
}
.rcorners:hover{
    text-decoration:none;
    border-radius: 15px;
    color: white;
    background-color: gray;
    margin: 50px;
    padding: 15px;
}
p{
    border-bottom: 1px solid gray;
    padding: 5px;
    margin: 5px;
}
li{
    list-style:none;
    background-color: antiquewhite;
    margin: 20px;
    padding: 20px;
}
.new{
    text-decoration:none;
    color: #444444;
}
.new:active{
    text-decoration:none;
    color: gray;
}
.now{
    text-decoration:none;
    font-weight: bold;
    color: black;
}
.title{
    width: 200px;
    height: 40px;
    margin: 20px;
}
.write{
    width: 900px;
    height: 700px;
    vertical-align:text-top;   
}
.write::placeholder{
    text-align: center;
}
.type{
    width: 100px;
    height: 40px;
}
.submit{
    margin: 10px;
    z-index: 1;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #444444 ;
    float: left;
}
.submit:active{
    cursor: pointer;
    animation: jelly 0.5s;
}
@keyframes jelly {
    0%,
    100% {
        transform: scale(1, 1);
    }
    25% {
        transform: scale(0.9, 1.1);
    }
    50% {
        transform: scale(1.1, 0.9);
    }
    75% {
        transform: scale(0.95, 1.05);
    }
}
</style>