<template>
	<div class="w-100 py-3 text-dark shadow position-absolute nav">
		<BContainer>
			<BRow>
				<!-- Title & Nav Buttons -->
				<BCol cols="5" md="8" class="">
					<!-- Title + Caption -->
					<RouterLink to="/" class="text-weight-bold text-decoration-none">
						<span class="h4 pr-3 font-weight-bold text-light">
							{{ companyInfo.companyName }}
						</span>
						<h6
							v-html="companyInfo.companyCaption"
							class="d-none d-md-block font-weight-bold text-primary"
						></h6>
					</RouterLink>

					<div class="mb-3 d-none d-md-block">
						<RouterLink
							v-for="(button, i) in buttons"
							:key="i"
							:to="button.path"
						>
							<BButton variant="primary" size="sm" class="mr-3">
								<span v-if="button.text">{{ button.text }}</span>
								<span v-else v-html="button.navIcon"></span>
							</BButton>
						</RouterLink>

						<RouterLink v-if="userLogged" to="/user/0/5/1">
							<BButton
								size="sm"
								variant="primary"
								class="mr-3"
							>Inspector Dashboard</BButton>
						</RouterLink>

						<RouterLink v-if="managerLogged" to="/manager">
							<BButton
								size="sm"
								variant="info"
								class="mr-3"
							>Manager Dashboard</BButton>
						</RouterLink>
					</div>
				</BCol>

				<!-- Logo -->
				<BCol cols="7" md="4" class="mb-3">
					<!-- User -->
					<div class="mb-3 text-right">
						<InviteDropMenu v-if="userLogged" style="z-index: 10001;" />

						<BButtonGroup :class="{ 'mr-2': !userLogged }">
							<!-- User Main Button -->
							<BButton
								size="sm"
								variant="primary"
								@click="userMainButton()"
							>
								<h5 class="m-0">{{ user_decoded.username }}</h5>

								<span v-if="!userLogged" style="2em">
									Inspector Login
								</span>
							</BButton>

							<!-- User Logged -->
							<BDropdown
								v-if="userLogged"
								size="sm"
								variant="primary"
								right
								style="z-index: 10001;"
							>
								<RouterLink to="/user/profile">
									<BDropdownItemButton>
										Inpsector Profile
									</BDropdownItemButton>
								</RouterLink>

								<BDropdownItemButton @click="userLogout()">
									Log Out
								</BDropdownItemButton>
							</BDropdown>
						</BButtonGroup>
						
						<RouterLink to="/user/register">
							<BButton
								v-if="!userLogged"
								size="sm"
								variant="outline-primary"
							>Inspector Register</BButton>
						</RouterLink>
					</div>

					<!-- Manager -->
					<div class="mb-3 text-right">
						<BButtonGroup :class="{ 'mr-2': !managerLogged }">
							<!-- Manager Main Button -->
							<BButton
								size="sm"
								variant="info"
								@click="managerMainButton()"
							>
								<h5 class="m-0">{{ manager_decoded.username }}</h5>

								<span v-if="!managerLogged" style="2em">
									Manager Login
								</span>
							</BButton>

							<!-- User Logged -->
							<BDropdown
								v-if="managerLogged"
								size="sm"
								variant="info"
								right
								style="z-index: 10000;"
							>
								<RouterLink to="/manager/profile">
									<BDropdownItemButton>
										Manager Profile
									</BDropdownItemButton>
								</RouterLink>

								<BDropdownItemButton @click="managerLogout()">
									Log Out
								</BDropdownItemButton>
							</BDropdown>
						</BButtonGroup>
						
						<!-- Manager Register -->
						<RouterLink to="/manager/register">
							<BButton
								v-if="!managerLogged"
								size="sm"
								variant="outline-info"
							>Manager Register</BButton>
						</RouterLink>
					</div>					
				</BCol>

				<!-- Hidden Side Menu Button -->
				<BCol cols="12" class="d-block d-md-none">
					<BButton
						variant="primary"
						class="w-100"
						@click="toggle()"
					><MenuIcon /></BButton>
				</BCol>
			</BRow>
		</BContainer>

		<!-- Hidden Side Menu -->
		<SideMenu :sideMenuOpen="sideMenuOpen" @closeMenu="toggle()" />
	</div>
</template>

<script>
	// [IMPORT] //
	import { MenuIcon } from 'vue-feather-icons'

	// [IMPORT] Personal //
	import InviteDropMenu from '@/components/inspector/InviteDropMenu'
	import SideMenu from '@/components/UI/nav/SideMenu'
	import buttons from '@/defaults/pageLinks'
	import companyInfo from '@/defaults/companyInfo'
	import { EventBus } from '@/main'
	import router from '@/router'
	import ManagerService from '@/services/manager/ManagerService'
	import UserService from '@/services/user/UserService'

	export default {
		components: {
			InviteDropMenu,
			MenuIcon,
			SideMenu,
		},

		data() {
			return {
				buttons: buttons,
				companyInfo: companyInfo,
				managerLogged: false,
				manager_decoded: {},
				userLogged: false,
				user_decoded: {},
				sideMenuOpen: false
			}
		},

		async created() {
			await this.userTasks()

			await this.managerTasks()

			if (localStorage.usertoken) { this.userLogged = true }
		},

		methods: {
			// User //
			async userTasks() {
				try {
					if (localStorage.usertoken) {
						this.userLogged = true

						this.user_decoded = await UserService.s_getUserTokenDecodeData()
					}
				}
				catch (err) { console.log(`Navbar: ${err}`) }
			},

			userMainButton() {
				if (this.userLogged) {
					router.push({
						name: 'user',
						params: {
							sort: 0,
							limit: 5,
							page: 1,
						},
					})
				}
				else { router.push({ name: 'user_login' }) }
			},

			userLogout() { UserService.s_logout() },

			// Manager //
			async managerTasks() {
				try {
					if (localStorage.managertoken) {
						this.managerLogged = true

						this.manager_decoded = await ManagerService.s_getManagerTokenDecodeData()
					}
				}
				catch (err) { console.log(`Navbar: ${err}`) }
			},

			managerMainButton() {
				if (this.managerLogged) { router.push({ name: 'manager' }) }
				else { router.push({ name: 'manager_login' }) }
			},

			managerLogout() { ManagerService.s_logout() },

			// Search //
			searchRedirect() {
				if (this.query) {
					router.push({
						name: 'search',
						params: {
							type: 'posts',
							query: this.query,
							limit: 5,
							page: 1,
						}
					})
	
					EventBus.$emit('force-rerender')
				}
			},

			toggle() { this.sideMenuOpen = !this.sideMenuOpen },
		},
	}
</script>

<style lang="scss" scoped>
	.nav {
		top: 0;
		z-index: 10;
		background-color: rgba(0, 0, 0, 0.726) !important;
	}
</style>