<template>
  <div :class="['v-paginator', config.style]">
    <button class="vpag-btn vpag-btn-default" @click="fetchData(prev_page_url)" :disabled="!prev_page_url">
      <span v-if="config.page_numbers && !options.previous_button_text || options.previous_button_icon" :class="config.previous_button_icon"></span>
      <span v-else>{{config.previous_button_text}}</span>
    </button>
    <span v-if="config.page_numbers">
      <div class="vpag-btn-group" role="group">
        <button
          v-for="page in last_page" @click="current_page!=page ? fetchData(rootUrl + page + ext) : ''"
          class="vpag-btn vpag-btn-default" :class="{'vpag-btn-sel': current_page==page}">
          {{page}}
        </button>
      </div>
    </span>
    <span v-else>Page {{current_page}} of {{last_page}}</span>
    <button class="vpag-btn vpag-btn-default" @click="fetchData(next_page_url)" :disabled="!next_page_url">
      <span v-if="config.page_numbers && !options.next_button_text || options.next_button_icon" :class="config.next_button_icon"></span>
      <span v-else>{{config.next_button_text}}</span>
    </button>
  </div>
</template>

<script>
import {utils} from './utils'
export default {
  props: {
    resource_url: { type: String, required: true },
    options: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      current_page: '',
      last_page: '',
      config: {
          remote_data: 'data',
          remote_current_page: 'current_page',
          remote_last_page: 'last_page',
          previous_button_icon: 'fa fa-chevron-left',
          previous_button_text: 'Previous',
          next_button_icon: 'fa fa-chevron-right',
          next_button_text: 'Next',
          page_numbers: false,
          style: 'nostyle'
      }
    }
  },
  computed: {
    ext: function () {
      return this.resource_url.match(/\.\D*$/) ? this.resource_url.match(/\.\D*$/)[0] : ''
    },
    rootUrl: function () {
      return this.resource_url.replace(new RegExp(`${this.ext}$`), '').replace(/\d*$/, '')
    },
    next_page_url: function () {
      return this.current_page == this.last_page ? null : this.rootUrl + (this.current_page + 1) + this.ext
    },
    prev_page_url: function () {
      return this.current_page == 1 ? null : this.rootUrl + (this.current_page - 1) + this.ext
    }
  },
  methods: {
    fetchData (pageUrl) {
      pageUrl = pageUrl || this.resource_url
      var self = this
      this.$http.get(pageUrl, { headers: this.config.headers })
      .then(function (response) {
        self.handleResponseData(response.data)
      }).catch(function (response) {
        console.log('Fetching data failed.', response)
      })
    },
    handleResponseData (response) {
      this.makePagination(response)
      let data = utils.getNestedValue(response, this.config.remote_data)
      this.$emit('update', data)
    },
    makePagination (data) {
      this.current_page = utils.getNestedValue(data, this.config.remote_current_page)
      this.last_page = utils.getNestedValue(data, this.config.remote_last_page)
    },
    initConfig(){
      this.config = utils.mergeObjects(this.config, this.options)
    }
  },
  watch : {
    resource_url () {
      this.fetchData()
    }
  },
  created () {
    this.initConfig()
    this.fetchData()
  }
}
</script>

<style scoped>
  .vpag-btn-group {
    display: inline-block;
  }

  .bootstrap button {
    font-family: inherit;
    -webkit-appearance: button;
    text-transform: none;
    overflow: visible;
    margin: 0;
    font: inherit;
  }
  .bootstrap .vpag-btn {
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }
  .bootstrap .vpag-btn.focus,
  .bootstrap .vpag-btn:focus,
  .bootstrap .vpag-btn:hover {
    color: #333;
    text-decoration: none;
  }
  .bootstrap .vpag-btn.active,
  .bootstrap .vpag-btn:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
    box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
  }
  .bootstrap .vpag-btn.active.focus,
  .bootstrap .vpag-btn.active:focus,
  .bootstrap .vpag-btn.focus,
  .bootstrap .vpag-btn:active.focus,
  .bootstrap .vpag-btn:active:focus,
  .bootstrap .vpag-btn:focus {
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .bootstrap .vpag-btn.disabled,
  .bootstrap .vpag-btn[disabled] {
    cursor: not-allowed;
    filter: alpha(opacity=65);
    -webkit-box-shadow: none;
    box-shadow: none;
    opacity: .65;
  }

  .bootstrap .vpag-btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
  }
  .bootstrap .vpag-btn-default:hover {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }
  .bootstrap .vpag-btn-default.focus,
  .bootstrap .vpag-btn-default:focus {
    color: #333;
    background-color: #e6e6e6;
    border-color: #8c8c8c;
  }
  .bootstrap .vpag-btn-default.active,
  .bootstrap .vpag-btn-default:active {
    color: #333;
    background-color: #e6e6e6;
    border-color: #adadad;
  }

  .bootstrap .vpag-btn-sel {
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  }
  .bootstrap .vpag-btn-sel:hover {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
  }
  .bootstrap .vpag-btn-sel.focus,
  .bootstrap .vpag-btn-sel:focus {
    color: #fff;
    background-color: #286090;
    border-color: #122b40;
  }
  .bootstrap .vpag-btn-sel.active,
  .bootstrap .vpag-btn-sel:active {
    color: #fff;
    background-color: #286090;
    border-color: #204d74;
  }

  .bootstrap .vpag-btn-group {
    vertical-align: middle;
  }
  .bootstrap .vpag-btn-group>.vpag-btn:not(:first-child):not(:last-child){
    border-radius: 0;
  }
  .bootstrap .vpag-btn-group .vpag-btn+.vpag-btn,
  .bootstrap .vpag-btn-group .vpag-btn+.bootstrap .vpag-btn-group,
  .bootstrap .vpag-btn-group .bootstrap .vpag-btn-group+.vpag-btn,
  .bootstrap .vpag-btn-group .bootstrap .vpag-btn-group+.bootstrap .vpag-btn-group {
    margin-left: -1px;
  }
  .bootstrap .vpag-btn-group>.vpag-btn {
    position: relative;
    float: left;
  }
  .bootstrap .vpag-btn-group>.vpag-btn:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .bootstrap .vpag-btn-group>.vpag-btn:first-child {
    margin-left: 0;
  }
  .bootstrap .vpag-btn-group>.vpag-btn:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }


  .foundation button {
    background: transparent;
    color: inherit;
    font: inherit;
    margin: 0;
    overflow: visible;
    text-transform: none;
  }
  .foundation .vpag-btn {
    -webkit-transition: background-color .25s ease-out,color .25s ease-out;
    transition: background-color .25s ease-out, color .25s ease-out;
    text-align: center;
    line-height: 1;
    cursor: pointer;
    -webkit-appearance: none;
    vertical-align: middle;
    border-radius: 0;
    padding: 0.85em 1em;
    font-size: 0.9rem;
    border: 1px solid #777;
    color: #777;
  }
  [data-whatinput='mouse'] .foundation .vpag-btn {
    outline: 0;
  }
  .foundation .vpag-btn:hover,
  .foundation .vpag-btn:focus {
    border-color: #3c3c3c;
    color: #3c3c3c;
  }
  .foundation .vpag-btn.vpag-btn-sel {
    background-color: #2199e8;
    color: #fefefe;
  }
  .foundation .vpag-btn.vpag-btn-sel:hover,
  .foundation .vpag-btn.vpag-btn-sel:focus {
    background-color: #1583cc;
    color: #fefefe;
  }

  .foundation .vpag-btn.disabled,
  .foundation .vpag-btn[disabled] {
    opacity: 0.25;
    cursor: not-allowed;
  }
  .foundation .vpag-btn.disabled:hover,
  .foundation .vpag-btn.disabled:focus,
  .foundation .vpag-btn[disabled]:hover,
  .foundation .vpag-btn[disabled]:focus {
    background-color: #2199e8;
    color: #fefefe;
  }

  .foundation .vpag-btn-group{
    vertical-align: top;
  }
  .foundation .vpag-btn-group .vpag-btn {
    margin: 0;
    margin-right: 1px;
    margin-bottom: 1px;
    font-size: .9rem;
  }


  .nostyle .vpag-btn {
    background-color: transparent;
    border-color: #cfcfcf;
  }
  .nostyle .vpag-btn-sel {
    background-color: #2199e8;
  }

</style>