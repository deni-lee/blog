<template>
  <div>
    <div class="header">
        <a href="/" class="rcorners">文章列表</a>
        <a href="/article" class="rcorners">文章管理</a>
    </div>
    <div class="content">
    <div class="sidebar_left">
        <p class="typetitle">文章分類</p> 
        <ul >
          <li class="typelist" @click= "back">全部分類</li>
          <li v-for= "(item,index) in type" :key="index" value="index" class="typelist" @click= "read(index)">{{ item.name }}</li>
        </ul>
    </div>
    <div class="sidebar_right">
        
        <div v-for="(article,index) in article" :key="index" value="index" class="titlelist">
          <p class="contenttitle" @click= "change(index)">{{ article.title }}</p>
          <p class="artcontent" @click= "change(index)">{{ article .content }}</p>
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
        article:[]
      }
    },
    methods:{
      change(index){
        window.location.href='/content/'+this.article[index].article_id
      },
      read(index){
        window.location.href='/type/'+this.type[index].category_id
      },
      back(){
        window.location.href='/'
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
        axios.get('/apis/api/blog/category/'+ this.$route.params.id +'/article')
        .then((res)=>{
          if(res.data.status=='000000')
          this.article=res.data.data
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
.titlelist{
  text-align: left;
  margin: 20px;
  padding: 13px;
  border:2px solid #939699; 
  cursor: pointer;
}
.contenttitle{
  font-size: 18px;
  font-weight:bold;
  margin: 5px;
}
.artcontent{
  color: #939699;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

</style>
