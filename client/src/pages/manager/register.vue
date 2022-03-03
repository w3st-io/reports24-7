<template>
	<article class="mx-auto my-5 nav-spacer register-terminal">
		<BCard text-variant="dark" border-variant="info" class="shadow">
			<h3 class="mb-3 text-center text-info">Register As a Manager</h3>

			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(register)">
					<!-- Email -->
					<ValidationProvider
						tag="div"
						type="email"
						class="form-group"
						rules="required"
						v-slot="{ errors }"
					>
						<label>Email</label>
						<input
							v-model="email"
							name="email"
							type="email"
							class="form-control"
							:class="{ 'is-invalid border-danger': errors != '' }"
							placeholder="example@example.com"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Username -->
					<ValidationProvider
						tag="div"
						class="form-group"
						rules="required"
						v-slot="{ errors }"
					>
						<label>Username</label>
						<input
							v-model="username"
							name="username"
							type="text"
							class="form-control"
							:class="{ 'is-invalid border-danger': errors != '' }"
							placeholder="username"
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
						<label>Password</label>
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
						<label>Confirm Password</label>
						<input
							v-model="confirm"
							type="password"
							class="form-control"
							:class="{ 'is-invalid border-danger': errors != '' }"
							placeholder="Repeat Password"
						>
						<span class="text-danger">{{ errors[0] }}</span>
					</ValidationProvider>

					<!-- Submit -->
					<button type="submit" class="w-100 mt-5 btn btn-lg btn-primary">
						Register
					</button>
				</form>
			</ValidationObserver>
		</BCard>
		
		<!-- [ERROR] -->
		<Alert v-if="error" variant="danger" :message="error" class="m-0 mt-3" />
	</article>
</template>

<script>
	// [IMPORT] Personal //
	import Alert from '@/components/inform/Alert'
	import router from '@/router'
	import ManagerService from '../../services/manager/ManagerService'

	// [EXPORT] //
	export default {
		data() {
			return {
				username: '',
				email: '',
				password: '',
				data: '',
				error: '',
			}
		},

		components: {
			Alert,
		},

		methods: {
			async register() {
				try {
					this.data = await ManagerService.s_register({
						username: this.username,
						email: this.email,
						password: this.password,
					})

					// Check Status //
					if (this.data.created) { router.push({ name: 'user_registered' }) }
					else { this.error = this.data.message }
				}
				catch (err) { this.error = err }
			},
		},

		async created() {
			// [REDIRECT] Log Required //
			if (localStorage.managertoken) { router.push({ name: 'manager_profile' }) }
		},
	}
</script>

<style scoped>
	.register-terminal { max-width: 350px; }
</style>