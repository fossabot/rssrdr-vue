<template>
<v-app id="rssrdr" toolbar footer>
  <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher fixed class="pa-4">

    <!-- Add Feed URL -->
    <v-text-field name="feed_url" label="" placeholder="Enter feed url" v-model="feed_url"></v-text-field>

    <v-btn small primary dark class="app-green" v-on:click="sync">
      Feed
    </v-btn>

    <v-list two-line>
      <v-list-tile v-for="feed in urls" :key="feed.id" @click="selectFeed(feed.name)">
        <v-list-tile-content>
          <v-list-tile-title>{{feed.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

  </v-navigation-drawer>
  <v-toolbar class="app-green white-text" fixed>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}} - <small>Your favourite rss feed reader</small></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>favorite</v-icon>
    </v-btn>
  </v-toolbar>
  <main>
    <v-container fluid>
      <v-progress-circular indeterminate v-bind:width="3" v-bind:class="{'hidden' : !showLoader }" class="green--text center"></v-progress-circular>
      <h4>{{selectedFeed.title}}</h4>
      <v-list v-if="selectedFeed.entries" three-line class="pt-0">
        <template v-for="(entry, index) in selectedFeed.entries">
          <v-divider v-if="index"></v-divider>
          <v-list-tile @click="openUrl(entry.link)">
            <v-list-tile-content>
              <v-list-tile-title>{{entry.title}}</v-list-tile-title>
              <v-list-tile-sub-title>by {{entry.creator}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-container>
  </main>
  <v-footer class="app-green">
    <span class="white--text">© {{year()}}</span>
  </v-footer>
</v-app>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import PouchDB from 'pouchdb';

const name = 'chetan';
const pouchdb = new PouchDB('rssrdr');

export default {
  name: 'index',
  data() {
    return {
      drawer: true,
      title: 'rssrdr',
      urls: [],
      feed_url: '',
      selectedFeed: {},
      showLoader: false,
      year: function() {
        return new Date().getFullYear();
      }
    }
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed

    this.fetchData();
  },
  methods: {
    fetchData() {
      const self = this;

      pouchdb.get(name).then(function(doc) {
        self.urls = doc.urls;
      }).catch(function(err) {
        if (err.status === 404) {
          pouchdb.put({
            _id: name,
            urls: []
          }).then(function(response) {
            console.log(response);
          }).catch(function(err) {
            console.log(err);
          });
        }
      });
    },
    sync() {
      const self = this
      let p_urls = [];

      var regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      if (!regex.test(self.feed_url)) {
        this.$notify({
          group: 'notifications',
          text: 'Please enter a valid url!',
          type: 'error',
        });
        return;
      }

      axios.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url=' + self.feed_url)
        .then(response => {
          const feed_data = response.data;
          pouchdb.get(name)
            .then(function(doc) {
              if (doc.urls && doc.urls.length > 0) {
                p_urls = doc.urls;
              }
              p_urls.push({
                'name': feed_data.title,
                'url': self.feed_url
              });
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
            .catch(function(err) {
              console.log(err);
            });
        })
        .catch(e => {
          console.error(e);
        });
    },
    fetchFeed(url) {
      this.selectedFeed = {};
      this.showLoader = true;
      //
      axios.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url=' + url)
        .then(response => {
          if (response && response.data) {
            this.showLoader = false;
            this.selectedFeed = response.data;
          }
        })
        .catch(e => {
          this.$notify({
            group: 'notifications',
            text: 'Something went wrong!',
            type: 'error',
          });

          console.log(e);
        });
    },
    selectFeed(url) {
      let slctd = '',
        u_slctd = url;
      if (u_slctd) {
        slctd = _.find(this.urls, function(url) {
          return url.name == u_slctd
        });

        this.fetchFeed(slctd.url);
      }
    },
    openUrl(url) {
      console.log('we');
      window.open(url);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  li {
    text-align: left;
  }

  .center {
    right: 50%;
    bottom: 50%;
    transform: translate(50%,50%);
    position: absolute;
  }

  .hidden {
    display: none !important;
  }

  .app-green {
    background-color: #12cc94 !important;
  }

  .white-text {
    color: #fff;
  }
</style>
