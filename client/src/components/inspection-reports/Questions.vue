<template>
	<BRow>
		<BCol
			v-for="(question, i) in value.questions" :key="i"
			cols="12"
			class="mb-3"
		>
			<h5 class="text-dark">{{ question.text }}</h5>

			<!-- [YNAN] -->
			<div v-if="question.type == 'ynan'">
				<label v-for="(o, ii) in question.options" :key="ii" class="mx-3">
					<input
						v-model="value.answers[i]"
						type="radio"
						:name="question.name"
						:value="o"	
					>
						<span
							class="h5 mx-2"
							:class="{
								'text-success': o == 'Yes',
								'text-danger': o == 'No',
								'text-dark': o != 'Yes' && o != 'No'
							}"
						>{{ o }}</span>
				</label>
			</div>

			<!-- [SELECT] -->
			<div v-if="question.type == 'select'">
				<select
					v-model="value.answers[i]"
					name="street"
					class="form-control form-select w-100 p-2"
				>
					<option disabled value="">Select an option</option>
					<option
						v-for="(option, i) in question.options"
						:key="i"
					>{{ option }}</option>
				</select>
			</div>

			<!-- [TEXT-INPUT] -->
			<div v-if="question.type == 'text-input'">
				<BFormInput v-model="value.answers[i]" />
			</div>

			<!-- [TEXT-BOX] -->
			<div v-if="question.type == 'text-box'">
				<textarea
					v-model="value.answers[i]"
					class="w-100"
					style="height: 200px;"
				></textarea>
			</div>

			<!-- [DATE-INPUT] -->
			<div v-if="question.type == 'date-input'">
				<input v-model="value.answers[i]" type="date" />
			</div>

			<!-- [IMAGE-UPLOAD] -->
			<div
				v-if="question.type == 'image-upload'"
				class="p-2 border border-secondary"
			>
				<!-- Attachments -->
				<label for="file" class="w-100 h5 form-label text-primary">
					Please Attach Image Here
				</label>
				<input
					type="file"
					:name="question.name"
					:ref="question.name"
					class="mb-3"
					@change="selectFile(question.name)"
				>
			</div>
		</BCol>
	</BRow>
</template>

<script>
	export default {
		props: ['value'],

		methods: {
			selectFile(qName) {
				switch (qName) {
					case 'intro_photo':
						//console.log(this.$refs.intro_photo)
						this.value.general_image1 = this.$refs.intro_photo[0].files[0]
					break;

					case 'pump_label':
						//console.log(this.$refs.pump_label)
						this.value.pump_image1 = this.$refs.pump_label[0].files[0]
					break;

					case 'pump_controller_label':
						//console.log(this.$refs.pump_controller_label)
						this.value.pump_image2 = this.$refs.pump_controller_label[0].files[0]
					break;

					case 'pump_jockey_label':
						//console.log(this.$refs.pump_jockey_label)
						this.value.pump_image3 = this.$refs.pump_jockey_label[0].files[0]
					break;
				
					default:
					break;
				}
			},
		},
	}
</script>