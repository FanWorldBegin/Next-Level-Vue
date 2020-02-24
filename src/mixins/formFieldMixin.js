export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    value: [String, Number]
  },
  methods: {
    updateValue(event) {
      // 组件上的v-mode会监听 input 事件
      this.$emit('input', event.target.value)

      //<BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="file"></BaseInput>
      //:value="event.value"
      //@input="value => {event.title = value}"
    }
  }
}
