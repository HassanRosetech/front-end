<template>
  <div class="color-image">
    <div class="image-select">
      <h5>Color :</h5>
      <ul class="image-section">
        <li :class="[{active:color.active}]" v-for="(color,index) in colors" :key="`color${index}`">
          <a href="javascript:void(0)" @click.prevent="toggleActive(color,index)">
            <img :src="color.image" class="img-fluid" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      colors:[
        {
          active:true,
          image:'/images/fashion/product/front/5.jpg'
        },
        {
          active:false,
          image:'/images/fashion/product/front/6.jpg'
        },
        {
          active:false,
          image:'/images/fashion/product/front/7.jpg'
        },
      ]
    }
  },
  methods:{
    toggleActive(color,index){
      this.colors.forEach(item=>{
          item.active = false;
      });
      this.colors[index].active = true;
      
    }
  }
};
</script>