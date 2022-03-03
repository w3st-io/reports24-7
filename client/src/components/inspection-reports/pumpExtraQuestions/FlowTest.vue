<template>
	<div class="p-3 bg-light border">
		<BRow class="">
			<BCol cols="12">
				<h4 class="text-primary">Flow Test</h4>
				<h5 class="text-secondary">
					(Do not fill out this part of the form if you wish to not include it)
				</h5>
			</BCol>

			<BCol
				v-for="(question, i) in value.pump_flowTestQuestions" :key="i"
				cols="12"
				class="mb-3"
			>
				<h5 class="text-dark">{{ question.text }}</h5>

				<!-- [YNAN] Options -->
				<div v-if="question.type == 'ynan'">
					<label v-for="(o, ii) in question.options" :key="ii" class="mx-3">
						<input
							v-model="value.pump_flowTestAnswers[i]"
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
						v-model="value.pump_flowTestAnswers[i]"
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
					<BFormInput v-model="value.pump_flowTestAnswers[i]" />
				</div>

				<!-- [TEXT-BOX] Options -->
				<div v-if="question.type == 'text-box'">
					<textarea
						v-model="value.pump_flowTestAnswers[i]"
						class="w-100"
						style="height: 200px;"
					></textarea>
				</div>

				<!-- [FLOW-TEST-TABLE] -->
				<div
					v-if="question.type == 'flow-test-table'"
					class="p-3 border border-primary"
				>
					<table class="w-100">
						<tr>
							<td></td>

							<td class="px-2"><h5>Driver Speed/RPM</h5></td>

							<td class="px-2"><h5>Suction</h5></td>

							<td class="px-2"><h5>Discharge</h5></td>
						</tr>

						<tr>
							<td>
								<h5>Churn</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[0]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[1]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[2]" />
							</td>
						</tr>

						<tr>
							<td>
								<h5>100%</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[3]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[4]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[5]" />
							</td>
						</tr>

						<tr>
							<td>
								<h5>150%</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[6]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[7]" />
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_flowTestTable[8]" />
							</td>
						</tr>
					</table>
				</div>

				<!-- [ENECTRIC-DRIVEN-TABLE] -->
				<div
					v-if="question.type == 'electric-driven-table'"
					class="p-3 border border-primary"
				>
					<table class="w-100">
						<tr>
							<td></td>

							<td colspan="3" class="px-2">
								<h5 class="text-center">Voltage</h5>
								<hr>
							</td>
							
							<td colspan="3" class="px-2">
								<h5 class="text-center">Amps</h5>
								<hr>
							</td>
						</tr>

						<tr>
							<td>
								<h5>Churn</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[0]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[1]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[2]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[3]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[4]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[5]" />
							</td>
						</tr>

						<tr>
							<td>
								<h5>100%</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[6]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[7]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[8]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[9]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[10]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[11]" />
							</td>
						</tr>

						<tr>
							<td>
								<h5>150%</h5>
							</td>

							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[12]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[13]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[14]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[15]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[16]" />
							</td>
							<td class="px-2">
								<BFormInput v-model="value.pump_electricDrivenTable[17]" />
							</td>
						</tr>
					</table>
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