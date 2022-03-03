<template>
	<BDropdown variant="outline-light" size="sm" right class="mx-2">
		<template #button-content>
			<BBadge v-if="$store.state.organizationInvites.length != 0" variant="primary">
				{{ $store.state.organizationInvites.length }}
			</BBadge>
			<BellIcon size="1.7x" class="mx-2" />
		</template>

		<BDropdownItem
			v-for="(oI, i) in $store.state.organizationInvites"
			:key="i"
			class="py-2"
			style="width: 300px;"
		>
			<BRow>
				<BCol cols="12" class="">
					<h5 class="">
						Invitation From:<br>
						{{ oI.organization.name }}
					</h5>
				</BCol>

				<BCol cols="6" class="pr-1">
					<BButton
						variant="primary"
						class="w-100"
						@click="accept(oI._id)"
					>Accept</BButton>
				</BCol>

				<BCol cols="6" class="pl-1">
					<BButton
						variant="secondary"
						class="w-100"
						@click="decline(oI._id)"
					>Decline</BButton>
				</BCol>
			</BRow>
		</BDropdownItem>
	</BDropdown>
</template>

<script>
	// [IMPORT] //
	import { BellIcon } from 'vue-feather-icons'

	// [IMPORT] Personal //
	import OrganizationInviteService from '../../services/user/OrganizationInviteService'

	export default {
		components: {
			BellIcon,
		},

		data() {
			return {
				reqData: {},
			}
		},

		methods: {
			async accept(organizationInvite_id) {
				this.reqData = await OrganizationInviteService.s_accept({
					organizationInvite_id: organizationInvite_id
				})
				
				console.log('accepted resData:', this.reqData)
			},

			async decline(organizationInvite_id) {
				this.reqData = await OrganizationInviteService.s_decline({
					organizationInvite_id: organizationInvite_id
				})
			},
		},
	}
</script>