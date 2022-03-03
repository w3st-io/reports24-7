<template>
	<v-calendar
		:attributes="attributes"
		is-expanded
		is-range
		is-light
		custom-data-color="black"
		color="red"
		class="w-100"
	>
		<template v-slot:day-content="{ day, attributes }">
			<div class="h-100 overflow-hidden border">
				<span>{{ day.day }}</span>
				<div>
					<p
						v-for="(attr, index) in attributes"
						:key="index"
						class="mt-0 mb-1 p-1 bg-light text-dark"
					>{{ attr.customData.title }}</p>
				</div>
			</div>
		</template>
	</v-calendar>
</template>

<script>
	export default {
		props: {
			reports: {
				type: Array,
				default: () => { return [] },
			},
		},

		data() {
			return {
				attributes: [],
			}
		},

		async created() {
			this.attributes = this.reports
		},
	}
</script>