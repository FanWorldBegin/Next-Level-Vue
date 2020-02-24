<template>
	<div>
		<label v-if="label">{{ label }}</label>
		<input 
			v-bind="$attrs" 
			:value="value" 
			@input="updateValue"
			v-on="listeners"			
		>
	</div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
	inheritAttrs: false, // 不继承外部定义属性
	mixins: [formFieldMixin],
	computed: {
		listeners() {
			return {
				...this.$listeners,
				input: this.updateValue
			}
		}
	}
}
</script>

<style scoped>

</style>