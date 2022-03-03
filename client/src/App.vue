<template>
	<div id="app" :key="appKey" class="bg-light">
		<!-- UI -->
		<UI />

		<!-- Router -->
		<RouterView :key="$route.name + ($route.params.id || '')" />

		<!-- Bottom Footer -->
		<Footer />

		<!-- Socket -->
		<Socket />
	</div>
</template>

<script>
	// [IMPORT] //
	import vuex from 'vuex'

	// [IMPORT] Personal //
	import Footer from '@/components/UI/nav/Footer'
	import Socket from '@/components/socket'
	import UI from '@/components/UI'
	import { EventBus } from '@/main'
	import Service from '@/services'

	// [EXPORT] //
	export default {
		name: 'App',

		components: {
			Footer,
			Socket,
			UI,
		},

		data() {
			return {
				appKey: 0,
				reqData: {},
			}
		},

		methods: {
			// [VUEX] //
			...vuex.mapActions(['initializeOrganizationInvites']),

			forceRerender() { this.appKey++ },

			async setAppData() {
				try {
					this.reqData = await Service.index()

					if (this.reqData.status) {
						localStorage.setItem('node_env', this.reqData.node_env)
						this.$store.state.node_env = this.reqData.node_env
						this.$store.state.app_name = this.reqData.app_name
						this.$store.state.client_base_url = this.reqData.client_base_url
						this.$store.state.server_base_url = this.reqData.server_base_url
					}	
				}
				catch (err) { console.log(`App: Error --> ${err}`) }
			},

			log() {
				console.log('%%% [APP] %%%')
				console.log('usertoken:', localStorage.usertoken)
				console.log('admintoken:', localStorage.admintoken)
			}
		},

		async created() {
			this.forceRerender()

			await this.setAppData()
			
			EventBus.$on('force-rerender', () => { this.forceRerender() })

			// [LOG] //
			this.log()
		},

		async mounted() {
			// [VUEX] //
			this.initializeOrganizationInvites()
		},
	}
</script>

<style lang="scss" scoped>
	// [IMPORT] // Cuprum // Zilla Slab //
	@import url('https://fonts.googleapis.com/css2?family=Cuprum&display=swap');
	@import url('https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap');

	* { font-family: 'Cuprum', 'Zilla Slab', sans-serif !important; }

	h1, h2, h3, h4, h5, h6, button {
		font-family: 'Cuprum', 'Zilla Slab', sans-serif !important;
	}
</style>