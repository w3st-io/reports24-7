<template>
	<BRow class="mb-2 bg-warning">
		<BCol cols="12" class="text-dark">
			<BRow>
				<BCol v-for="(iRQ, i) in inspectionReportQuestions" :key="i" cols="4">
					<h5 class="m-0 text-primary">{{ iRQ.name }}</h5>
					<div v-for="(q, ii) in iRQ.questions" :key="ii">
						<BRow class="border-bottom border-secondary">
							<BCol cols="9">
								<span>{{ q.name }}</span>
							</BCol>
							
							<BCol cols="3">
								<span>{{ iRQ.answers[ii] }}</span>
							</BCol>
						</BRow>
					</div>
				</BCol>
			</BRow>
		</BCol>

		<BCol cols="12" class="text-dark">
			<h5 class="m-0 text-primary">Everything Else</h5>
			general general_image1:
			{{ inspectionReportQuestions[0].general_image1.name }}
			<br>

			pump flowTestAnswers:
			{{ inspectionReportQuestions[9].pump_flowTestAnswers }}
			<br>

			pump pump_flowTestTable:
			{{ inspectionReportQuestions[9].pump_flowTestTable }}
			<br>
			
			pump pump_electricDrivenTable:
			{{ inspectionReportQuestions[9].pump_electricDrivenTable }}
			<br>

			pump pump_whilePumpIsRunningAnswers:
			{{ inspectionReportQuestions[9].pump_whilePumpIsRunningAnswers }}
			<br>

			pump pump_checkListAnswers:
			{{ inspectionReportQuestions[9].pump_checkListAnswers }}
			<br>

			pump pump_image1:
			{{ inspectionReportQuestions[9].pump_image1.name }}
			<br>

			pump pump_image2:
			{{ inspectionReportQuestions[9].pump_image2.name }}
			<br>

			pump pump_image3:
			{{ inspectionReportQuestions[9].pump_image3.name }}
			<br>
		</BCol>
	</BRow>
</template>

<script>
	export default {
		props: {
			inspectionReportQuestions: {
				required: true,
			}
		}
	}
</script>