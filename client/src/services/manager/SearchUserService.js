// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/api/manager/search-users',
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

	
	s_searchUser: async function ({ query, limit, page }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.get(
					`/${query}/${limit}/${page}`,
				)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `/manager/SearchUserService: Error --> ${err}`
			}
		}
	},
}