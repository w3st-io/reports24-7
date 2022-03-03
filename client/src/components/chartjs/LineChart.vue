<script>
	// [IMPORT] //
	import { Line } from 'vue-chartjs'

	// [EXPORT] //
	export default {
		mixins: [Line],

		props: {
			labels: {
				type: Array,
				required: true,
			},

			data: {
				type: Array,
				required: true
			},
		},

		mounted: function() {
			// Render the Chart //
			this.renderChart(
				{
					labels: this.labels,
					datasets: [{
						data: this.data,
						backgroundColor: '#b40000',
						borderColor: '#b4000065',
					}]
				},
				{
					elements: { line: { tension: 0 } },
					legend: { display: false, },
					maintainAspectRatio: false,
					responsive: true,
					scales: {
						yAxes: [{
							ticks: {
								fontColor: "black",
								fontSize: 12,
								stepSize: 1,
								beginAtZero: false
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: "black",
								fontSize: 10,
								stepSize: 1,
								beginAtZero: false
							}
						}]
					}
				},
			)
		},
	}
</script>