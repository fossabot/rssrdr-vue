<template>
  <div id="app">
    <router-view></router-view>
    <notifications group="notifications" />
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #424651;
  height: 100%;
}
</style>
