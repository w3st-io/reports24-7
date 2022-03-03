<template>
	<BContainer class="my-5 nav-spacer">
		<BCard bg-variant="white" text-variant="dark" class="shadow">
			<BRow>
				<BCol cols="12" md="6" class="mb-3">
					<h3 class="text-primary">Client Details</h3>

					<h6>
						<span class="text-primary">Client Name:</span>
						{{ client.name }}
					</h6>
					<h6>
						<span class="text-primary">Cliend Address:</span>
						
						{{ client.address.street }}
						{{ client.address.city }},
						{{ client.address.state }}
						{{ client.address.zip }}
					</h6>
					<h6>
						<span class="text-primary">Client Email:</span>
						{{ client.email }}
					</h6>
					<h6>
						<span class="text-primary">Client Number:</span>
						{{ client.phone }}
					</h6>
					<h6>
						<span class="text-primary">Client Fax:</span>
						{{ client.fax }}
					</h6>
					<h6>
						<span class="text-primary">Client Notes:</span>
						{{ client.notes }}
					</h6>
				</BCol>

				<BCol cols="12" md="6" class="mb-3">
					<h3 class="text-primary">Client Representative</h3>
					<h6>
						<span class="text-primary">First Name:</span>
						{{ client.representative.first_name }}
					</h6>
					<h6>
						<span class="text-primary">Last Name:</span>
						{{ client.representative.last_name }}
					</h6>
					<h6>
						<span class="text-primary">Email:</span>
						{{ client.representative.email }}
					</h6>
					<h6>
						<span class="text-primary">Email 2:</span>
						{{ client.representative.email2 }}
					</h6>
					<h6>
						<span class="text-primary">Cell Phone:</span>
						{{ client.representative.cell_phone }}
					</h6>
					<h6>
						<span class="text-primary">Alt Phone:</span>
						{{ client.representative.alt_phone }}
					</h6>	
				</BCol>
			</BRow>

			<BRow>
				<!-- Error -->
				<BCol cols="12">
					<h6 class="text-primary">{{ error }}</h6>
				</BCol>
			</BRow>
		</BCard>
	</BContainer>
</template>

<script>
	// [IMPORT] Personal //
	import PageService from '@/services/PageService'

	export default {
		data() {
			let client_id = this.$route.params.client_id

			return {
				client_id: client_id,
				reqData: {},
				client: {},
				error: '',
			}
		},

		async created() {
			this.reqData = await PageService.s_client_view(
				this.client_id,
				0,
				20,
				1
			)

			if (this.reqData.status) { this.client = this.reqData.client }
			else { this.error - this.reqData.message }
		},
	}
</script>