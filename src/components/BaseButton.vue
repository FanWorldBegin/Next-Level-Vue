<template>
	<div>
		<button v-on="$listeners" class="button" :class="buttonClass" v-bind="$attrs"><slot></slot></button>
		<!-- <button v-on="$listeners" class="button" v-bind="$attrs"><slot></slot></button> vue 2 class 无法继承-->
	</div>
</template>
<script>
export default {
	props: {
		buttonClass: {
			type: String
		}
	}
}
</script>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		height: 52px;
		padding: 0 40px;
		background: transparent;
		border: none;
		border-radius: 6px;
		text-align: center;
		font-weight: 600;
		white-space: nowrap;
		transition: all 0.2s linear;
	}
	.button:hover {
		-webkit-transform: scale(1.02);
		transform: scale(1.02);
		box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
	.button:active {
		-webkit-transform: scale(1);
		transform: scale(1);
		box-shadow: none;
	}
	.button:focus {
		outline: 0;
	}

	.button.-fill-gradient {
		background: linear-gradient(to right, #16c0b0, #84cf6a);
		color: #ffffff;
	}
</style>
