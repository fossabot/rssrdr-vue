webpackJsonp([1],{

/***/ 14:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Index__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Index__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MyFeed__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_MyFeed___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_MyFeed__);



// Vue Components



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{ path: '/', name: 'Index', component: __WEBPACK_IMPORTED_MODULE_2__components_Index___default.a }, { path: '/myfeed', name: 'My Feed', component: __WEBPACK_IMPORTED_MODULE_3__components_MyFeed___default.a }]
}));

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(40)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(57),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_pouchdb__ = __webpack_require__(47);
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
      showLoader: false
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
    }
  }
});

/***/ }),

/***/ 37:
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
  name: 'index',
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

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(14);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 41:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(41)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(36),
  /* template */
  __webpack_require__(58),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2bcac30e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var Component = __webpack_require__(3)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(59),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-33ad12de",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 57:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container flex-stretch"
  }, [_c('div', {
    staticClass: "feed-content"
  }, [_c('h3', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('span', {
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
  }, [_vm._m(0)]), _vm._v(" "), _c('h3', [_vm._v(_vm._s(_vm.selectedFeed.title))]), _vm._v(" "), _c('ol', {
    staticClass: "selected-feed"
  }, _vm._l((_vm.selectedFeed.entries), function(entry) {
    return _c('li', [_c('a', {
      attrs: {
        "target": "_blank",
        "href": entry.link
      }
    }, [_vm._v(_vm._s(entry.title))])])
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

/***/ 59:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my-feed"
  }, [_c('ul', [_c('li', [_vm._v("Feed 1")]), _vm._v(" "), _c('li', [_vm._v("Feed 2")])])])
}]}

/***/ })

},[38]);
//# sourceMappingURL=app.96f3242c784398191d89.js.map