(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VuePaginator"] = factory();
	else
		root["VuePaginator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _VPaginator = __webpack_require__(2);

	var _VPaginator2 = _interopRequireDefault(_VPaginator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _VPaginator2.default;

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3)

	if (module.exports.__esModule) module.exports = module.exports.default
	;(typeof module.exports === "function" ? module.exports.options : module.exports).template = __webpack_require__(5)
	if (false) {
	(function () {
	var hotAPI = require("vue-hot-reload-api")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = "-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./VPaginator.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./VPaginator.vue","-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./VPaginator.vue"], function () {
	var newOptions = require("-!babel!./../node_modules/vue-loader/lib/selector.js?type=script&index=0!./VPaginator.vue")
	if (newOptions && newOptions.__esModule) newOptions = newOptions.default
	var newTemplate = require("-!vue-html-loader!./../node_modules/vue-loader/lib/selector.js?type=template&index=0!./VPaginator.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(4);

	exports.default = {
	  props: {
	    page_numbers: {
	      type: Boolean,
	      required: false,
	      default: false
	    },
	    resource_url: {
	      type: String,
	      required: true
	    },
	    custom_template: '',
	    options: {
	      type: Object,
	      required: false,
	      default: function _default() {
	        return {};
	      }
	    }
	  },
	  data: function data() {
	    return {
	      current_page: '',
	      last_page: '',
	      next_page_url: '',
	      prev_page_url: '',
	      config: {
	        remote_data: 'data',
	        remote_current_page: 'current_page',
	        remote_last_page: 'last_page',
	        remote_next_page_url: 'next_page_url',
	        remote_prev_page_url: 'prev_page_url',
	        previous_button_icon: this.page_numbers ? 'glyphicon glyphicon-chevron-left' : '',
	        previous_button_text: this.page_numbers ? '' : 'Previous',
	        next_button_icon: this.page_numbers ? 'glyphicon glyphicon-chevron-right' : '',
	        next_button_text: this.page_numbers ? '' : 'Next'
	      }
	    };
	  },

	  computed: {
	    pages: function pages() {
	      if (this.page_numbers) {
	        return _utils.utils.createPageNumbers(this.resource_url, this.last_page);
	      }
	      return {};
	    }
	  },
	  methods: {
	    fetchData: function fetchData(pageUrl) {
	      pageUrl = pageUrl || this.resource_url;
	      var self = this;
	      this.$http.get(pageUrl, { headers: this.config.headers }).then(function (response) {
	        self.handleResponseData(response.data);
	      }).catch(function (response) {
	        console.log('Fetching data failed.', response);
	      });
	    },
	    handleResponseData: function handleResponseData(response) {
	      this.makePagination(response);
	      var data = _utils.utils.getNestedValue(response, this.config.remote_data);
	      this.$emit('update', data);
	    },
	    makePagination: function makePagination(data) {
	      this.current_page = _utils.utils.getNestedValue(data, this.config.remote_current_page);
	      this.last_page = _utils.utils.getNestedValue(data, this.config.remote_last_page);
	      this.next_page_url = this.current_page === this.last_page ? null : _utils.utils.getNestedValue(data, this.config.remote_next_page_url);
	      this.prev_page_url = this.current_page === 1 ? null : _utils.utils.getNestedValue(data, this.config.remote_prev_page_url);
	    },
	    initConfig: function initConfig() {
	      this.config = _utils.utils.mergeObjects(this.config, this.options);
	    }
	  },
	  watch: {
	    resource_url: function resource_url() {
	      this.fetchData();
	    }
	  },
	  created: function created() {
	    this.initConfig();
	    this.fetchData();
	  }
	};
	// </script>
	// <template>
	//   <div class="v-paginator">
	//     <button class="btn btn-default" @click="fetchData(prev_page_url)" :disabled="!prev_page_url">
	//       <span v-if="config.previous_button_icon && !page_numbers || !config.previous_button_text" :class="config.previous_button_icon"></span>
	//       <span v-else>{{config.previous_button_text}}</span>
	//     </button>
	//     <span v-if="page_numbers">
	//       <div class="btn-group" role="group">
	//         <button
	//           v-for="page in pages" @click="fetchData(page.url)"
	//           class="btn btn-default" :class="{'btn-primary': current_page==page.value}">
	//           {{page.value}}
	//         </button>
	//       </div>
	//     </span>
	//     <span v-else>Page {{current_page}} of {{last_page}}</span>
	//     <button class="btn btn-default" @click="fetchData(next_page_url)" :disabled="!next_page_url">
	//       <span v-if="config.next_button_icon && !page_numbers || !config.next_button_text" :class="config.next_button_icon"></span>
	//       <span v-else>{{config.next_button_text}}</span>
	//     </button>
	//   </div>
	// </template>

	// <script>

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var mergeObjects = function mergeObjects(obj1, obj2) {
	  var obj3 = {};
	  for (var attrname in obj1) {
	    obj3[attrname] = obj1[attrname];
	  }
	  for (var _attrname in obj2) {
	    obj3[_attrname] = obj2[_attrname];
	  }
	  return obj3;
	};

	var getNestedValue = function getNestedValue(obj, path) {
	  var originalPath = path;
	  path = path.split('.');
	  var res = obj;
	  for (var i = 0; i < path.length; i++) {
	    res = res[path[i]];
	  }
	  if (typeof res === 'undefined') console.log('[VuePaginator] Response doesn\'t contain key ' + originalPath + '!');
	  return res;
	};

	var createPageNumbers = function createPageNumbers(resourceUrl, lastPage) {
	  var ext = resourceUrl.match(/\.\D*$/) ? resourceUrl.match(/\.\D*$/)[0] : '';
	  var rootUrl = resourceUrl.replace(new RegExp(ext + '$'), '').replace(/\d*$/, '');
	  var allPages = {};
	  for (var p = 1; p <= lastPage; p++) {
	    allPages['page' + p] = { value: p, url: '' + rootUrl + p + ext };
	  }
	  return allPages;
	};

	var utils = exports.utils = { mergeObjects: mergeObjects, getNestedValue: getNestedValue, createPageNumbers: createPageNumbers };

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"v-paginator\">\n    <button class=\"btn btn-default\" @click=\"fetchData(prev_page_url)\" :disabled=\"!prev_page_url\">\n      <span v-if=\"config.previous_button_icon && !page_numbers || !config.previous_button_text\" :class=\"config.previous_button_icon\"></span>\n      <span v-else>{{config.previous_button_text}}</span>\n    </button>\n    <span v-if=\"page_numbers\">\n      <div class=\"btn-group\" role=\"group\">\n        <button\n          v-for=\"page in pages\" @click=\"fetchData(page.url)\"\n          class=\"btn btn-default\" :class=\"{'btn-primary': current_page==page.value}\">\n          {{page.value}}\n        </button>\n      </div>\n    </span>\n    <span v-else>Page {{current_page}} of {{last_page}}</span>\n    <button class=\"btn btn-default\" @click=\"fetchData(next_page_url)\" :disabled=\"!next_page_url\">\n      <span v-if=\"config.next_button_icon && !page_numbers || !config.next_button_text\" :class=\"config.next_button_icon\"></span>\n      <span v-else>{{config.next_button_text}}</span>\n    </button>\n  </div>";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vuejs-paginator.js.map