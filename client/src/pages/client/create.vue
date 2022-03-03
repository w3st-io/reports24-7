<template>
	<BContainer class="my-3 nav-spacer">
		<BCard v-if="!loading" class="shadow">
			<h1 class="text-center text-primary">Create Client</h1>
			<h6 class="text-center text-secondary">* is required</h6>

			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(submit)">
					<BRow>
						<!-- name -->
						<BCol cols="12" class="mb-3">
							<!-- Text Input -->
							<ValidationProvider
								tag="div"
								class="form-group" 
								name="confirmation"
								rules="required"
								v-slot="{ errors }"
							>
								<label for="name" class="h3">
									Name of Client*
								</label>
								
								<BFormInput
									v-model="formData.name"
									name="name"
									placeholder="Name of Client"
									class="mb-1"
									:class="{
										'is-invalid border-danger': errors != ''
									}"
								/>

								<!-- Error -->
								<h6 class="text-danger">{{ errors[0] }}</h6>
							</ValidationProvider>
						</BCol>

						<!-- Email -->
						<BCol cols="12" class="mb-3">
							<label for="email" class="h4">
								Email
							</label>
							
							<BFormInput
								v-model="formData.email"
								name="email"
								type="email"
								placeholder="example@example.com"
								class="mb-3"
							/>
						</BCol>

						<!-- Phone -->
						<BCol cols="12" md="6" class="mb-3">
							<label for="phone" class="h4">
								Phone
							</label>
							
							<BFormInput
								v-model="formData.phone"
								name="phone"
								type="tel"
								placeholder="1234567890"
								class="mb-3"
							/>
						</BCol>

						<!-- Fax -->
						<BCol cols="12" md="6" class="mb-3">
							<label for="fax" class="h4">
								Fax
							</label>
							
							<BFormInput
								v-model="formData.fax"
								name="fax"
								type="tel"
								placeholder="1234567890"
								class="mb-3"
							/>
						</BCol>

						<!-- url -->
						<BCol cols="12" class="mb-3">
							<label for="url" class="h4">
								Organization's Website URL
							</label>
							
							<BFormInput
								v-model="formData.url"
								name="url"
								placeholder="http://www.example.com"
								class="mb-3"
							/>
						</BCol>

						<!-- Address -->
						<BCol cols="12" class="mb-3">
							<BCard no-body>
								<BCardHeader>
									<h3>Address</h3>
								</BCardHeader>

								<BCardBody>
									<BRow>
										<!-- Address Street -->
										<BCol cols="12" md="10" class="mb-3">
											<label for="street" class="h5">
												Street
											</label>

											<BFormInput
												v-model="formData.address.street"
												name="street"
												placeholder="123 main st."
												class="mb-3"
											/>
										</BCol>

										<!-- Address Unit -->
										<BCol cols="12" md="2" class="mb-3">
											<label for="unit" class="h5">
												unit
											</label>

											<BFormInput
												v-model="formData.address.unit"
												name="unit"
												placeholder="3b"
												class="mb-3"
											/>
										</BCol>

										<!-- Address City -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="city" class="h5">
												City
											</label>

											<BFormInput
												v-model="formData.address.city"
												name="city"
												placeholder="City"
												class="mb-3"
											/>
										</BCol>

										<!-- Address State -->
										<BCol cols="12" md="3" class="mb-3">
											<label for="state" class="h5">
												State
											</label>

											<select
												v-model="formData.address.state"
												name="street"
												class="
													form-control
													form-select
													w-100
													p-2
												"
											>
												<option disabled value="">Select a state</option>
												<option
													v-for="(state, index) in pageData.states"
													:key="index"
												>{{ state }}</option>
											</select>
										</BCol>

										<!-- Address Zip -->
										<BCol cols="12" md="3" class="mb-3">
											<label for="zip" class="h5">Zip</label>
											
											<BFormInput
												v-model="formData.address.zip"
												name="zip"
												placeholder="12345"
												class="mb-3"
											/>
										</BCol>

										<!-- Address Country -->
										<BCol cols="12" class="mb-3">
											<label for="country" class="h5">
												Country
											</label>
											<select
												v-model="formData.address.country"
												name="street"
												class="
													form-control
													form-select
													w-100
													p-2
												"
											>
												<option disabled value="">Select a state</option>
												<option
													v-for="(country, index) in pageData.countries"
													:key="index"
												>{{ country }}</option>
											</select>
										</BCol>
									</BRow>
								</BCardBody>
							</BCard>
						</BCol>

						<!-- Representative -->
						<BCol cols="12" class="mb-3">
							<BCard no-body>
								<BCardHeader>
									<h3 class="text-dark">
										Representative Details
									</h3>
								</BCardHeader>

								<BCardBody>
									<BRow>
										<!-- Representative First Name -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="first_name" class="h5">
												first_name
											</label>

											<BFormInput
												v-model="formData.representative.first_name"
												name="first_name"
												placeholder="John"
												class="mb-3"
											/>
										</BCol>

										<!-- Representative Last Name -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="last_name" class="h5">
												last_name
											</label>

											<BFormInput
												v-model="formData.representative.last_name"
												name="last_name"
												placeholder="Doe"
												class="mb-3"
											/>
										</BCol>

										<!-- Representative email -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="representative_email" class="h5">
												Email
											</label>

											<BFormInput
												v-model="formData.representative.email"
												name="representative_email"
												placeholder="johndoe@example.com"
												class="mb-3"
											/>
										</BCol>

										<!-- Representative email -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="representative_email2" class="h5">
												Email 2
											</label>

											<BFormInput
												v-model="formData.representative.email2"
												name="representative_email2"
												placeholder="johndoe2@example.com"
												class="mb-3"
											/>
										</BCol>

										<!-- Cell Phone -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="cell_phone" class="h4">
												Cell Phone
											</label>
											
											<BFormInput
												v-model="formData.representative.cell_phone"
												name="cell_phone"
												type="tel"
												placeholder="1234567890"
												class="mb-3"
											/>
										</BCol>

										<!-- Alt Phone -->
										<BCol cols="12" md="6" class="mb-3">
											<label for="alt_phone" class="h4">
												Alt Phone
											</label>
											
											<BFormInput
												v-model="formData.representative.alt_phone"
												name="alt_phone"
												type="tel"
												placeholder="1234567890"
												class="mb-3"
											/>
										</BCol>
									</BRow>
								</BCardBody>
							</BCard>
						</BCol>

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

						<!-- Error -->
						<BCol cols="12">
							<h6 class="text-danger">{{ error }}</h6>
						</BCol>
					</BRow>
					<h6 class="text-light">{{ formData }}</h6>
				</form>
			</ValidationObserver>
		</BCard>
	</BContainer>
</template>

<script>
	import router from '@/router'
	import PageService from '../../services/PageService'
	import ClientService from '../../services/manager/ClientService'

	export default {
		data() {
			let organization_id = this.$route.params.organization_id

			return {
				loading: true,
				disabled: false,
				pageData: {},
				reqData: {},
				error: '',

				formData: {
					organization: organization_id,
					name: '',
					email: '',
					phone: '',
					fax: '',
					url: '',
					address: {
						street: '',
						unit: '',
						city: '',
						state: '',
						zip: '',
						country: '',
					},
					representative: {
						first_name: '',
						last_name: '',
						email: '',
						email2: '',
						cell_phone: '',
						alt_phone: '',
					},
				},
			}
		},

		methods: {
			async submit() {
				try {
					if (this.formData.name) {
						// Disable Button // Set loading //
						this.disabled = true
						this.loading = true
		
						this.reqData = await ClientService.s_create({
							organization_id: this.formData.organization,
							name: this.formData.name,
							email: this.formData.email,
							phone: this.formData.phone,
							fax: this.formData.fax,
							url: this.formData.url,
							address: this.formData.address,
							representative: this.formData.representative,
						})
		
						if (this.reqData.status) {
							// [REDIRECT] Organization Page //
							router.push({
								name: 'manager_organization_view',
								params: {
									organization_id: this.formData.organization
								}
							})
						}
						else {
							this.disabled = false
							this.loading = false
							this.error = this.reqData.message
						}
					}
					else {
						this.error = 'Please fill out all required fields'
					}
				}
				catch (err) { this.error = err }
			}
		},

		async created() {
			this.reqData = await PageService.s_client_create()

			this.loading = false
				
			if (this.reqData.status) {
				this.pageData = this.reqData.geo
			}
			else { this.error = this.reqData.message }
		},
	}
</script>