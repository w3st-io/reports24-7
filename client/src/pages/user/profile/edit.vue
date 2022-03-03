<template>
	<BContainer class="my-3 nav-spacer">
		<BRow v-if="!loading">
			<BCol cols="12" sm="8">
				<BCard bg-variant="none" text-variant="dark">
					<!-- Image Display -->
					<div class="w-100 p-3 text-center">
						<img
							:src="imgUrl"
							alt="Profile Pic Here"
							class="border border-warning"
							style="width: 200px;"
						>
					</div>

					<!-- First Name -->
					<label for="profile_imgInput">First Name</label>
					<input
						name="profile_imgInput"
						type="text"
						class="my-2 form-control"
						v-model="first_name"
					>

					<!-- Last Name -->
					<label for="profile_imgInput">Last Name</label>
					<input
						name="profile_imgInput"
						type="text"
						class="my-2 form-control"
						v-model="last_name"
					>

					<!-- Image URL -->
					<label for="profile_imgInput">Profile Pic Url</label>
					<input
						name="profile_imgInput"
						type="text"
						class="my-2 form-control"
						v-model="imgUrl"
					>

					<!-- Bio -->
					<label for="profile_imgInput" class="mt-3">Bio</label>
					<input
						name="profile_imgInput"
						type="text"
						class="my-2 form-control"
						v-model="bio"
					>

					<BButton
						variant="secondary"
						class="w-100 mt-3"
						@click="updateUserData()"
					>Edit Your Profile</BButton>

					<!-- [LOADING + ERROR] -->
					<Alert v-if="loading" variant="warning" message="Loading.." />
					<Alert v-if="error" variant="danger" :message="error" class="my-3" />
				</BCard>
			</BCol>

			<BCol cols="12" sm="8"></BCol>
		</BRow>
	</BContainer>
</template>

<script>
	// [IMPORT] Personal //
	import Alert from '@/components/inform/Alert'
	import router from '@/router'
	import PageService from '@/services/PageService'
	import UserService from '@/services/user/UserService'

	// [EXPORT] //
	export default {
		components: {
			Alert,
		},

		data() {
			return {
				loading: true,
				userData: {},
				data: {},
				first_name: '',
				last_name: '',
				imgUrl: '',
				bio: '',
				error: '',
			}
		},

		async created() {
			try {
				// [REDIRECT] Not Log Required //
				if (!localStorage.usertoken) { router.push({ name: '/' }) }

				// Retrieve User Profile Data //
				this.data = await PageService.s_user_profile_edit()

				if (this.data.status) {
					this.userData = this.data.user

					// Set Image //
					this.first_name = this.userData.first_name
					this.last_name = this.userData.last_name
					this.imgUrl = this.userData.profile_img
					this.bio = this.userData.bio
				}
				else { this.error = this.data.message }

				// Enable Loading //
				this.loading = false

				// [LOG] //
				//this.log()
			}
			catch (err) {this.error = err }
		},

		methods: {
			async updateUserData() {
				try {
					this.data = await UserService.s_update({
						first_name: this.first_name,
						last_name: this.last_name,
						img_url: this.imgUrl,
						bio: this.bio
					})
					
					if (this.data.status) {
						router.push({ name: 'user_profile' })
					}
					else { this.error = this.data.message }
				}
				catch (err) { this.error = err }
			},

			log() {
				console.log('%%% [PAGE] User Profile %%%')
				console.log('userData:', this.userData)
				console.log('imgUrl:', this.imgUrl)
			},
		},
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 768px) {
		.hidden-768 { display: none !important; }
	}
</style>