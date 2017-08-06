<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <input type="text" placeholder="Enter feed url" v-model="feed_url">
    <button type="button" v-on:click="sync" name="button">Sync!</button>
    <br><br>
    <div class="feed" v-for="feed in urls">
      <input type="radio" v-on:click="selectFeed" v-model="selected" name="feed" :value="feed.name"> {{ feed.name }}
    </div>
    <div class="feed-container">
      <h3>{{selectedFeed.title}}</h3>
      <ol class="selected-feed">
        <li v-for="entry in selectedFeed.entries">
          <a target="_blank" :href="entry.link">{{entry.title}}</a>
          <div>{{entry.content}}</div>
        </li>
      </ol>
    </div>
    <!-- <router-link to="/myfeed">My Feed</router-link> -->
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';


export default {
  name: 'index',
  data () {
    return {
      title: 'RSSRDR',
      urls: [],
      feed_url: '',
      selected: '',
      selectedFeed: {}
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
    // this.fetchFeed('https://nodesource.com/blog/rss')
  },
  methods: {
    fetchData () {
      axios.get('http://express.rssrdr.net:4000/getSavedLinks/?id=5983c64cfee97317acef37ef')
      .then(response => {
        if(response && response.data) {
          this.urls = response.data.urls;
        }
      })
      .catch(e => {
        console.error(e);
      });
    },
    sync () {
      axios.post('http://express.rssrdr.net:4000/saveRSSLink/?url='+this.feed_url)
      .then(response => {
        this.feed_url = '';
      })
      .catch(e => {
        console.error(e);
      });
    },
    fetchFeed (url) {
      axios.get('http://express.rssrdr.net:4000/getFeedData/?url='+url)
      .then(response => {
        if(response && response.data) {
          this.selectedFeed = response.data;
        }
      })
      .catch(e => {
        console.log(e);
      });
    },
    selectFeed () {
      let slctd = '',
          u_slctd = this.selected;
      if(u_slctd) {
        slctd = _.find(this.urls, function(url){ return url.name == u_slctd});
        this.fetchFeed(slctd.url);
      }
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
  margin: 0 10px;
}

.selected-feed li {
  text-align: left;
}

a {
  color: #42b983;
}

.feed {
  text-align: center;
}
</style>
