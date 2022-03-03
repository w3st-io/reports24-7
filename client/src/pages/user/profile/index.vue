<template>
	<div class="nav-spacer">
		<BContainer v-if="$store.state.app_name !== 'reports24-7'" class="my-5">
			<BRow>
				<!-- Loading -->
				<BCol v-if="loading" cols="12" class="mb-3">
					<Alert variant="primary" />
				</BCol>

				<!-- User Not Verifed -->
				<BCol v-if="!isVerified" cols="12" class="mb-3">
					<BCard bg-variant="danger" class="m-auto shadow">
						<h5 class="text-center text-light">Account Not Verified!</h5>
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

			<Profile
				v-if="!error && !loading"
				:personal="true"
				:user_id="user._id"
				:email="user.email"
				:username="user.username"
				:profile_img="user.profile_img"
				:bio="user.bio"
				:created_at="user.created_at"
				:commentCount="data.commentCount"
				:commentLikeCount="data.commentLikeCount"
				:postCount="data.postCount"
				:postLikeCount="data.postLikeCount"
				:activityData="data.activityData"
			/>

			<BRow class="mt-3">
				<!-- Error -->
				<BCol v-if="error" cols="12">
					<Alert variant="danger" :message="error" />
				</BCol>
			</BRow>
		</BContainer>

		<BContainer v-else class="my-5">
			<BCard bg-variant="none" class="shadow">
				<BRow>
					<BCol cols="12">
						<h3 class="text-center text-primary">Inspector Profile</h3>
					</BCol>

					<BCol cols="12" sm="4">
						<div class="w-100 text-center">
							<img
								:src="user.profile_img"
								alt="No profile pic yet"
								class="w-100 border border-primary rounded"
								style="max-width: 250px;"
							>	
						</div>
					</BCol>

					<BCol cols="12" sm="8">
						<h4>Username: {{ user.username }}</h4>
						<h4>Email: {{ user.email }}</h4>
						<h4>First Name: {{ user.first_name }}</h4>
						<h4>Last Name: {{ user.last_name }}</h4>

						<BButton
							class="w-100"
							@click="redirectProfileEdit()"
						>Edit Profile</BButton>
					</BCol>
				</BRow>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	// [IMPORT] Personal //
	import Alert from '@/components/inform/Alert'
	import Profile from '@/components/user/Profile'
	import router from '@/router'
	import PageService from '@/services/PageService'
	import UserService from '@/services/user/UserService'

	// [EXPORT] //
	export default {
		components: {
			Alert,
			Profile,
		},

		data() {
			return {
				reqData: {},
				user: {},
				data: {},
				activityLabels: [],
				activityValues: [],
				isVerified: true,
				vCodeSent: false,
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				try {
					this.reqData = await PageService.s_user_profile()

					if (this.reqData.status) {
						this.data = this.reqData
						this.user = this.reqData.user
						this.isVerified = this.user.verified
					}
					else { this.error = this.reqData.message }
				}
				catch (err) { this.error = err }
			},

			async resendvCodeEmail() {
				if (this.user) {
					this.reqData = await UserService.s_resendVerificationEmail(
						this.user.email
					)

					if (this.reqData.status) { this.vCodeSent = true }
					else { this.error = this.reqData.message }
				}
			},

			log() {
				console.log('%%% [PAGE] User Profile %%%')
				console.log('reqData:', this.reqData)
				console.log('user:', this.user)
			},
		},

		async created() {
			try {
				// [REDIRECT] Not Log Required //
				if (!localStorage.usertoken) { router.push({ name: 'user_login' }) }

				await this.getPageData()

				this.loading = false

				// [LOG] //
				this.log()
			}
			catch (err) { this.error = err }
		},
	}
</script>