<template>
  <div class="hello">
    <h1>{{ title }}</h1>

    <input type="text" placeholder="Enter feed url" v-model="feed_url">
    <button type="button" v-on:click="sync" name="button">Sync!</button>
    <br><br>
    <router-link to="/myfeed">My Feed</router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'index',
  data () {
    return {
      title: 'RSSRDR',
      feed_url: ''
    }
  },
  methods: {
    sync: function () {
      axios.post('http://express.rssrdr.net:4000/saveFeed/?url='+this.feed_url)
      .then(response => {
        console.log(response.data);
        this.feed_url = '';
      })
      .catch(e => {
        console.error(e);
      });
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
