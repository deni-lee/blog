<template>
<div>
    <div class="header">
        <a href="/loging" class="rcorners">文章列表</a>
        <a href="/loging/article" class="rcorners">文章管理</a>
    </div>
    
    <div class="content">

        <div class="sidebar_left">
            <p><a href="/loging/article" class="new">新增文章</a> </p>
            <p><a href="/loging/deletearticle" class="new">文章編輯</a></p>
            <p><a href="/loging/newtype" class="now">新增分類</a> </p>
        </div>

        <div class="sidebar_right">

            <div>
                <input type="text" class="newtype" placeholder="新增分類" v-model= "input.name"> <br>
                <input type="text" class="newtype" placeholder="描述(沒有請填無)" v-model= "input.description">
                <button class="newbuttom" @click= "submit">新增</button>
                <button class="newbuttom" @click= "cancelHandler" >清空</button>
            </div>

            <ul v-for= "(item,index) in type" :key="index" value="index" >
                <li><span class="list">{{ item.name }}</span> 
                    <span class="update" @click= "edithandler(index)">修改</span>
                    <span class="update" @click= "deletehandler(index)">刪除</span>
                </li>
            </ul>

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
                name:'',
                description:''
            },
            editIndex:null
        }
    },
    methods:{
        submit(){
            if (this.editIndex === null){
                axios.post('/apis/api/blog/category', this.input)
                .then((res)=>{
                    if(res.data.status === 'E00001'){
                        alert("儲存失敗 : 字數需大於4於255")
                        this.cancelHandler()
                    }
                    else{
                        this.type.push(res.data.value)
                        this.cancelHandler()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }else{
                alert(`確定修改 ${this.type[this.editIndex].name} ?`)
                axios.patch('/apis/api/blog/category/'+this.type[this.editIndex].category_id,this.input)
                .then((res)=>{
                    if(res.data.status === 'E00001'){
                        alert("儲存失敗 : 字數需大於4於255")
                        this.cancelHandler()
                    }else{
                    alert('修改成功')
                    location.reload()
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        deletehandler(index){
            let result =confirm(`確定刪除 ${this.type[index].name} ?`)
            if(result){
                axios.delete('/apis/api/blog/category/'+this.type[index].category_id)
            .then((res)=>{
                alert('刪除成功')
                location.reload()
            }).catch((err)=>{
                console.log(err)
            })
            }else{
                return
            }
            
        },
        cancelHandler() {
            this.editIndex = null
            this.input.name = ''
            this.input.description = ''
        },
        edithandler(index) {
           this.editIndex = index
           this.input.name = this.type[index].name
           this.input.description = this.type[index].description
           $('html,body').animate({ scrollTop: 0 });
        },
        
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
    border: 2px solid #666666;
    margin: 20px;
    padding: 10px 20px 10px 20px;
    text-align: left;
    font-size: 20px;
}
.list{
    text-align: left;
    font-size: 20px;
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
.newtype{
    width: 200px;
    height: 40px;
    margin: 5px;
    border: double #666666;
    font-size: 15px;
}
.newtype::placeholder{
    padding: 5px;
}
.newbuttom{
    margin: 10px;
    z-index: 1;
    font-size: inherit;
    font-family: inherit;
    color: white;
    padding: 0.5em 1em;
    outline: none;
    border: none;
    background-color: #444444 ;}
.newbuttom:active{
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
.update{
    border-radius: 50%;
    background-color: #D3D3D3;
    color: #444444;
    text-align: center;
    float: right;
    font-size: 16px;
    padding: 5px 10px 5px 0px;;
}
</style>