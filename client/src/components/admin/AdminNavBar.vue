<template>
	<nav class="navbar navbar-dark fixed-bottom bg-warning">
		<BButton size="sm" class="mr-2" @click="redirectAdmin()">
			Admin Dashboard
		</BButton>

		<BButton size="sm" class="mr-2" @click="redirectAdminProfile()">
			Admin Profile
		</BButton>

		<BButton variant="warning" class="mr-2 btn-sm" @click="logout()">
			Logout
		</BButton>
	</nav>
</template>

<script>
	// [IMPORT] Personal //
	import router from '@/router'
	import AdminService from '@/services/admin/AdminService'

	// [EXPORT] //
	export default {
		methods: {
			logout() {
				AdminService.s_logout()
			},

			redirectAdmin() { router.push({ name: 'admin' }) },

			redirectAdminProfile() { router.push({ name: 'admin_profile' }) },
		},
	}
</script>