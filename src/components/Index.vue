<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <button type="button" v-on:click="sync" name="button">Sync!</button>
    <br><br>
    <router-link to="/myfeed">My Feed</router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      title: 'RSSRDR'
    }
  },
  methods: {
    sync: function () {
      alert('Syncing..')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
