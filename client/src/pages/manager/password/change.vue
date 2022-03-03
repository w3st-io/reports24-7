<template>
	<BContainer class="my-3 nav-spacer">
		<BRow class="mb-3">
			<BCol cols="12">
				<BCard
					text-variant="dark"
					class="m-auto shadow"
					style="max-width: 500px;"
				>
					<h5 class="text-center">Create New Password</h5>
					<p>Please enter your new password</p>

					<ValidationObserver v-slot="{ handleSubmit }">
						<form @submit.prevent="handleSubmit(submit)">
							<!-- Current Password -->
							<ValidationProvider
								tag="div"
								class="form-group"
								rules="required"
								v-slot="{ errors }"
							>
								<input
									v-model="currentPassword"
									type="password"
									class="form-control"
									:class="{ 'is-invalid border-danger': errors != '' }"
									placeholder="Current Password"
								>
								<span class="text-danger">{{ errors[0] }}</span>
							</ValidationProvider>

							<!-- Password -->
							<ValidationProvider
								tag="div"
								class="form-group"
								rules="required|password:8, 50|confirmed:@confirmation"
								v-slot="{ errors }"
							>
								<input
									v-model="password"
									type="password"
									class="form-control"
									:class="{ 'is-invalid border-danger': errors != '' }"
									placeholder="Password"
								>
								<span class="text-danger">{{ errors[0] }}</span>
							</ValidationProvider>

							<!-- Confirmed Password -->
							<ValidationProvider
								tag="div"
								name="confirmation"
								rules="required"
								class="form-group" 
								v-slot="{ errors }"
							>
								<input
									v-model="confirm"
									name="confirm"
									type="password"
									class="form-control"
									:class="{ 'is-invalid border-danger': errors != '' }"
									placeholder="Repeat Password"
								>
								<span class="text-danger">{{ errors[0] }}</span>
							</ValidationProvider>
					
							<!-- Submit -->
							<BButton
								:disabled="submitted"
								variant="primary"
								class="w-100"
								type="submit"
							>Reset Password</BButton>
						</form>
					</ValidationObserver>
				</BCard>

				<!-- Message -->
				<Alert
					v-if="message"
					variant="info"
					:message="message"
					class="mx-auto mt-3"
					style="max-width: 500px;"
				/>
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
	// [IMPORT] Personal //
	import Alert from '@/components/inform/Alert'
	import router from '@/router'
	import ManagerService from '@/services/manager/ManagerService'

	// [EXPORT] //
	export default {
		data() {
			return {
				submitted: false,
				currentPassword: '',
				password: '',
				confirm: '',
				reqData: '',
				message: '',
			} 
		},

		components: {
			Alert,
		},

		methods: {
			async submit() {
				this.submitted = true

				try {
					this.reqData = await ManagerService.s_changePassword(
						this.currentPassword,
						this.password
					)

					this.message = this.reqData.message


					if (this.reqData.status) {
						this.submitted = true
						setTimeout(() => { router.push({ name: 'manager_profile' }) }, 1500)
					}

					this.submitted = false
				}
				catch (err) {
					this.message = err

					this.submitted = false
				}
				
				console.log('reqData:', this.reqData)
			},
		},
	}
</script>