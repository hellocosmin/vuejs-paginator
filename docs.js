Vue.component('story', {
  template: '#template-story-raw',
  props: ['story']
})

var vm = new Vue({
  el: '#wrapper',
  components: {
    VPaginator: VuePaginator
  },
  data: {
    animals: [],
    animal: {},
    characters: [],
    char: {},
    options: {}
  },
  methods: {
    updateAnimals (data) {
      this.animals = data
    },
    updateChars (data) {
      this.characters = data
    }
  }
})
