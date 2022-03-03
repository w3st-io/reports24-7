<template>
	<BContainer class="nav-spacer">
		<BCard bg-variant="none" class="my-5 shadow">
			<BRow>
				<BCol cols="12" md="8">
					<h3 class="text-primary">
						Assigned Inspection Reports
					</h3>
				</BCol>

				<BCol cols="12" md="4">
					<PageNavButtons
						bgVariant="white"
						:badgeValue="$route.params.page"
						@start-btn="pageControl('start')"
						@prev-btn="pageControl('prev')"
						@next-btn="pageControl('next')"
						@end-btn="pageControl('end')"
						class="ml-auto mb-3"
						style="max-width: 300px;"
					/>

					<h6 class="text-right">Page: {{ page }}</h6>
					<h6 class="text-right">Limit: {{ limit }}</h6>
				</BCol>

				<BCol cols="12">
					<BRow class="px-2">
						<BCol cols="3"><h4 class="text-primary">Inspector</h4></BCol>
						<BCol cols="7"><h4 class="text-primary">Client</h4></BCol>
						<BCol cols="2"><h4 class="text-primary">Due Date</h4></BCol>
					</BRow>

					<BRow v-for="(rE, i) in reportEvents" :key="i" class="mb-3 p-2 border">
						<BCol cols="3">
							<h6>Username: {{ rE.user.username }}</h6>
							<h6>Email: {{ rE.user.email }}</h6>
							<h6>
								Name:
								{{ rE.user.first_name }} {{ rE.user.last_name }}
							</h6>
						</BCol>

						<BCol cols="7">
							<h6>Client Name: {{ rE.client.name }}</h6>
							<h6>
								Address:
								{{ rE.client.address.street }},
								{{ rE.client.address.city }},
								{{ rE.client.address.state }}
								{{ rE.client.address.zip }}
							</h6>
							<h6>
								Client Representative:
								{{ rE.client.representative.first_name }}
								{{ rE.client.representative.last_name }}
							</h6>
						</BCol>

						<BCol cols="2">
							{{ new Date(rE.due_date).toLocaleString() }}
						</BCol>

						<BCol cols="12" class="border border-warning">
							<h6 v-if="$store.state.node_env == 'development'">
								{{ rE.client }}
							</h6>
						</BCol>
					</BRow>
				</BCol>
			</BRow>

			<BRow v-if="error">
				<BCol cols="12">
					<h6 class="text-danger">{{ error }}</h6>
				</BCol>
			</BRow>
		</BCard>
	</BContainer>
</template>

<script>
	import PageNavButtons from '@/components/controls/PageNavButtons'
	import PageService from '../../../services/PageService'

	export default {
		data() {
			const organization_id = this.$route.params.organization_id
			const sort = parseInt(this.$route.params.sort)
			const limit = parseInt(this.$route.params.limit)
			const page = parseInt(this.$route.params.page)

			return {
				organization_id: organization_id,
				sort: sort,
				limit: limit,
				page: page,
				reportEvents: [],
				reqData: {},
				pageData: {},
				loading: true,
				error: '',
			}
		},

		components: {
			PageNavButtons,
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_manager_inspectionReportAssignment_view({
					organization_id: this.organization_id,
					sort: this.sort,
					limit: this.limit,
					page: this.page,
				})

				if (this.reqData.status) {
					this.pageData - this.reqData
					this.reportEvents = this.reqData.reportEvents
				}
				else { this.error = this.reqData.message}
			},

			async pageControl(action) {
				switch (action) {
					case 'start':
						// As long as the page is not going into 0 or negative //
						if (this.page != 1) {
							this.loading = true
							this.page = 1
							
							this.refreshRoute()

							await this.getPageData()
						}
					break

					case 'prev':
						// As long as the page is not going into 0 or negative //
						if (this.page != 1) {
							this.loading = true
							this.page--
							
							this.refreshRoute()
							
							await this.getPageData()
						}
					break

					case 'next':
						// As long as page does not exceed max Number of Pages //
						if (this.page < this.pageData.totalPages) {
							this.loading = true
							this.page++

							this.refreshRoute()

							await this.getPageData()
						}
					break

					case 'end':
						if (this.page != this.pageData.totalPages) {
							this.loading = true
							this.page = this.pageData.totalPages

							this.refreshRoute()

							await this.getPageData()
						}
					break
				
					default:
					break
				}
			},
		},

		async created() {
			await this.getPageData()
		},
	}
</script>