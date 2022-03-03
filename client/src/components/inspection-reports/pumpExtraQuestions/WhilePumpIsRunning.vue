<template>
	<div class="p-3 bg-light border">
		<BRow class="">
			<BCol cols="12">
				<h4 class="text-primary">While Pump is Running</h4>
				<h5 class="text-secondary">
					(Do not fill out this part of the form if you wish to not include it)
				</h5>
			</BCol>

			<BCol
				v-for="(question, i) in value.pump_whilePumpIsRunningQuestions" :key="i"
				cols="12"
				class="mb-3"
			>
				<h5 class="text-dark">{{ question.text }}</h5>

				<!-- [YNAN] Options -->
				<div v-if="question.type == 'ynan'">
					<label v-for="(o, ii) in question.options" :key="ii" class="mx-3">
						<input
							v-model="value.pump_whilePumpIsRunningAnswers[i]"
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

				<!-- [YNAN] Select -->
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

				<!-- [TEXT-INPUT] Options -->
				<div v-if="question.type == 'text-input'">
					<BFormInput v-model="value.pump_whilePumpIsRunningAnswers[i]" />
				</div>

				<!-- [TEXT-BOX] Options -->
				<div v-if="question.type == 'text-box'">
					<textarea
						v-model="value.pump_whilePumpIsRunningAnswers[i]"
						class="w-100"
						style="height: 200px;"
					></textarea>
				</div>
			</BCol>
		</BRow>
	</div>
</template>

<script>
	export default {
		props: ['value'],
	}
</script>