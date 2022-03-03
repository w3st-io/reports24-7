<template>
	<div class="nav-spacer">
		<BContainer class="my-5">
			<BRow v-if="!loading">
				<BCol cols="12" lg="8" xl="9" class="mb-3">
					<BCard variant="none" border-variant="info" class="shadow">
						<h3 class="text-center text-dark">Schedule</h3>

						<hr class="mb-4 border-info">

						<Calendar :reports="this.pageData.reports" />
					</BCard>
				</BCol>

				<BCol cols="12" lg="4" xl="3" class="mb-3">
					<BRow>
						<BCol cols="12" lg="12" >
							<BCard variant="none" border-variant="info" class="mb-4 shadow">
								<h3 class="text-center text-dark">Reports</h3>

								<hr class="mb-4 border-info">
								
								<RouterLink
									:to="`/manager/inspection-report-assignment/view/${organization_id}/0/4/1`"
								>
									<BButton
										variant="info"
										class="w-100 mb-3"
									>View All Assigned Inspections</BButton>								
								</RouterLink>

								<RouterLink
									:to="`/manager/inspection-report-assignment/create/${organization_id}/unset/unset`"
								>
									<BButton
										variant="success"
										class="w-100"
									>+ Assign an Inspection</BButton>
								</RouterLink>
							</BCard>
						</BCol>

						<BCol cols="12" md="6" lg="12">
							<BCard variant="none" border-variant="info" class="mb-4 shadow">
								<h3 class="text-center text-dark">
									Your Organization
								</h3>

								<hr class="mb-4 border-info">

								<h4 class="text-center font-weight-bold text-info">
									{{ organization.name }}
								</h4>

								<h5 class="text-center text-dark mb-3">	
									{{ organization.address.street }}
									{{ organization.address.city }},
									{{ organization.address.state }}
									{{ organization.address.zip }}
								</h5>

								<RouterLink
									:to="`/manager/organization/view/${organization_id}/0/20/1`"
								>
									<BButton variant="info" class="mb-3 w-100">
										View Your Organization
									</BButton>
								</RouterLink>

								<RouterLink
									:to="`/manager/organization/add-member/${organization_id}`"
								>
									<BButton
										variant="success"
										class="mb-3 w-100"
									>+ Add Member</BButton>
								</RouterLink>

								<RouterLink :to="`/client/create/${organization_id}`">
									<BButton
										variant="success"
										class="mb-3 w-100"
									>+ Create Client</BButton>
								</RouterLink>
							</BCard>
						</BCol>

						<BCol cols="12" md="6" lg="12">
							<BCard variant="none" border-variant="info" class="mb-4 shadow">
								<h3 class="text-center text-dark">
									Upcoming Reports
								</h3>

								<hr class="mb-4 border-info">
								
								<BRow
									v-for="(ur, i) in pageData.upcomingReports"
									:key="i"
									class="mb-3"
								>
									<BCol cols="12">
										<h5 class="mb-1 text-center text-info">
											Address: {{ ur.address }}
										</h5>
									</BCol>
									<BCol cols="12" class="mb-1">
										<h5 class="m-0 text-center text-dark">
											Inspector: {{ ur.inspector }}
										</h5>
									</BCol>

									<BCol cols="12" sm="6" class="pr-1 mb-1">
										<RouterLink to="/manager/inspection">
											<BButton
												variant="info"
												size="sm"
												class="w-100"
											>View</BButton>
										</RouterLink>
									</BCol>

									<BCol cols="12" sm="6" class="pl-1 mb-1">
										<RouterLink to="/manager/inspection">
											<BButton
												variant="outline-secondary"
												size="sm"
												class="w-100"
											>Edit</BButton>
										</RouterLink>
									</BCol>
								</BRow>
							</BCard>
						</BCol>
					</BRow>
				</BCol>
			</BRow>
		</BContainer>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import Calendar from '@/components/manager/calendar'
	import PageService from '@/services/PageService'
	import router from '@/router'

	export default {
		data() {
			const organization_id = this.$route.params.organization_id

			return {
				organization_id: organization_id,
				organization: {},
				reqData: {},
				pageData: {},
				loading: true,
				error: '',
			}
		},

		components: {
			Calendar
		},

		async created() {
			if (!localStorage.managertoken) {
				router.push({ name: 'manager_login' })
			}

			this.reqData = await PageService.s_manager_dashboard(this.organization_id)

			if (this.reqData.status) {
				this.loading = false
				this.pageData = this.reqData
				this.organization = this.pageData.organization
			}
		},
	}
</script>