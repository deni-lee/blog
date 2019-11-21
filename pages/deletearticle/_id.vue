<template>
<div>
    <div class="header">
        <a href="/" class="rcorners">文章列表</a>
        <a href="/article" class="rcorners">文章管理</a>
    </div>
    
    <div class="content">

        <div  v-for="(article,index) in article" :key="index+2" :value="index+2" style="margin-top:30px;">
            
            <input type="text" class="titlepatch" v-model= "article.title">

            <textarea class="contentpatch" cols="100" rows="35" v-model="article.content"></textarea> <br>
            <img :src=" 'http://192.168.14.42:9990' + article.image ">
            <input type="file" name= "image" ref="image" @change= "handleFileUpload" >
            <textarea class="contentpatch" cols="30" rows="2" v-model="article.remark"></textarea>
            
            <button class="submit" @click="submithandler(index)"> 修改 </button>
            <button class="submit" @click="back"> 返回 </button>
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
           article:[],
           image:''
        }
    },
    methods:{
        allarticle(){
            this.typename='全部'
            this.edit=null
        },
        submithandler(index){
            let formData = new FormData();
            formData.append('image',this.image);

            axios.patch('/apis/api/blog/article/'+this.article[index].article_id.image,formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
            )
            .then((res)=>{
                if(res.data.status === 'E00002'){
                    alert(`${res.data.value.title} ${res.data.value.content} ${res.data.value.category_id}`)
                    console.log(res)
                }
                else if(res.data.status === '000000'){
                    alert(`${res.data.value}`)
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        back(){
            window.history.back();
        },handleFileUpload(e){
            this.image=this.$refs.image[0].files[0]
            console.log(this.image)
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
        axios.get('/apis/api/blog/article/'+this.$route.params.id)
        .then((res)=>{
          if(res.data.status=='000000')
          this.article=res.data.value            
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
    margin: 30px 0px 0px 0px;
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
.typelist{
    list-style: none;
    color: #666666;
    font-size: 15px;
    padding: 3px;
    cursor: pointer;
}
.typelist:hover{
    list-style: none;
    color: black;
    font-size: 15px;
    padding: 3px;
    cursor: pointer;
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
.titlepatch{
    width: 500px;
    height: 40px;
    font-size: 20px;
    margin: 10px;
}
.contentpatch{
    margin: 10px;
    font-size: 15px;
}
.submit{
    border-radius: 15%;
    margin: 10px;
    z-index: 1;
    font-size: 15px;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #666666 ;}
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