<template>
	<div class="nav-spacer">
		<BContainer v-if="$store.state.app_name !== 'reports24-7'" class="my-5">
			<BRow>
				<!-- Loading -->
				<BCol v-if="loading" cols="12" class="mb-3">
					<Alert variant="primary" />
				</BCol>
			</BRow>

			<Profile
				v-if="!error && !loading"
				:personal="false"
				:user_id="reqData.user._id"
				:username="reqData.user.username"
				:profile_img="reqData.user.profile_img"
				:bio="reqData.user.bio"
				:created_at="reqData.user.created_at"
				:commentCount="reqData.commentCount"
				:commentLikeCount="reqData.commentLikeCount"
				:postCount="reqData.postCount"
				:postLikeCount="reqData.postLikeCount"
				:activityData="reqData.activityData"
			/>

			<BRow v-if="!error && !loading && reqData.adminData">
				<BCol cols="12" class="mt-3 text-light">
					<BCard bg-variant="white" border-variant="warning">
						<BRow>
							<!-- commentReports -->
							<BCol cols="12" class="text-center">
								<h5>Admin Data</h5>
							</BCol>

							<!-- commentReports -->
							<BCol cols="12" lg="4" class="mb-3">
								<BBadge variant="secondary" class="w-100">
									<h6>
										Comment Report<br>
										{{ reqData.adminData.commentReportCount }}
									</h6>
								</BBadge>
							</BCol>

							<!-- Handled commentReports -->
							<BCol cols="12" lg="4" class="mb-3">
								<BBadge variant="secondary" class="w-100">
									<h6>
										Handled Comment Report<br>
										{{ reqData.adminData.commentReportHandledCount }}
									</h6>
								</BBadge>
							</BCol>

							<!-- Unhandled commentReports -->
							<BCol cols="12" lg="4" class="mb-3">
								<BBadge variant="secondary" class="w-100">
									<h6>
										Unhandled Comment Report<br>
										{{ reqData.adminData.commentReportUnhandledCount }}
									</h6>
								</BBadge>
							</BCol>
						</BRow>					
					</BCard>
				</BCol>
			</BRow>

			<BRow>
				<BCol v-if="error" cols="12" class="mt-3">
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
	import Alert from '@/components/inform/Alert'
	import Profile from '@/components/user/Profile'
	import PageService from '@/services/PageService'

	export default {
		components: {
			Alert,
			Profile,
		},

		data() {
			return {
				user_id: this.$route.params.user_id,
				profile_img: require('../../../assets/images/pages/user/profile/lookup/DefaultProfileImg.png'),
				user: {},
				reqData: {},
				loading: true,
				error: '',
			}
		},

		methods: {
			async getPageData() {
				this.reqData = await PageService.s_user_profile_lookup(this.user_id)

				if (this.reqData.status) { this.user = this.reqData.user }
				else { this.error = this.reqData.message }
			},

			log() {
				console.log('%%% [PAGE] user/profile/lookup %%%')
				console.log('reqData:', this.reqData)
			}
		},

		async created() {
			await this.getPageData()

			this.loading = false

			this.log()
		},
	}
</script>