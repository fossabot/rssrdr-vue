<template>
  <div class="container flex-stretch">
    <div class="feed-content">
      <h3>{{ title }}</h3>
      <span class="label label-default underline">Your favourite rss feed reader</span>

      <br><br>
      <input type="text" class="add-url-input pull-left" placeholder="Enter feed url" v-model="feed_url">
      <span class="btn add-url" v-on:click="sync">Feed</span>

      <br><br>
      <div class="feed" v-for="(feed, index) in urls">
        <input type="radio" v-on:click="selectFeed" :id="index" v-model="selected" name="feed" :value="feed.name">
        <label :for="index">{{ feed.name }}</label>
      </div>
    </div>
    <div class="feed-container" v-bind:class="{ 'flex-center': feedDataFlag }">
      <div v-bind:class="{'hidden' : !showLoader }" class="preloader-wrapper small active">
        <div class="spinner-layer spinner-green-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>
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
      title: 'rssrdr',
      urls: [],
      feed_url: '',
      selected: '',
      selectedFeed: {},
      feedDataFlag: true,
      showLoader: false
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
      this.selectedFeed = {};
      this.showLoader = this.feedDataFlag = true;

      //
      axios.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url='+url)
      .then(response => {
        if(response && response.data) {
          this.feedDataFlag = this.showLoader = false;
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

.hidden {
  display: none;
}

.container {
  display: flex;
  align-items: stretch;
  height: 100%;
  width: 100%;
  margin: 0;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.feed {
  text-align: left;
}

.feed-content {
  width: 30%;
  border-right: 2px solid #12CC94;
  padding: 0 1em;
}

.feed-container {
  width: 70%;
}

.btn {
  background-color: #12CC94;
  font-size: 16px;
  cursor: pointer;
  font-weight: 500;
}
</style>
