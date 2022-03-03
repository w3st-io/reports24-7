<template>
	<BContainer class="nav-spacer my-5">
		<BRow>
			<BCol cols="12" md="12">
				<BCard variant="none" class="shadow">
					<BRow>
						<BCol cols="12" class="mb-3">
							<h1 class="text-center text-primary">Inspection</h1>
						</BCol>
						
						<BCol
							cols="12" sm="6" md="4"
							class="mb-4 border-right border-primary"
						>
							<h3>Address</h3>
							<h4 class="text-secondary">{{ inspection.address }}</h4>
						</BCol>

						<BCol
							cols="12" sm="6" md="4"
							class="mb-4 border-right border-primary"
						>
							<h3>Inspector</h3>
							<h4 class="text-secondary">
								{{ inspection.inspector }}
							</h4>
						</BCol>

						<BCol cols="12" sm="12" md="4" class="mb-4">
							<h3>Date</h3>
							<h3 class="text-secondary">
								{{ inspection.date.toLocaleString() }}
							</h3>
						</BCol>

						<BCol cols="12" sm="6" class="mb-3">
							<BButton
								variant="secondary"
								size="lg"
								class="w-100"
							>Edit</BButton>
						</BCol>

						<BCol cols="12" sm="6" class="mb-3">
							<BButton
								variant="outline-primary"
								size="lg"
								class="w-100"
							>Reschedule</BButton>
						</BCol>
					</BRow>
				</BCard>
			</BCol>
		</BRow>
	</BContainer>
</template>

<script>
	export default {
		data() {
			return {
				inspection: {
					address: '123 Main St. Newark',
					inspector: 'Nick Callow',
					date: new Date(),
				}
			}
		},
	}
</script>