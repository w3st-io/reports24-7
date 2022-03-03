<template>
	<BContainer class="my-5 nav-spacer">
		<BRow v-if="!loading && !error">
			<BCol cols="12" md="9" order="2" order-md="1">
				<BCard text-variant="dark" class="mb-3 shadow">
					<BRow class="mb-2">
						<BCol cols="12" md="8">
							<h2 class="text-primary">
								Your Inspection Assignments
							</h2>
						</BCol>

						<!-- Pagination -->
						<BCol cols="12" md="4" class="mb-3 text-center text-lg-right">
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

							<h6 class="d-none d-lg-block">
								Total Inspection Report Events:
								{{ pageData.totalInspectionReportAssignments }}
							</h6>

							<h6 class="d-none d-lg-block">
								Total Pages:
								{{ pageData.totalPages }}
							</h6>
						</BCol>
						
						<BCol cols="5">
							<h5 class="text-primary">Client</h5>
						</BCol>

						<BCol cols="4">
							<h5 class="text-primary">Due Date</h5>
						</BCol>

						<BCol cols="3">
							<h5 class="text-primary">Create Reports</h5>
						</BCol>
					</BRow>

					<BRow
						v-for="(iRE, i) in inspectionReportAssignments"
						:key="i"
						class="mb-2"
					>
						<BCol cols="5">
							<h5 class="text-dark">Name: {{ iRE.client.name }}</h5>
							<h5 class="text-dark">
								Address:
								{{ iRE.client.address.street }}
								{{ iRE.client.address.city }},
								{{ iRE.client.address.state }}
								{{ iRE.client.address.zip }}
							</h5>
						</BCol>

						<BCol cols="4">
							<h5 class="text-dark">
								{{ new Date(iRE.due_date).getMonth()
								}}/{{
									new Date(iRE.due_date).getDate()
								}}/{{
									new Date(iRE.due_date).getFullYear()
								}}
							</h5>
						</BCol>

						<BCol cols="3">
							<h5 class="text-dark">
								<RouterLink :to="`/user/inspection-report/create/-/${iRE._id}`">
									<BButton
										variant="primary"
										class="w-100"
									>+ Create</BButton>
								</RouterLink>
							</h5>
						</BCol>
						
						<BCol cols="12"><hr class="my-1"></BCol>
					</BRow>
				</BCard>
			</BCol>

			<!-- Side Content -->
			<BCol cols="12" md="3" order="1" order-md="2">
				<BCard text-variant="dark" class="mb-3 shadow">
					<h3 class="text-center">Other Actions</h3>
					<hr class="mb-4 border-primary">
					<RouterLink :to="`/user/inspection-report/read-all/${organization_id}/1/4/1`">
						<BButton
							variant="primary"
							class="w-100"
						>View All Created Reports</BButton>
					</RouterLink>
				</BCard>
			</BCol>
		</BRow>

		<!-- Loading -->
		<BRow v-if="loading">
			<BCol cols="12">
				<h1 class="text-center text-primary">Loading..</h1>
			</BCol>
		</BRow>

		<!-- Error -->
		<BRow v-if="error">
			<BCol cols="12">
				<h6 class="text-primary">{{ error }}</h6>
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
	import PageNavButtons from '@/components/controls/PageNavButtons'
	import router from '@/router'
	import PageService from '@/services/PageService'

	export default {
		components: {
			PageNavButtons,
		},
		
		data() {
			return {
				organization_id: this.$route.params.organization_id,
				sort: parseInt(this.$route.params.sort),
				limit: parseInt(this.$route.params.limit),
				page: parseInt(this.$route.params.page),
				reqData: {},
				pageData: {},
				inspectionReportAssignments: [],
				loading: true,
				error: '',
			}
		},

		methods: {
			refreshRoute() {
				router.push({
					name: 'user_dashboard',
					params: {
						sort: this.sort,
						limit: this.limit,
						page: this.page,
					}
				})
			},

			async getPageData() {
				this.reqData = await PageService.s_user_dashboard({
					organization_id: this.$route.params.organization_id, 
					sort: parseInt(this.$route.params.sort),
					limit: parseInt(this.$route.params.limit),
					page: parseInt(this.$route.params.page),
				})

				if (this.reqData.status) {
					this.inspectionReportAssignments = this.reqData.inspectionReportAssignments
					this.pageData = this.reqData
				}
				else { this.error = this.reqData.message }

				this.loading = false
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

<style lang="scss" scoped>
	.card-bg:hover { background-color: rgba(0, 0, 0, 0.25) !important; }
</style>