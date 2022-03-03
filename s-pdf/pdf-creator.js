// [REQUIRE] Personal //
const pdf = require('./')
const defaults = require('./defaults')


	// [INIT] Const //
const styling = `
<!-- STYLING -->
<link
	rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
	integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
	crossorigin="anonymous"
>
<style>
	html { zoom: 0.5; }
	
	body {
		height:100vh;
		padding: 0px 20px 0px 20px;
	}
	
	.page { page-break-after: always; }
</style>
`


module.exports = {	
	// [PAGE] frontPage //
	frontPage: function ({ inspectionReport }) {
		return `
			${styling}

			<div class="page" style="page-break-after: always;">
				<!-- Title -->
				<div class="row mb-3">
					<div class="col-12">
						<h2 class="font-weight-bold">Fire Sprinkler Inspection Report</h2>
					</div>
				</div>

				<!-- Client Information -->
				<div class="row mb-3">
					<div class="col-12 w-50">
						<h4 class="font-weight-bold">Client Information</h4>
						<hr>
				
						<h5>
							<span class="font-weight-bold">Client Name:</span>
							${inspectionReport.client.name}
						</h5>
					</div>
				</div>
				
				<!-- Subject Property -->
				<div class="row mb-3 w-50">
					<div class="col-12">
						<h4 class="font-weight-bold">Subject Property</h4>
						<hr>
						<h5>
							${inspectionReport.client.address.street}
							${inspectionReport.client.address.city}
							${inspectionReport.client.address.state}
							${inspectionReport.client.address.zip}
						</h5>
					</div>
				</div>
					
				<!-- Inspection Details -->
				<div class="row mb-3">
					<div class="col-12">
						<h4 class="font-weight-bold">Inspection Details</h4>
						<hr>
				
						<h5>
							<span class="font-weight-bold">Date:</span>
							${
								new Date(
									inspectionReport.inspectionReportAssignment.due_date
								).toLocaleDateString()
							}
						</h5>
					</div>
				</div>
				<br>
				<br>
				
				<table class="w-100">
					<tr>
						<td colspan="3">
							<!-- Title -->
							<h4 class="mb-3 font-weight-bold">
								Inspection Conducted By
							</h4>
						</td>
					</tr>
					<!-- Inspection Conducted By -->
					<tr>
						<td class="pr-4" style="width: 33%;">
							<!-- Logo -->
							<div style="max-height: 300px; overflow: hidden;">
								<img
									src="${inspectionReport.organization.logo_url}"
									class="w-100"
								>
							</div>
						</td>

						<td style="width: 33%;">
							<!-- Company Details -->
							<h5 class="font-weight-bold">
								${inspectionReport.organization.name}
							</h5>
							<h5>
								${inspectionReport.organization.address.street}
								${inspectionReport.organization.address.city}
								${inspectionReport.organization.address.state}
								${inspectionReport.organization.address.zip}
							</h5>
					
							<h5>
								Phone:
								${pdf.formatPhoneNumber(inspectionReport.organization.phone)}
							</h5>
							<h5>
								Fax:
								${pdf.formatPhoneNumber(inspectionReport.organization.fax)}
							</h5>
						</td>

						<td style="width: 33%;">
							<!-- Inspector -->
							<h5 class="font-weight-bold">Inspected By:</h5>
							<h5 class="mb-3">${inspectionReport.user.email}</h5>
					
							<h5 class="font-weight-bold">Inspector's Signature:</h5>
							<br>
							<br>
							<h5>X</h5>
							<hr class="border border-dark">	
						</td>
					</tr>
				</table>
			</div>
		`
	},


	// [PAGE] inspectionAgreement //
	inspectionAgreementPage: function ({ inspectionReport }) {
		// [INIT] //
		let termsList = ''

		// Create list of terms
		defaults.terms.forEach(term => {
			termsList = termsList + `
				<li>
					<div>
						<h6 class="m-0 font-weight-bold">${term.title}</h6>
						<p class="mb-1">${term.text}</p>
						<p class="mb-1">${term.text2}</p>
					</div>
				</li>
			`
		})

		return `
			${styling}

			<div class="page" style="page-break-after: always;">
				<!-- Title -->
				<div class="row mb-3">
					<div class="col-12">
						<h4 class="font-weight-bold">Inspection Agreement</h4>
					</div>
				</div>
				
				<!-- Parties of this Inspection -->
				<div class="row mb-3">
					<div class="col-12">
						<div class="alert alert-primary">
							PARTIES OF THIS INSPECTION AGREEMENT
						</div>
					</div>
					
					<div class="">
						<table class="w-100">
							<tr>
								<!-- BETWEEN -->
								<td>
									<div class="font-weight-bold">BETWEEN</div>
								</td>
							
								<!-- Organization -->
								<td>
									<h6 class="font-weight-bold">
										${inspectionReport.organization.name}
									</h6>
									<h6>
										${inspectionReport.organization.address.street}
										${inspectionReport.organization.address.city}
										${inspectionReport.organization.address.state}
										${inspectionReport.organization.address.zip}
									</h6>
									<h6>
										Phone:
										${pdf.formatPhoneNumber(inspectionReport.organization.phone)}
									</h6>
									<h6>Email: ${inspectionReport.organization.email}</h6>
								</td>
								
								<!-- AND -->
								<td>
									<div class="font-weight-bold">AND</div>
								</td>

								<!-- Client -->
								<td>
									<h6 class="font-weight-bold">
										${inspectionReport.client.name}
									</h6>
									<h6>
										${inspectionReport.client.address.street}
										${inspectionReport.client.address.city}
										${inspectionReport.client.address.state}
										${inspectionReport.client.address.zip}
									</h6>
									<h6>
										Phone:
										${pdf.formatPhoneNumber(inspectionReport.client.phone)}
									</h6>
									<h6>Email: ${inspectionReport.client.email}</h6>
								</td>
							</tr>
						</table>
					</div>
				</div>
				
				<!-- Subject Party -->
				<div class="row mb-3">
					<div class="col-12">
						<div class="alert alert-primary">SUBJECT PROPERTY</div>
					</div>
				
					<div class="col-12">
						<h6>
							${inspectionReport.client.address.street}
							${inspectionReport.client.address.city}
							${inspectionReport.client.address.state}
							${inspectionReport.client.address.zip}
						</h6>
					</div>
				</div>
					
				<!-- Terms and Conditions -->
				<div class="row mb-3">
					<div class="col-12">
						<div class="alert alert-primary">TERMS AND CONDITIONS</div>
					</div>

					<div class="col-12">
						<h6 class="font-weight-bold">
							The parties understand and voluntarily agrees to the following:
						</h6>

						<ul>${termsList}</ul>
					</div>
				</div>
				
				<!-- Privacy Policy -->
				<div class="row mb-3">
					<div class="col-12">
						<div class="alert alert-primary">PRIVACY POLICY</div>
					</div>
					<div class="col-12">
						<p>${defaults.privacyPolicy1}</p>
						<p>${defaults.privacyPolicy2}</p>
					</div>
				</div>
				
				<!-- ACKNOWLEDGEMENTS -->
				<div class="row mb-3">
					<div class="col-12">
						<div class="alert alert-primary">ACKNOWLEDGEMENTS</div>
					</div>
				
					<!-- Client Signature -->
					<div class="col-12">
						<p>${defaults.clientAcknowledgement}</p>
					</div>

					<table class="w-100">
						<tr>
							<td class="px-4" style="width: 80%;">
								<br>
								<br>
								<h6 class="font-weight-bold">
									Client: ${inspectionReport.client.name}
								</h6>
								<h6 class="font-weight-bold">
									Client Representative Signature:
								</h6>
								<hr class="border border-dark">
							</td>

							<td class="px-2" style="width: 20%;">
								<br>
								<br>
								<h6>-</h6>
								<h6 class="font-weight-bold">Date:</h6>
								<hr class="border border-dark">
							</td>
						</tr>
					</table>
					
					<!-- Spacer -->
					<div class="col-12"><br></div>
					
					<!-- User Signature -->
					<div class="col-12">
						<p>${defaults.inspectorAcknowledgement}</p>
					</div>
				
					<table class="w-100">
						<tr>
							<td class="px-4" style="width: 80%;">
								<br>
								<br>
								<h6 class="font-weight-bold">
									Email: ${inspectionReport.user.email}
								</h6>
								<h6 class="font-weight-bold">Inspector Signature:</h6>
								<hr class="border border-dark">
							</td>

							<td class="px-2" style="width: 20%;">
								<br>
								<br>
								<h6>-</h6>
								<h6 class="font-weight-bold">Date:</h6>
								<hr class="border border-dark">
							</td>
						</tr>
					</table>
				</div>
			</div>
		`
	},


	// [PAGE] Section //
	sectionPage: function (sectionName, questions, pump_flowTestTable, pump_electricDrivenTable) {
		if (questions.length > 0) {
			let middle = ''
	
			questions.forEach(gs => {
				let html = ''
	
				switch (gs.type) {
					case 'ynan':
						if (gs.answer == 'Yes') {
							html = `
								<div class="float-left w-50 mb-2 p-2">
									<div
										class="
											p-3
											d-flex
											justify-content-between
											align-items-center
											border
											rounded
											bg-light
										"
									>
										<h6 class="m-0 font-weight-bold">${gs.text}</h6>
										<span class="badge badge-success badge-pill">
											Yes
										</span>	
									</div>
								</div>
							`
						}
						else if (gs.answer == 'No') {
							html = `
								<div class="float-left w-50 mb-2 p-2">
									<div
										class="
											p-3
											d-flex
											justify-content-between
											align-items-center
											border
											rounded
											bg-light
										"
									>
										<h6 class="m-0 font-weight-bold">${gs.text}</h6>
										<span class="badge badge-danger badge-pill">No</span>	
									</div>
								</div>
							`
						}
						else {
							html = `
								<div class="w-50 mb-2 p-2 float-left">
									<div
										class="
											p-3
											d-flex
											justify-content-between
											align-items-center
											border
											rounded
											bg-light
										"
									>
										<h6 class="m-0 font-weight-bold">${gs.text}</h6>
										<span class="badge badge-secondary badge-pill">
											${gs.answer}
										</span>
									</div>
								</div>
							`
						}
					break
	
					case 'select':
						html = `
							<div class="float-left w-100 mb-2 p-2">
								<div class="p-3 border rounded bg-light">
									<h6 class="font-weight-bold">${gs.text}</h6>
									<h6 class="m-0">${gs.answer}</h6>		
								</div>
							</div>
						`
					break
	
					case 'text-input':
						html = `
							<div class="float-left w-100 mb-2 p-2">
								<div class="p-3 border rounded bg-light">
									<h6 class="font-weight-bold">${gs.text}</h6>
									<h6 class="m-0">${gs.answer}</h6>		
								</div>
							</div>
						`
					break
	
					case 'text-box':
						html = `
							<div class="float-left w-100 mb-2 p-2">
								<div class="p-3 border rounded bg-light">
									<h6 class="font-weight-bold">${gs.text}</h6>
									<h6 class="m-0">${gs.answer}</h6>		
								</div>
							</div>
						`
					break
	
					case 'flow-test-table':
						html = `
							<div class="float-left w-100 mb-2 p-2">
								<div class="p-3 border rounded bg-light">
									${pump_flowTestTable}	
								</div>
							</div>
						`
					break
	
					case 'electric-driven-table':
						html = `
							<div class="float-left w-100 mb-2 p-2">
								<div class="p-3 border rounded bg-light">
									${pump_electricDrivenTable}	
								</div>
							</div>
						`
					break
				
					default:
						html = ''
					break
				}
	
				middle = middle + html
			})
	
			return `
				${styling}

				<div>
					<div class="w-100" style="display: inline-block;">
						<h3 class="w-100 text-center text-danger">${sectionName}</h3>
					</div>
	
					<div class="w-100">${middle}</div>
	
					<div class="w-100 mb-2 p-2" style="float: left;"></div>
				</div>
	
				<div class="page" style="page-break-after: always;"></div>
			`
		}
		
		return ''
	},
}