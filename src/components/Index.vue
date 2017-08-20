<template>
  <div class="container">
    <div class="pull-left">
      <h1>{{ title }}</h1>

      <input type="text" class="add-url-input pull-left" placeholder="Enter feed url" v-model="feed_url">
      <span class="btn add-url pull-left" v-on:click="sync">Feed</span>

      <br><br>
      <div class="feed" v-for="(feed, index) in urls">
        <input type="radio" v-on:click="selectFeed" :id="index" v-model="selected" name="feed" :value="feed.name">
        <label :for="index">{{ feed.name }}</label>
      </div>
    </div>
    <div class="feed-container pull-left">
      <h3>{{selectedFeed.title}}</h3>
      <ol class="selected-feed">
        <li v-for="entry in selectedFeed.entries">
          <a target="_blank" :href="entry.link">{{entry.title}}</a>
        </li>
      </ol>
    </div>
    <!-- <router-link to="/myfeed">My Feed</router-link> -->
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import PouchDB from 'pouchdb';

const name = 'chetan';
const pouchdb = new PouchDB('rssrdr');

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

    this.fetchData();
  },
  methods: {
    fetchData () {
      const self = this;

      pouchdb.get(name).then(function (doc) {
        self.urls = doc.urls;
      }).catch(function (err) {
        if(err.status === 404) {
          pouchdb.put({
            _id: name,
            urls: []
          }).then(function (response) {
            console.log(response);
          }).catch(function (err) {
            console.log(err);
          });
        }
      });
    },
    sync () {
      const self = this
      let p_urls = [];

      axios.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url='+self.feed_url)
      .then(response => {
        const feed_data = response.data;
        pouchdb.get(name)
        .then(function (doc) {

          if(doc.urls.length > 0) {
            p_urls = doc.urls;
          }
          p_urls.push({'name': feed_data.title, 'url': self.feed_url});
          self.feed_url = '';

          return pouchdb.put({
            _id: name,
            _rev: doc._rev,
            urls: p_urls
          });
        })
        .then(function(doc) {
          self.fetchData();
        })
        .catch(function (err) {
          console.log(err);
        });
      })
      .catch(e => {
        console.error(e);
      });
    },
    fetchFeed (url) {
      axios.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url='+url)
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
  color: #2994B2;
}

.pull-left {
    float: left;
}

.feed {
  text-align: left;
}

.add-url-input {
  width: 200px;
  height: 30px;
  border: 2px solid #12CC94;
  font-size: 16px;
  padding-left: 5px;
}

.btn {
  background-color: #12CC94;
  border: none;
  color: white;
  padding: 7px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
