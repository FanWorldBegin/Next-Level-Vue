<template>
	<div>
		<label v-if="label">{{ label }}</label>
		<select v-bind="$attrs" :value="value" @change="updateValue" v-on="$listeners">
			<option
				v-for="option in options" 
				:key="option"
				:selected="option === value"
				>{{ option }}</option>
		</select>
	</div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
	inheritAttrs: false, // 不继承外部定义属性
	mixins: [formFieldMixin],
	props: {
		options: {
			type: Array,
			required: true
		}
	},
	mounted() {
		console.log()
	},
	// methods: {
	// 	updateValue(event) {
	// 		// 组件上的v-mode会监听 input 事件
	// 		this.$emit('input', event.target.value)

	// 		//<BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="file"></BaseInput>
	// 		//:value="event.value"
	// 		//@input="value => {event.title = value}"
	// 	}
	// }
}
</script>

<style scoped>

</style>