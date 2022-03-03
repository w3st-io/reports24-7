// [IMPORT] //
import axios from 'axios'
import download from 'downloadjs'


// [AUTH-TOKEN-SETUP] //
async function authAxios() {
	return axios.create({
		baseURL: '/api/user/inspection-reports',
		headers: {
			user_authorization: `Bearer ${localStorage.usertoken}`,
			manager_authorization: `Bearer ${localStorage.managertoken}`,
			admin_authorization: `Bearer ${localStorage.admintoken}`,
		}
	})
}


// [EXPORT] //
export default {
	authAxios,


	/******************* [CRUD] *******************/
	// [CREATE] //
	s_create: async function (formData) {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.post('/create', formData)).data
		}
		catch (err) { return err }
	},


	/******************* [PDF] *******************/
	s_generate: async function ({ inspectionreport_id }) {
		try {
			const authAxios = await this.authAxios()
			
			const res = await authAxios.get(
				`/generate-pdf/${inspectionreport_id}`,
				{ responseType: 'blob' }
			)
				
			download(
				res.data,
				'generated-report.pdf',
				res.headers['content-type', 'text/pdf']
			)
			
			return {
				executed: true,
				status: true,
				message: `Generated report successfully`
			}
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `ReportService: Error --> ${err}`
			}
		}
	}
}