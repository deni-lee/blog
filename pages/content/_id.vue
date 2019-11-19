<template>
    <div>

        <div class="header">
        <a href="/" class="rcorners">文章列表</a>
        <a href="/article" class="rcorners">文章管理</a>
        </div>

        <div class="content">

            <div class="sidebar_left">
                <p class="typetitle">文章分類</p> 
                <ul>
                    <li class="typelist" @click= "back">全部分類</li>
                    <li class="typelist" v-for= "(item,index) in type" :key="index" value="index" @click= "read(index)">{{ item.name }}</li>
                </ul>
            </div>

            <div class="sidebar_right">
                <div v-for="(item,index) in content" :key="index" value="index">
                    <p class="title" >{{ item.title }}</p> <br>
                    <p class="articlecontent" >{{ item.content }}</p>
                </div>

                <div style="margin-top:30px; ">
                    <p class="Commenttitle">評論</p>
                        <textarea cols="50" rows="4" placeholder="新增評論" class="newcomment" ></textarea>
                        <button class="commentsubmit">送出</button>
                        <p class="comment" v-for="(comment,index) in comment" :key="index" value="index">{{ comment.content }}</p>
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
            content:[],
            type:[],
            comment:[],
            article:[],
        }
    },
    methods:{
        read(index){
            window.location.href='/type/'+this.type[index].category_id
        },
        back(){
            window.location.href='/'
        }
        
    },
    mounted(){
        axios.get('/apis/api/blog/article/'+this.$route.params.id)
        .then((res)=>{
            this.content=res.data.value
        }).catch((err)=>{
            console.log(err)
        })
        axios.get('/apis/api/blog/category')
        .then((res)=>{
          if(res.data.status=='000000')
          this.type=res.data.value            
        }).catch((err)=>{
            console.log(err)
        })
        axios.get('/apis/api/blog/article/'+this.$route.params.id+'/comment')
        .then((res)=>{
            this.comment=res.data.value
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
  text-align: center;
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
.typetitle{
  margin: 15px;
  background-color: #888888;
  font-size: 20px;
  border-radius: 15%;
  color: white;
  text-align: center;
}
.typelist{
  display: inline-block;
  padding: 10px 25px;
  margin: 5px;
  font-size: 17px;
  cursor: pointer;
  text-align: center;   
  border: none;
  box-shadow: 0 3px 3px #999;
}
.title{
    text-align: left;
    font-size: 32px;
    font-weight:bold;
    margin: 50px 20px 10px 0px ; 
    color: #444444;
}
.articlecontent{
    color: #444444;
}
.Commenttitle{
    font-size: 22px;
    background-color: #708090;
    color: white;
    font-weight: bold;
    text-align: left;
    border-radius: 5%;
    padding: 3px 3px 5px 20px;
}
.comment{
    padding: 10px;
    font-size: 15px;
    color: #666666;
    border: 2px dotted #778899;
    margin: 20px 0px 0px 0px;
}
.newcomment{
    margin-top: 20px;
    font-size: 15px;
}
.commentsubmit{
    margin: 10px;
    z-index: 1;
    font-size: 10px;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #708090 ;}
.commentsubmit:active{
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