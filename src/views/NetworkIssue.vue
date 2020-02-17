<template>
	<div>
		<h1>Uh-Oh!</h1>
		<h3>It looks like you're experiencing some network issues</h3>
		<router-link :to="{ name: 'event-list' }">go back to home page</router-link>
	</div>
</template>
