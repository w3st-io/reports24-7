<template>
	<BContainer class="my-3 nav-spacer">
		<BRow>
			<!-- Loading -->
			<BCol v-if="loading" cols="12" class="mb-3">
				<Alert variant="primary" />
			</BCol>

			<!-- Manager Not Verifed -->
			<BCol v-if="!isVerified" cols="12" class="mb-3">
				<BCard bg-variant="danger" class="m-auto shadow">
					<h5 class="text-center text-light">Manager Account Not Verified!</h5>
					<BButton
						variant="outline-light"
						class="w-100"
						@click="resendvCodeEmail()"
					>Click to Resend Email</BButton>
				</BCard>
			</BCol>

			<!-- Email Sent -->
			<BCol v-if="vCodeSent" cols="12" class="mb-3">
				<BCard bg-variant="success" class="m-auto shadow">
					<h5 class="text-center text-light">Email Sent!</h5>
				</BCard>
			</BCol>
		</BRow>

		<!-- Account Details -->
		<BRow class="mt-3">
			<BCol>
				<BCard bg-variant="white" text-variant="dark" class="mb-4 shadow">
					<!-- Profile Details -->
					<BRow>
						<!-- Profile -->
						<BCol cols="12" lg="3" class="mt-2">
							<BBadge variant="primary" class="w-100 mb-3 p-0 rounded">
								<h5 class="mb-1">{{ manager.username }}</h5>
							</BBadge>

							<div class="m-auto" style="max-width: 170px;">
								<img
									:src="manager.profile_img"
									alt="Profile Image Not Available"
									class="w-100 mx-auto border border-primary rounded"
								>
							</div>

							<h6 v-if="personal" class="mt-3">
								<span class="text-secondary">Email:</span>
								<br>
								{{ manager.email }}
							</h6>

							<h6 class="mt-3">
								<span class="text-secondary">Bio:</span>
								<br>
								{{ manager.bio }}
							</h6>					

							<h6 class="mt-3">
								<span class="text-secondary">Joined:</span><br>
								{{ new Date(manager.created_at).toLocaleString() }}
							</h6>

							<h6 class="mt-3 small text-secondary">
								{{ manager_id }}
							</h6>
						</BCol>

						<!-- Account Details -->
						<BCol cols="12" lg="9" class="mt-2">
							<BRow>
								<BCol cols="6">
									<BButton
										variant="secondary"
										class="w-100 mt-3"
										@click="redirectProfileEdit()"
									>Edit Profile</BButton>
								</BCol>

								<BCol cols="6">
									<BButton
										variant="secondary"
										class="w-100 mt-3"
										@click="redirectPasswordChange()"
									>Change Password</BButton>
								</BCol>
							</BRow>
						</BCol>
					</BRow>
				</BCard>
			</BCol>
		</BRow>

		<BRow class="mt-3">
			<!-- Error -->
			<BCol v-if="error" cols="12">
				<Alert variant="danger" :message="error" />
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
	// [IMPORT] Personal //
	import Alert from '@/components/inform/Alert'
	import router from '@/router'
	import ManagerService from '@/services/manager/ManagerService'
	import PageService from '@/services/PageService'

	// [EXPORT] //
	export default {
		components: {
			Alert,
		},

		data() {
			return {
				returned: {},
				manager: {},
				data: {},
				activityLabels: [],
				activityValues: [],
				isVerified: true,
				vCodeSent: false,
				loading: true,
				error: '',
			}
		},

		async created() {
			try {
				// [REDIRECT] Not Log Required //
				if (!localStorage.managertoken) {
					router.push({ name: 'manager_login' })
				}

				this.returned = await PageService.s_manager_profile()

				this.loading = false

				if (this.returned.status) {
					this.data = this.returned
					this.manager = this.returned.manager
					this.isVerified = this.manager.verified
				}
				else { this.error = this.returned.message }

				// [LOG] //
				this.log()
			}
			catch (err) { this.error = err }
		},

		methods: {
			async resendvCodeEmail() {
				if (this.manager) {
					this.returned = await ManagerService.s_resendVerificationEmail(
						this.manager.email
					)

					if (this.returned.status) { this.vCodeSent = true }
					else { this.error = this.returned.message }
				}
			},

			redirectProfileEdit() {
				router.push({ name: 'manager_profile_edit' })
			},

			redirectPasswordChange() {
				router.push({ name: 'manager_password_change', })
			},

			log() {
				console.log('%%% [PAGE] manager Profile %%%')
				console.log('returned:', this.returned)
				console.log('manager:', this.manager)
			},
		},
	}
</script>