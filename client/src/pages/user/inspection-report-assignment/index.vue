<template>
	<BContainer>
		{{ reqData }}
	</BContainer>
</template>

<script>
	export default {
		data() {
			return {
				reqData: {},
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = ''
			},
		},
	}
</script>