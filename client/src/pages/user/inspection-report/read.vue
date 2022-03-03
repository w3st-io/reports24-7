<template>
	<div class="nav-spacer">
		<BContainer class="my-5">
			<BRow>
				<BCol cols="12" lg="10" order="2" order-lg="1">
					<BCard v-if="!loading" class="shadow">
						<h3 class="text-center text-primary">
							Report For: {{ inspectionReport.client.name }}
						</h3>

						<h5 class="text-center text-dark">
							{{
								new Date(
									inspectionReport.inspectionReportAssignment.due_date
								).getMonth() + 1
							}}/{{
								new Date(
									inspectionReport.inspectionReportAssignment.due_date
								).getDate()
							}}/{{
								new Date(
									inspectionReport.inspectionReportAssignment.due_date
								).getFullYear()
							}}
						</h5>

						<BTabs pills>
							<!-- [TAB] General -->
							<BTab title="General" class="py-3" active>
								<div v-for="(o, i) in inspectionReport.general" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>

								<div>
									<h6>Intro Photo</h6>
									<img
										:src="`${$store.state.server_base_url}/api/user/inspection-reports/uploaded-image/${inspectionReport.general_image1_filename}`"
										class="w-100"
										style="max-width: 300px;"
									>
								</div>
							</BTab>

							<!-- [TAB] Pipe -->
							<BTab title="Pipe" class="py-3">
								<div v-for="(o, i) in inspectionReport.pipe" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] fdc -->
							<BTab title="FDC" class="py-3">
								<div v-for="(o, i) in inspectionReport.fdc" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] heads -->
							<BTab title="Heads" class="py-3">
								<div v-for="(o, i) in inspectionReport.heads" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Wetpipe -->
							<BTab title="Wetpipe" class="py-3">
								<div v-for="(o, i) in inspectionReport.wetpipe" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Drypipe -->
							<BTab title="drypipe" class="py-3">
								<div v-for="(o, i) in inspectionReport.drypipe" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Tanks -->
							<BTab title="Tanks" class="py-3">
								<div v-for="(o, i) in inspectionReport.tanks" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Foam -->
							<BTab title="Foam" class="py-3">
								<div v-for="(o, i) in inspectionReport.foam" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Standpipe -->
							<BTab title="Standpipe" class="py-3">
								<div v-for="(o, i) in inspectionReport.standpipe" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>

							<!-- [TAB] Pump -->
							<BTab title="Pump" class="py-3">
								<div v-for="(o, i) in inspectionReport.pump" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
										
									<div v-if="o.name == 'pump_label'">
										<h6>
											{{ inspectionReport.pump_image1_filename }}
										</h6>
									</div>

									<div v-if="o.name == 'pump_controller_label'">
										<h6>
											{{ inspectionReport.pump_image2_filename }}
										</h6>
									</div>

									<div v-if="o.name == 'pump_jockey_label'">
										<h6>
											{{ inspectionReport.pump_image3_filename }}
										</h6>
									</div>
								</div>
							</BTab>

							<!-- [TAB] Extinguisher -->
							<BTab title="Extinguisher" class="py-3">
								<div v-for="(o, i) in inspectionReport.extinguisher" :key="i">
									<h6 class="text-primary">{{ o.text }}</h6>
									<h6 class="">{{ o.answer }}</h6>
								</div>
							</BTab>
						</BTabs>

						<div v-if="error" class="text-danger">
							<h6>{{ error }}</h6>
						</div>
					</BCard>
				</BCol>

				<!-- Side Content -->
				<BCol cols="12" lg="2" order="1" order-lg="2">
					<BCard text-variant="dark" class="mb-3 shadow">
						<BButton
							variant="primary"
							class="w-100"
							@click="generatePDF()"
						>Generate PDF</BButton>
					</BCard>
				</BCol>
			</BRow>
		</BContainer>
	</div>
</template>

<script>
	import PageService from '@/services/PageService'
	import InspectionReportservice from '@/services/user/InspectionReportService'

	export default {
		data() {
			return {
				inspectionReport: {},
				reqData: {},
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_user_inspectionReport_read({
					inspectionReport_id: this.$route.params.inspectionreport_id
				})

				if (this.reqData.status) {
					this.inspectionReport = this.reqData.inspectionReport
				}
				else { this.error = this.message }

				this.loading = false
			},

			async generatePDF() {
				this.reqData = await InspectionReportservice.s_generate({
					inspectionreport_id: this.$route.params.inspectionreport_id
				})

				if (!this.reqData.status) { this.error = this.reqData.message }
			},
		},

		async created() {
			await this.getPageData()
		},
	}
</script>