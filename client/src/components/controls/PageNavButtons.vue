<template>
	<ul class="pagination w-100 m-0">
		<li class="page-item text-center" style="width: 15%;">
			<a class="p-1 page-link" :class="buttonClass" @click="start()">«</a>
		</li>

		<!-- Left -->
		<li class="page-item text-center" style="width: 25%;">
			<a class="p-1 page-link" :class="buttonClass" @click="prev()">⟵</a>
		</li>

		<!-- Page Number -->
		<li class="page-item text-center" style="width: 20%;">
			<a class="p-1 page-link" :class="buttonClass">{{ badgeValue }}</a>
		</li>

		<!-- Right -->
		<li class="page-item text-center" style="width: 25%;">
			<a class="p-1 page-link" :class="buttonClass" @click="next()">⟶</a>
		</li>

		<li class="page-item text-center" style="width: 15%;">
			<a class="p-1 page-link" :class="buttonClass" @click="end()">»</a>
		</li>
	</ul>
</template>

<script>
	export default {
		props: {
			badgeValue: {
				type: Number,
				required: true,
				default: 0,
			},

			bgVariant: {
				type: String,
				default: 'dark'
			}
		},

		data() {
			return {
				buttonClass: 'text-light bg-dark'
			}
		},

		async created() {
			switch (this.bgVariant) {
				case 'primary':
					this.buttonClass = 'text-light bg-primary'
					break

				case 'light':
					this.buttonClass = 'text-dark bg-light'
					break

				case 'dark':
					this.buttonClass = 'text-light bg-dark'
					break

				case 'white':
					this.buttonClass = 'text-dark bg-white'
					break
			
				default:
					this.buttonClass = 'text-dark bg-light'
					break
			}

			// [LOG] //
			//this.log()
		},

		methods: {
			start() { this.$emit('start-btn') },
			
			prev() { this.$emit('prev-btn') },

			next() { this.$emit('next-btn') },

			end() { this.$emit('end-btn') },

			log() {
				console.log('%%% [COMPONENT] PageNavButtons %%%')
				console.log('leftBtnEmitName:', this.leftBtnEmitName)
				console.log('rightBtnEmitName:', this.rightBtnEmitName)
				console.log('badgeValue:', this.badgeValue)
			},
		},
	}
</script>