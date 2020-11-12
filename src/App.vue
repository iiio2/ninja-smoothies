<template>
  <div id="app">
      <h2 class="text-center mt-4">{{ msg }}</h2>
      <router-view></router-view>
  </div>
</template>

<script>
  
export default {
 
  data() {
    return {
      msg: "Ninja Smoothies!"
    };
  }
};
</script>

<style></style>
