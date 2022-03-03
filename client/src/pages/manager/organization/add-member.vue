<template>
	<div class="nav-spacer">
		<BContainer class="py-5">
			<BCard bg-variant="none" text-variant="dark" class="shadow">
				<h1 class="text-center text-primary">Add Member</h1>

				<!-- Form -->
				<ValidationObserver v-slot="{ handleSubmit }">
					<form @submit.prevent="handleSubmit(search)" class="mb-5">
						<label for="query" class="h3 text-primary">
							Enter Email
						</label>
						<BInputGroup class="mb-3">
							<BFormInput
								v-model="query"
								name="query"
								type="text"
								placeholder="email"
								class=""
							/>

							<BInputGroupAppend class="">
								<BButton
									type="submit"
									variant="primary"
									class=""
								>Search</BButton>
							</BInputGroupAppend>
						</BInputGroup>
					</form>
				</ValidationObserver>

				<!-- Results -->
				<BListGroup v-if="users.length > 0">
					<BListGroupItem variant="secondary">
						<h4 class="m-0 text-center text-dark">
							Results for {{ query }}..
						</h4>
					</BListGroupItem>

					<BListGroupItem v-for="(user, i) in users" :key="i">
						<BRow>
							<BCol cols="2" lg="1" class="pr-0">
								<img :src="user.profile_img" class="w-100">
							</BCol>
							<BCol cols="10" class="">
								<h4 class="text-primary">{{ user.email }}</h4>
								<h4 class="text-primary">{{ user.username }}</h4>
								<p class="h6">
									{{ user.first_name }} {{ user.last_name }}
								</p>
							</BCol>
							<BCol cols="6">
								<RouterLink :to="`/user/profile/lookup/-/${user._id}`">
									<BButton class="w-100">
										View Profile
									</BButton>
								</RouterLink>
							</BCol>
							<BCol cols="6">
								<BButton
									variant="primary"
									class="w-100"
									@click="invite(user._id)"
								>Invite to Organization</BButton>
							</BCol>
						</BRow>
					</BListGroupItem>
				</BListGroup>

				<!-- No Users -->
				<div v-else class="m-5">
					<h1 class="text-center text-secondary">No Results</h1>

					<div class="text-center">
						<SearchIcon size="128" class="text-secondary" />
					</div>
				</div>

				<!-- Success -->
				<BAlert
					v-if="success"
					variant="success"
					show
					class="my-3"
				>Inspector invited!</BAlert>

				<!-- Error -->
				<BAlert
					v-if="error"
					variant="danger"
					show
				>{{ error }}</BAlert>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	// [IMPORT] //
	import { SearchIcon } from 'vue-feather-icons'

	// [IMPORT] Personal //
	import manager_SearchUserService from '@/services/manager/SearchUserService'
	import manager_OrganizationInviteService from '@/services/manager/OrganizationInviteService'

	export default {
		components: {
			SearchIcon
		},

		methods: {
			async search() {
				this.reqData = await manager_SearchUserService.s_searchUser({
					query: this.query,
					limit: 5,
					page: 1,
				})

				console.log(this.reqData);
				if (this.reqData.status) { this.users = this.reqData.userResults }
			},

			async invite(user_id) {
				this.reqData = await manager_OrganizationInviteService.s_create({
					user_id: user_id,
					organization_id: this.organization_id
				})

				if (this.reqData.status) { this.success = true }
				else { this.error = this.reqData.message }
			},
		},

		data() {
			const oganization_id = this.$route.params.organization_id
			return {
				organization_id: oganization_id,
				query: '',
				reqData: {},
				users: [],
				success: false,
				error: '',
			}
		},
	}
</script>