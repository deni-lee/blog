<template>
<div>

  <button @click="aaa" >button</button>
  
</div>
</template>

<script>
import axios from 'axios'

export default {
  methods:{
    aaa(){
      axios.get('/apis/api/home/users')
      .then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
