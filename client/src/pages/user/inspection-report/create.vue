<template>
	<BContainer class="my-5 nav-spacer">
		<BRow class="mb-4">
			<BCol cols="12">
				<BCard
					v-if="!loading"
					bg-variant="white"
					text-variant="dark"
					class="shadow"
				>
					<!-- [ADMIN] Question Answers -->
					<AdminInfo
						v-if="$store.state.node_env == 'development'"
						:inspectionReportQuestions="inspectionReportQuestions"
					/>

					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(submit)">
							<BTabs pills>
								<!-- [TAB] General -->
								<BTab title="General" class="py-3" active>
									<Questions
										v-model="inspectionReportQuestions[0]"
									/>
								</BTab>

								<!-- [TAB] Pipe -->
								<BTab title="Pipe" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[1]"
									/>
								</BTab>

								<!-- [TAB] fdc -->
								<BTab title="FDC" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[2]"
									/>
								</BTab>

								<!-- [TAB] heads -->
								<BTab title="Heads" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[3]"
									/>
								</BTab>

								<!-- [TAB] Wetpipe -->
								<BTab title="Wetpipe" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[4]"
									/>
								</BTab>

								<!-- [TAB] Drypipe -->
								<BTab title="drypipe" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[5]"
									/>
								</BTab>

								<!-- [TAB] Tanks -->
								<BTab title="Tanks" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[6]"
									/>
								</BTab>

								<!-- [TAB] Foam -->
								<BTab title="Foam" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[7]"
									/>
								</BTab>

								<!-- [TAB] Standpipe -->
								<BTab title="Standpipe" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[8]"
									/>
								</BTab>

								<!-- [TAB] Pump -->
								<BTab title="Pump" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[9]"
									/>

									<FlowTestQuestions
										v-model="inspectionReportQuestions[9]"
										class="mb-3"
									/>

									<WhilePumpIsRunningQuestions
										v-model="inspectionReportQuestions[9]"
										class="mb-3"
									/>

									<CheckListQuestions
										v-model="inspectionReportQuestions[9]"
									/>
								</BTab>

								<!-- [TAB] Extinguisher -->
								<BTab title="Extinguisher" class="py-3">
									<Questions
										v-model="inspectionReportQuestions[10]"
									/>
								</BTab>
							</BTabs>
						
							<!-- Submit & Error -->
							<BRow>
								<!-- Submit -->
								<BCol cols="12" class="mt-3">
									<BButton
										:disabled="disabled"
										variant="primary"
										type="submit"
										class="w-100"
									>
										<span v-show="!loading">+ Create</span>
										<span v-show="loading" class="spinner-grow"></span>
									</BButton>
								</BCol>

							</BRow>
						</form>
					</ValidationObserver>
				</BCard>
			</BCol>

			<!-- Error -->
			<BCol v-if="error" cols="12">
				<h6 class="text-danger">{{ error }}</h6>
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
	// [IMPORT] Personal //
	import AdminInfo from '@/components/inspection-reports/AdminInfo'
	import CheckListQuestions from '@/components/inspection-reports/pumpExtraQuestions/CheckList'
	import FlowTestQuestions from '@/components/inspection-reports/pumpExtraQuestions/FlowTest'
	import WhilePumpIsRunningQuestions from '@/components/inspection-reports/pumpExtraQuestions/WhilePumpIsRunning'
	import Questions from '@/components/inspection-reports/Questions'
	import router from '@/router'
	import inspectionReportService from '@/services/user/InspectionReportService'
	import PageService from '@/services/PageService'

	export default {
		components: {
			AdminInfo,
			CheckListQuestions,
			FlowTestQuestions,
			WhilePumpIsRunningQuestions,
			Questions,
		},

		data() {
			const inspectionReportAssignment_id = this.$route.params.inspectionreportassignment_id

			return {
				inspectionReportAssignment_id: inspectionReportAssignment_id,
				reqData: {},
				loading: true,
				disabled: false,
				error: '',

				inspectionReportQuestions: {},
				file: '',
				file2: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_user_inspectionReport_create()

				if (this.reqData.status) {
					this.inspectionReportQuestions = this.reqData.inspectionReportQuestions
				}
				else { this.error = this.reqData.message }
			},

			async submit() {
				try {
					// Disable Button // Set loading //
					this.disabled = true
					//this.loading = true
	
					// [CREATE] //
					const inspectionReportFormData = new FormData()
					
					inspectionReportFormData.append(
						'general_image1',
						this.inspectionReportQuestions[0].general_image1
					)

					inspectionReportFormData.append(
						'pump_image1',
						this.inspectionReportQuestions[9].pump_image1
					)

					inspectionReportFormData.append(
						'pump_image2',
						this.inspectionReportQuestions[9].pump_image2
					)

					inspectionReportFormData.append(
						'pump_image3',
						this.inspectionReportQuestions[9].pump_image3
					)

					inspectionReportFormData.append(
						'inspectionReport',
						JSON.stringify(this.inspectionReportQuestions)
					)

					inspectionReportFormData.append(
						'inspectionReportAssignment_id',
						this.$route.params.inspectionreportassignment_id
					)

					this.reqData = await inspectionReportService.s_create(
						inspectionReportFormData
					)

					console.log('sss', this.reqData)
	
					
					if (this.reqData.status) {
						// [REDIRECT] Organization Page //
						router.push({ name: 'home' })
					}
					else {
						this.disabled = false
						this.loading = false
						this.error = this.reqData.message
					}
				}
				catch (err) {
					this.error = err
					this.disabled = false
					this.loading = false
				}
			}
		},

		async created() {
			await this.getPageData()

			this.loading = false
		},
	}
</script>