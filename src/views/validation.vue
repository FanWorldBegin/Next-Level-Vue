<template>
	<form @submit.prevent="submit">
		<input type="email" placeholder="what's your email" 
			v-model="email"
			@blur="$v.email.$touch()"
			:class="{ error: $v.email.$error}"
		>
		<div v-if="$v.email.$error">
			<p v-if="!$v.email.email" class="errorMessage"> Please enter a vaild email</p>
			<p v-if="!$v.email.required" class="errorMessage"> email is required</p>
		</div>
		<button type="submit" :disabled="$v.$invalid">Submit</button>
		<p v-if="$v.$anyError" class="errorMessage">Please fill out the required fileds</p>
	</form>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
// npm i vuelidate
export default {
	data() {
		return {
			email: null
		}
	},
	validations: {
		email: {
			required,
			email,
		}
	},
	methods: {
		submit() {
			this.$v.touch()
			if(!this.$v.$invalid) {
				console.log('email submit')
			}
		}
	}
}
</script>

