<template>
<div>
    <div class="header">
        <a href="/" class="rcorners">文章列表</a>
        <a href="/article" class="rcorners">文章管理</a>
    </div>
    
    <div class="content">

        <div class="sidebar_left">
            <p><a href="/article" class="new">新增文章</a> </p>
            <p><a href="/deletearticle" class="now">文章編輯</a></p>
            <ul>
                <li class="typelist" @click= "allarticle">全部</li>
                <li class="typelist" v-for="(type,index) in type" :key="index" value="index" @click= "read(index)">{{ type.name }}</li>
            </ul>
            <p><a href="/newtype" class="new">新增分類</a> </p>
        </div>

        <div class="sidebar_right">

            <div style="margin-top: 25px;">
                <ul> <span class="typename">{{ typename }}</span> 
                    <li class="articlelist" v-for="(all,index) in all" :key="index" value="index" v-if="edit === null" >
                        <button class="delete" @click= "deletehandlerall(index)">刪除</button>
                        <button class="delete" @click= "patchhandlerall(index)">編輯</button>
                        {{ all.title }}
                    </li>
                    <li class="articlelist" v-for="(article,index) in article" :key="index" value="index">
                        <button class="delete" @click= "deletehandler(index)">刪除</button>
                        <button class="delete" @click= "patchhandler(index)">編輯</button>
                        {{ article.title }}
                    </li>
                </ul>
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
            article:[],
            all:[],
            edit:null,
            typename:'全部',
            errorbox:[]
        }
    },
    methods:{
        read(index){
            this.typename=this.type[index].name
            this.edit='1'
            axios.get('/apis/api/blog/category/'+this.type[index].category_id+'/article')
            .then((res)=>{
                this.article=res.data.data
            }).catch((err)=>{
                console.log(err)
            })
        },
        deletehandler(index){
                alert(`確定刪除 ${this.article[index].title}`)
                axios.delete('/apis/api/blog/article/'+ this.article[index].article_id)
                .then((res)=>{
                    if(res.data.status === 'E00002'){
                        this.errorbox=res.data.value
                        alert(`${this.errorbox}`)
                    }else if(res.data.status === '000000'){
                        alert(`刪除成功`)
                        location.reload()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
        },
        deletehandlerall(index){
                alert(`確定刪除 ${this.article[index].title}`)
                axios.delete('/apis/api/blog/article/'+ this.all[index].article_id)
                .then((res)=>{
                    if(res.data.status === 'E00002'){
                        alert(`res.data.value`)
                    }else if(res.data.status === '000000'){
                        alert(`刪除成功`)
                        location.reload()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
        },
        allarticle(){
            this.typename='全部'
            this.edit=null
        },
        patchhandler(index){
            window.location.href='/deletearticle/'+this.article[index].article_id
        },
        patchhandlerall(index){
            window.location.href='/deletearticle/'+this.all[index].article_id
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
        axios.get('/apis/api/blog/article')
        .then((res)=>{
            this.all=res.data.value
            // console.log(res)
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
.typename{
    font-size: 25px;
    font-weight: bold;
    text-align: left;
}
.articlelist{
    list-style: none;
    border-bottom: 1px dashed gray;
    margin: 15px;
    padding: 0px 0px 10px 0px;
    text-align: left;
    font-size: 18px;
}

.delete{
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
.delete:active{
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