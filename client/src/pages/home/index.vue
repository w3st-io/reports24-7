<template>
	<div>
		<Parallax :imgURL="PageData.parallax" />

		<BContainer class="my-3">
			<BCard text-variant="dark" class="text-center shadow" v-rellax="{ speed: 7 }">
				<BRow>
					<BCol cols="12" class="mb-4 text-center" data-aos="fade">
						<!-- Logo -->
						<h1 class="h1 text-primary">
							{{ PageData.cnt1.r1.c1.title }}
						</h1>
						<h2 class="text-secondary">
							{{ PageData.cnt1.r1.c1.caption }}
						</h2>
					</BCol>
				</BRow>

				<BRow>
					<BCol
						v-for="(c, index) in PageData.cnt1.r2.cx"
						:key="index"
						cols="12" md="4"
						class="mb-5 text-center"
					>
						<!-- Logo -->
						<h1 data-aos="fade-up">{{ c }}</h1>
					</BCol>
				</BRow>

				<BRow class="text-center">
					<BCol cols="12" class="mb-3" data-aos="fade-right">
						<h3>{{ PageData.cnt1.r3.c1.title }}</h3>
					</BCol>

					<BCol cols="12" class="mb-3 text-center">
						<RouterLink to="/dashboard">
							<BButton variant="primary" size="lg" class="mx-2" pill>
								Dashboard
							</BButton>
						</RouterLink>
					</BCol>
				</BRow>
			</BCard>
		</BContainer>
	</div>
</template>

<script>
	import Parallax from '@/components/display/Parallax'
	import PageData from '@/defaults/pages/index'
	import router from '@/router'

	export default {
		data() {
			return {
				PageData: PageData,
			}
		},

		components: {
			Parallax,
		},

		async created() {
			if (localStorage.usertoken && localStorage.managertoken) {
				router.push({ name: 'dashboard' })
			}
			else if (localStorage.usertoken) {
				router.push({
					name: 'user',
					params: {
						sort: 0,
						limit: 5,
						page: 1,
					},
				})
			}
			else if (localStorage.managertoken) {
				router.push({ name: 'manager' })
			}
		},
	}
</script>