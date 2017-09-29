webpackJsonp([1],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Index__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MyFeed__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MyFeed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_MyFeed__);



// Vue Components



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{ path: '/', name: 'Index', component: __WEBPACK_IMPORTED_MODULE_2__components_Index___default.a }, { path: '/myfeed', name: 'My Feed', component: __WEBPACK_IMPORTED_MODULE_3__components_MyFeed___default.a }]
}));

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(58),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pouchdb__ = __webpack_require__(48);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const name = 'chetan';
const pouchdb = new __WEBPACK_IMPORTED_MODULE_2_pouchdb__["a" /* default */]('rssrdr');

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'index',
  data() {
    return {
      title: 'rssrdr',
      urls: [],
      feed_url: '',
      selected: '',
      selectedFeed: {},
      feedDataFlag: true,
      showLoader: false,
      isActive: false
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed

    this.fetchData();
  },
  methods: {
    fetchData() {
      const self = this;

      pouchdb.get(name).then(function (doc) {
        self.urls = doc.urls;
      }).catch(function (err) {
        if (err.status === 404) {
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
    sync() {
      const self = this;
      let p_urls = [];

      var regex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
      if (!regex.test(self.feed_url)) {
        this.$notify({
          group: 'notifications',
          text: 'Please enter a valid url!',
          type: 'error'
        });
        return;
      }

      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url=' + self.feed_url).then(response => {
        const feed_data = response.data;
        pouchdb.get(name).then(function (doc) {
          if (doc.urls && doc.urls.length > 0) {
            p_urls = doc.urls;
          }
          p_urls.push({ 'name': feed_data.title, 'url': self.feed_url });
          self.feed_url = '';

          return pouchdb.put({
            _id: name,
            _rev: doc._rev,
            urls: p_urls
          });
        }).then(function (doc) {
          self.fetchData();
        }).catch(function (err) {
          console.log(err);
        });
      }).catch(e => {
        console.error(e);
      });
    },
    fetchFeed(url) {
      this.selectedFeed = {};
      this.showLoader = this.feedDataFlag = true;

      //
      __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('https://rssrdr-express-eoluokedqs.now.sh/getFeedData?url=' + url).then(response => {
        if (response && response.data) {
          this.feedDataFlag = this.showLoader = false;
          this.selectedFeed = response.data;
        }
      }).catch(e => {
        this.$notify({
          group: 'notifications',
          text: 'Something went wrong!',
          type: 'error'
        });

        console.log(e);
      });
    },
    selectFeed() {
      let slctd = '',
          u_slctd = this.selected;
      if (u_slctd) {
        slctd = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.find(this.urls, function (url) {
          return url.name == u_slctd;
        });
        this.fetchFeed(slctd.url);
      }
    },
    _collapse() {
      this.isActive = !this.isActive;
    }
  }
});

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'myfeed',
  data() {
    return {
      title: 'RSSRDR'
    };
  },
  methods: {
    sync: function () {
      alert('Syncing..');
    }
  }
});

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_notification__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_notification__);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Main Stuff




// Other Stuff


// Extra Other Stuff
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_vue_notification___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(59),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2bcac30e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(43)
}
var Component = __webpack_require__(4)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(60),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-33ad12de",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view'), _vm._v(" "), _c('notifications', {
    attrs: {
      "group": "notifications"
    }
  })], 1)
},staticRenderFns: []}

/***/ }),

/***/ 59:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container flex-stretch"
  }, [_c('div', {
    staticClass: "feed-content",
    class: {
      'collapse': _vm.isActive
    }
  }, [_c('span', {
    ref: "collapse",
    staticClass: "chevron-arrow hidden",
    on: {
      "click": _vm._collapse
    }
  }), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
    staticClass: "label label-default underline"
  }, [_vm._v("Your favourite rss feed reader")]), _vm._v(" "), _c('br'), _c('br'), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.feed_url),
      expression: "feed_url"
    }],
    staticClass: "add-url-input pull-left",
    attrs: {
      "type": "text",
      "placeholder": "Enter feed url"
    },
    domProps: {
      "value": (_vm.feed_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.feed_url = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "btn add-url",
    on: {
      "click": _vm.sync
    }
  }, [_vm._v("Feed")]), _vm._v(" "), _c('br'), _c('br'), _vm._v(" "), _vm._l((_vm.urls), function(feed, index) {
    return _c('div', {
      staticClass: "feed"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.selected),
        expression: "selected"
      }],
      attrs: {
        "type": "radio",
        "id": index,
        "name": "feed"
      },
      domProps: {
        "value": feed.name,
        "checked": _vm._q(_vm.selected, feed.name)
      },
      on: {
        "click": _vm.selectFeed,
        "__c": function($event) {
          _vm.selected = feed.name
        }
      }
    }), _vm._v(" "), _c('label', {
      attrs: {
        "for": index
      }
    }, [_vm._v(_vm._s(feed.name))])])
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "feed-container",
    class: {
      'flex-center': _vm.feedDataFlag
    }
  }, [_c('div', {
    staticClass: "preloader-wrapper small active",
    class: {
      'hidden': !_vm.showLoader
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('h4', [_vm._v(_vm._s(_vm.selectedFeed.title))]), _vm._v(" "), _c('ol', {
    staticClass: "selected-feed"
  }, _vm._l((_vm.selectedFeed.entries), function(entry) {
    return _c('li', [_c('a', {
      attrs: {
        "target": "_blank",
        "href": entry.link
      }
    }, [_vm._v(_vm._s(entry.title))]), _vm._v(" "), (entry.creator) ? _c('span', [_vm._v(" by " + _vm._s(entry.creator))]) : _vm._e(), _vm._v(" "), _c('div', {
      domProps: {
        "innerHTML": _vm._s(entry.content)
      }
    })])
  }))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "spinner-layer spinner-green-only"
  }, [_c('div', {
    staticClass: "circle-clipper left"
  }, [_c('div', {
    staticClass: "circle"
  })]), _c('div', {
    staticClass: "gap-patch"
  }, [_c('div', {
    staticClass: "circle"
  })]), _c('div', {
    staticClass: "circle-clipper right"
  }, [_c('div', {
    staticClass: "circle"
  })])])
}]}

/***/ }),

/***/ 60:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-feed"
  }, [_c('ul', [_c('li', [_vm._v("Feed 1")]), _vm._v(" "), _c('li', [_vm._v("Feed 2")])])])
}]}

/***/ })

},[39]);
//# sourceMappingURL=app.27bdbec0f5a768b1df0c.js.map