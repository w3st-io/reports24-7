<template>
	<div class="nav-spacer">
		<BContainer class="my-5">
			<BCard bg-variant="none" class="shadow">
				<h2 class="text-center text-primary">Guide</h2>
				<h6 class="mb-4 text-center">
					You are logged in as both an inspector and a manager. Please choose your portal to navigate too.
				</h6>

				<BRow>
					<BCol cols="12" sm="6">
						<BButton
							variant="info"
							size="lg"
							class="w-100 mb-3"
							@click="managerRedirect()"
						>Manager Dashboard</BButton>
					</BCol>

					<BCol cols="12" sm="6">
						<BButton
							variant="primary"
							size="lg"
							class="w-100 mb-3"
							@click="userRedirect()"
						>User Dashboard</BButton>
					</BCol>
				</BRow>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	import router from '@/router'

	export default {
		methods: {
			managerRedirect() {
				router.push({ name: 'manager' })
			},

			userRedirect() {
				router.push({
					name: 'user',
					params: {
						sort: 0,
						limit: 5,
						page: 1,
					},
				})
			}
		},
	}
</script>