// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/api/manager/organizations',
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

	
	s_create: async function ({ name, email, phone, fax, url, logo_url, address }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.post(
					'/create',
					{
						name: name,
						email: email,
						phone: phone,
						fax: fax,
						url: url,
						logo_url: logo_url,
						address: address,
					}
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `/manager/OrganizationService: Error --> ${err}`
			}
		}
	},
}