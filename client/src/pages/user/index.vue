<template>
	<BContainer class="my-5 nav-spacer">
		<BRow v-if="!loading && !error">
			<BCol cols="12" md="8" class="mb-3">
				<BCard text-variant="dark" class="shadow">
					<BRow>
						<BCol cols="12">
							<h3 class="text-center text-dark">Inspector Dashboard</h3>
							<hr class="border-primary">	
						</BCol>

						<BCol cols="12" lg="8" class="mb-2">
							<h3 class="text-primary">Organizations</h3>
							<h5 class="text-secondary">
								Select organization you are working for.
							</h5>
						</BCol>

						<!-- Count -->
						<BCol cols="12" lg="4" class="mb-3 text-center text-lg-right">
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
								Total Organizations:
								{{ pageData.totalOrganizations }}
							</h6>

							<h6 class="d-none d-lg-block">
								Total Pages:
								{{ pageData.totalPages }}
							</h6>
						</BCol>

						<!-- List Organizations -->
						<BCol cols="12">
							<BRow>
								<BCol
									v-for="(oI, i) in organizationInvites"
									:key="i"
									cols="12"
									class="mb-3"
								>
									<BCard
										bg-variant="light"
										class="card-bg"
										@click="userDashboardRedirect(oI.organization._id)"
									>
										<BRow>
											<BCol cols="12" lg="6" xl="4">
												<img :src="oI.organization.logo_url" class="card-img-bottom">

											</BCol>
										
											<BCol cols="12" lg="6" xl="8">
												<h2>{{ oI.organization.name }}</h2>
												<h4>
													{{ oI.organization.address.street }}
													{{ oI.organization.address.city }},
													{{ oI.organization.address.state }},
													{{ oI.organization.address.zip }}
												</h4>

												<h5>
													{{ oI.organization.address.country }}
												</h5>
											</BCol>
										</BRow>
									</BCard>
								</BCol>
							</BRow>
						</BCol>
					</BRow>
				</BCard>
			</BCol>

			<BCol cols="12" md="4" class="mb-3">
				<BCard variant="none" class="shadow">
					<h3 class="mb-3 text-center text-secondary">Your Profile</h3>

					<RouterLink to="/user/profile">
						<BButton
							variant="primary"
							class="w-100 mb-3"
						>View Profile</BButton>
					</RouterLink>

					<RouterLink to="/user/profile/edit">
						<BButton
							variant="primary"
							class="w-100 mb-3"
						>Edit</BButton>
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
			<BCol cols="12" class="my-3">
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
				sort: parseInt(this.$route.params.sort),
				limit: parseInt(this.$route.params.limit),
				page: parseInt(this.$route.params.page),
				reqData: {},
				pageData: {},
				organizationInvites: [],
				loading: true,
				error: '',
			}
		},

		methods: {
			refreshRoute() {
				router.push({
					name: 'user',
					params: {
						sort: this.sort,
						limit: this.limit,
						page: this.page,
					}
				})
			},

			userDashboardRedirect(organization_id) {
				router.push({
					name: 'user_dashboard',
					params: {
						organization_id: organization_id,
						sort: 0,
						limit: 5,
						page: 1,
					}
				})
			},

			async getPageData() {
				this.reqData = await PageService.s_user({
					sort: parseInt(this.$route.params.sort),
					limit: parseInt(this.$route.params.limit),
					page: parseInt(this.$route.params.page),
				})

				if (this.reqData.status) {
					this.organizationInvites = this.reqData.organizationInvites
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
	.card-bg:hover {
		background-color: rgba(0, 0, 0, 0.10) !important;
		border: solid;
		border-width: 1px;
		border-color: rgb(97, 97, 97) !important;
	}
</style>