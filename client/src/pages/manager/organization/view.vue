<template>
	<div class="nav-spacer">
		<BContainer class="my-5">
			<BCard v-if="!loading" class="mb-3 shadow">
				<BRow>
					<BCol cols="12">
						<BRow v-if="organization" class="text-center">
							<!-- Organization Name -->
							<BCol cols="12">
								<h2 class="text-primary">{{ organization.name }}</h2>
							</BCol>

							<!-- Address -->
							<BCol cols="12">
								<h6 v-if="organization.address">
									{{ organization.address.street }}
									<span v-if="organization.address.unit">
										unit {{ organization.address.unit }}
									</span>
									{{ organization.address.city }},
									{{ organization.address.state }}
									{{ organization.address.zip }}
								</h6>
							</BCol>

							<BCol cols="12"><hr class="border-primary"></BCol>
						</BRow>
					</BCol>

					<BCol cols="12" class="">
						<RouterLink
							:to="`/manager/organization/add-member/${organization._id}`"
						>
							<BButton
								variant="outline-success"
								size="lg"
								class="mb-3 mr-3"
							>+ Add Member</BButton>
						</RouterLink>

						<RouterLink :to="`/client/create/${organization._id}`">
							<BButton
								variant="outline-success"
								size="lg"
								class="mb-3 mr-3"
							>+ Create Client</BButton>
						</RouterLink>
					</BCol>

					<BCol cols="12" md="6" class="">
						<BCard>
							<BRow class="mb-3">
								<BCol cols="12">
									<h3 class="text-center text-dark">Members</h3>
									<hr class="border-primary">
								</BCol>
							</BRow>

							<BRow
								v-for="(user, i) in users"
								:key="i"
								class="mb-3"
							>
								<BCol cols="1">
									<img :src="user.user.profile_img" class="w-100 my-2">
								</BCol>

								<BCol cols="7">
									Username: {{ user.user.username }}
									<br>
									Email: {{ user.user.email }}
								</BCol>

								<BCol cols="4">
									<BButton
										variant="primary"
										class="w-100 my-2"
										@click="redirectIRECreate(user.user._id)"
									>+ Assign Report</BButton>
								</BCol>

								<BCol cols="12">
									<hr>
								</BCol>
							</BRow>
						</BCard>
					</BCol>

					<BCol cols="12" md="6">
						<BCard>
							<BRow>
								<!-- Title -->
								<BCol cols="12">
									<h3 class="text-center text-dark">Clients</h3>
									<hr class="border-primary">
								</BCol>

								<BCol
									v-for="(client, index) in clients"
									:key="index"
									cols="12"
									class="mb-3"
								>
									<BCard
										no-body
										bg-variant="white"
										text-variant="dark"
										class="card-bg"
										@click="clientViewRedirect(client._id)"
									>
										<BCardHeader class="text-center">
											<h4 class="m-0 text-primary">{{ client.name }}</h4>
										</BCardHeader>
										<BCardBody>
											<h5>
												{{ client.address.street }}
												{{ client.address.city }}
												{{ client.address.state }},
												{{ client.address.zip }}
											</h5>

											<h5>
												<a :href="client.url">{{ client.url }}</a>
											</h5>
										</BCardBody>
									</BCard>
								</BCol>
							</BRow>
						</BCard>
					</BCol>
				</BRow>
			</BCard>
	
			<!-- Loading -->
			<BCard v-if="loading" bg-variant="none" class="mb-3 shadow">
				<BRow>
					<BCol cols="12">
						<h5 class="m-0 text-danger">Loading..</h5>
					</BCol>
				</BRow>
			</BCard>
		
			<!-- Error -->
			<BCard v-if="error" bg-variant="none" class="mb-3 shadow">
				<BRow>
					<BCol cols="12">
						<h5 class="text-danger">{{ error }}</h5>
					</BCol>
				</BRow>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	import router from '@/router'
	import PageService from '@/services/PageService'

	export default {
		data() {
			let organization_id = this.$route.params.organization_id

			return {
				organization_id: organization_id,
				reqData: {},
				pageData: {},
				organization: {},
				clients: [],
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.loading = true

				this.reqData = await PageService.s_organization_view({
					organization_id: this.organization_id,
					sort: 0,
					limit: 10,
					page: 1,
				})
				
				if (this.reqData.status) {
					this.organization = this.reqData.organization
					this.clients = this.reqData.clients
					this.users = this.reqData.organizationInvites
				}
				else { this.error = this.reqData.message }

				this.loading = false
			},

			clientViewRedirect(client_id) {
				console.log(client_id)
				router.push({
					name: 'client_view',
					params: {
						client_id: client_id
					}
				})
			},

			redirectIRECreate(user_id) {
				router.push({
					name: 'manager_inspection-report-assignment_create',
					params: {
						organization_id: this.$route.params.organization_id,
						pre_user_id: user_id,
						pre_client_id: 'pre_client_id',
					}
				})
			}
		},

		async created() {
			await this.getPageData()
		},
	}
</script>

<style lang="scss" scoped>
	.card-bg:hover { background-color: rgba(255, 0, 0, 0.25) !important; }
</style>