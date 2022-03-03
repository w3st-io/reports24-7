// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/api/manager/clients',
		headers: {
			user_authorization: `Bearer ${localStorage.usertoken}`,
			manager_authorization: `Bearer ${localStorage.managertoken}`,
			admin_authorization: `Bearer ${localStorage.admintoken}`,
		}
	})
}


// [HOME] //
async function s_create({ organization_id, name, email, phone, fax, url, address, representative }) {
	try {
		const authAxios = await this.authAxios()

		return (
			await authAxios.post(
				'/create',
				{
					organization_id: organization_id,
					name: name,
					email: email,
					phone: phone,
					fax: fax,
					url: url,
					address: address,
					notes: '',
					representative: representative,
				}
			)
		).data
	}
	catch (err) {
		return {
			executed: false,
			status: false,
			message: `PageService: Error --> ${err}`
		}
	}
}


// [EXPORT] //
export default {
	authAxios,
	s_create,
}