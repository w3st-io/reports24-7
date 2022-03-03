<template>
	<div class="nav-spacer">
		<BContainer class="my-5">
			<BRow v-if="!loading && organization">
				<BCol cols="12" sm="8">
					<BCard no-body class="w-100 mb-4 shadow">
						<BCardBody>
							<h3 class="card-title text-center text-primary">
								{{ organization.name }}
							</h3>
							<h5 class="card-text">{{ organization.url }}</h5>
							<h5 class="card-text">{{ organization.email }}</h5>
							<h5 class="text-dark">
								{{ organization.address.street }}
								{{ organization.address.unit }}
								{{ organization.address.city }},
								{{ organization.address.state }}
								{{ organization.address.zip }}
								{{ organization.address.country }}
							</h5>
						</BCardBody>

						<div class="card-img-bottom" style="max-height: 600px; overflow: hidden;">
							<img :src="organization.logo_url" class="card-img-bottom">
						</div>
					</BCard>
				</BCol>

				<BCol cols="12" sm="4">
					<BCard class="w-100 shadow">
						<BButton
							variant="primary"
							class="w-100 mb-3"
							@click="dashboardRedirect()"
						>Dashboard</BButton>

						<BButton
							variant="secondary"
							class="w-100"
						>Edit Organization</BButton>
					</BCard>
				</BCol>
			</BRow>

			<BRow v-if="loading == true">
				<BCol cols="12">
					<h1 class="text-primary">Loading..</h1>
				</BCol>
			</BRow>
			
			<BRow v-if="error">
				<BCol cols="12">
					<h4 class="text-danger">{{ error }}</h4>
				</BCol>
			</BRow>
		</BContainer>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import router from '@/router'
	import PageService from '@/services/PageService'

	export default {
		data() {
			return {
				organization: {},
				reqData: {},
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_manager()

				if (this.reqData.status) {
					this.organization = this.reqData.organization

					if (!this.reqData.organization) {
						router.push({ name: 'manager_organization_create' })
					}
					else {
						if (this.$store.state.node_env == 'production')
						router.push({
							name: 'manager_dashboard',
							params: {
								organization_id: this.organization._id,
							}
						})
					}
				}
				else { this.error = this.reqData.message }
			},

			dashboardRedirect() {
				router.push({
					name: 'manager_dashboard',
					params: {
						organization_id: this.organization._id,
					}
				})
			}
		},

		async created() {
			if (!localStorage.managertoken) {
				router.push({ name: 'manager_login' })
			}

			await this.getPageData()

			this.loading = false
		},
	}
</script>