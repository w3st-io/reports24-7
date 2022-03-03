<template>
	<BContainer class="nav-spacer">
		<BCard bg-variant="none" class="my-5 shadow">
			<BRow>
				<BCol cols="12">
					<h2 class="mb-3 text-center text-dark">
						Schedule and Assign an Inspection
					</h2>
					<hr class="border-primary">
				</BCol>

				<!-- Due Date -->
				<BCol cols="12">
					<h4 class="text-primary">1) Pick Date for the Inspection</h4>
					<Datepicker
						placeholder="Select Date"
						v-model="due_date"
						class="w-100 mb-3"
					/>
					<hr>
				</BCol>

				<!-- Organization Invites -->
				<BCol cols="12" md="6">
					<h4 class="text-primary">2) Choose Inspector</h4>

					<div class="mb-3">
						<BRow
							v-for="(oI, i) in organizationInvites"
							:key="i"
							class="mb-2 p-2 rounded border"
							:class="{
								'border-success' : oI.user._id == $route.params.pre_user_id
							}"
							style="border-width: 3px !important;"
							@click="updateData(oI.user._id, $route.params.pre_client_id)"
						>
							<BCol cols="12" sm="4" lg="3">
								<img :src="oI.user.profile_img" class="w-100" style="max-width: 300px;">
							</BCol>
							<BCol cols="12" sm="8" lg="9">
								<h4 v-if="$store.state.node_env == 'development'">
									_id: {{ oI.user._id }}
								</h4>
								<h4>
									Username: {{ oI.user.username }}<br>
									Email: {{ oI.user.email }}<br>
									Name: {{ oI.user.first_name }} {{ oI.user.last_name }}<br>
								</h4>
							</BCol>
						</BRow>
					</div>
				</BCol>

				<!-- Clients -->
				<BCol cols="12" md="6">
					<h4 class="text-primary">3) Choose Client</h4>

					<div class="mb-3">
						<div
							v-for="(client, i) in clients"
							:key="i"
							class="mb-2 p-2 rounded border"
							:class="{
								'border-success' : client._id == $route.params.pre_client_id
							}"
							style="border-width: 3px !important;"
							@click="updateData($route.params.pre_user_id, client._id)"
						>
							<h4 v-if="$store.state.node_env == 'development'">
								_id: {{ client._id }}
							</h4>
							<h4>Name: {{ client.name }}</h4>
							<h4>
								Address:
								{{ client.address.street }}
								{{ client.address.city }}
								{{ client.address.state }}
								{{ client.address.zip }}
							</h4>
						</div>
					</div>
				</BCol>

				<BCol cols="12">
					<BButton
						variant="primary"
						class="w-100 mb-3"
						@click="submit()"
					>Assign Event</BButton>

					<h6 v-if="error" class="text-danger">{{ error }}</h6>
				</BCol>
			</BRow>
		</BCard>
	</BContainer>
</template>

<script>
	import Datepicker from 'vuejs-datepicker'

	import InspectionReportAssignmentService from '@/services/manager/InspectionReportAssignmentService'
	import PageService from '@/services/PageService'
	import router from '@/router'

	export default {
		data() {
			return {
				oIKey: 0,
	
				loading: true,
				reqData: {},
				clients: [],
				due_date: '',
				organizationInvites: [],
				error: '',
			}
		},
						
		components: {
			Datepicker
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_manager_inspectionReportAssignment_create({
					organization_id: this.$route.params.organization_id,
					pre_client_id: this.$route.params.pre_client_id,
					pre_user_id: this.$route.params.pre_user_id
				})

				if (this.reqData.status) {
					this.clients = this.reqData.clients
					this.organizationInvites = this.reqData.organizationInvites
				}
			},

			updateData(user_id = 'unset', client_id = 'unset') {
				router.push({
					name: 'manager_inspection-report-assignment_create',
					params: {
						organization_id: this.$route.params.organization_id,
						pre_user_id: user_id,
						pre_client_id: client_id,
					}
				})
			},

			async submit() {
				this.reqData = await InspectionReportAssignmentService.s_create({
					organization_id: this.$route.params.organization_id,
					client_id: this.$route.params.pre_client_id,
					user_id: this.$route.params.pre_user_id,
					due_date: this.due_date,
				})

				console.log(this.reqData)

				if (this.reqData.status) {
					console.log('success')

					router.push(
						`/manager/inspection-report-assignment/view/${this.$route.params.organization_id}/0/10/1`
					)
				}
				else { this.error = this.reqData.message }
			}
		},

		async created() {
			await this.getPageData()
		},
	}
</script>