// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/api/manager/inspection-report-assignments',
		headers: {
			user_authorization: `Bearer ${localStorage.usertoken}`,
			manager_authorization: `Bearer ${localStorage.managertoken}`,
			admin_authorization: `Bearer ${localStorage.admintoken}`,
		}
	})
}


// [HOME] //
async function s_create({ organization_id, client_id, user_id, due_date }) {
	try {
		const authAxios = await this.authAxios()

		return (
			await authAxios.post(
				'/create',
				{
					organization_id: organization_id,
					client_id: client_id,
					user_id: user_id,
					due_date: due_date,
				}
			)
		).data
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `InspectionReportAssignmentService: Error --> ${err}`
		}
	}
}


// [EXPORT] //
export default {
	authAxios,
	s_create,
}