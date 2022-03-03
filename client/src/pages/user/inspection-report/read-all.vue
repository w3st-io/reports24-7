<template>
	<div class="nav-spacer">
		<BContainer>
			<BCard class="my-5 shadow">
				<BRow>
					<BCol cols="12">
						<BButton>
							Next Page
						</BButton>
					</BCol>

					<BCol cols="12">
						<BRow class="py-2">
							<BCol cols="3">
								<h4 class="m-0 text-primary">Client Name</h4>
							</BCol>

							<BCol cols="6">
								<h4 class="m-0 text-primary">Client Address</h4>
							</BCol>

							<BCol cols="3">
								<h4 class="m-0 text-primary">Inspected Before Date</h4>
							</BCol>
						</BRow>

						<BRow
							v-for="(ir, i) in inspectionReports"
							:key="i"
							class="my-3 py-2 bg-light border"
						>
							<BCol cols="3">
								Name:
								<h4 class="mb-3">{{ ir.client.name }}</h4>
							</BCol>

							<BCol cols="6">
								<h4 class="mb-3">
									Address:
									{{ ir.client.address.street }}
									{{ ir.client.address.city }},
									{{ ir.client.address.state }}
									{{ ir.client.address.zip }}
								</h4>
							</BCol>

							<BCol cols="3">
								<h4 class="mb-3">
									{{
										new Date(
											ir.inspectionReportAssignment.due_date
										).getMonth() + 1
									}}/{{
										new Date(
											ir.inspectionReportAssignment.due_date
										).getDate()
									}}/{{
										new Date(
											ir.inspectionReportAssignment.due_date
										).getFullYear()
									}}
								</h4>
							</BCol>

							<BCol cols="12" sm="6">
								<RouterLink
									:to="`/user/inspection-report/read/-/${ir._id}`"
								>
									<BButton
										variant="secondary"
										class="w-100 mb-2"
									>View</BButton>
								</RouterLink>
							</BCol>

							<BCol cols="12" sm="6">
								<BButton
									variant="primary"
									class="w-100 mb-2"
									@click="generatePDF(ir._id)"
								>Generate Report</BButton>
							</BCol>
						</BRow>
					</BCol>

					<BCol v-if="error" cols="12">{{ error }}</BCol>
				</BRow>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	import PageService from '@/services/PageService'
	import InspectionReportservice from '@/services/user/InspectionReportService'

	export default {
		data() {
			return {
				inspectionReports: [],
				reqData: {},

				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_user_inspectionReport_readAll({
					organization_id: this.$route.params.organization_id,
					sort: 1,
					limit: 5,
					page: 1
				})

				console.log(this.reqData);

				if (this.reqData.status) {
					this.inspectionReports = this.reqData.inspectionReports
				}
				else { this.error = this.reqData.message }
			},

			async generatePDF(inspectionReport_id) {
				this.reqData = await InspectionReportservice.s_generate({
					inspectionreport_id: inspectionReport_id
				})

				if (!this.reqData.status) { this.error = this.reqData.message }
			},
		},

		async created() {
			await this.getPageData()
		},
	}
</script>