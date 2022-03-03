// [IMPORT] //
import axios from 'axios'


// [AUTH-TOKEN-SETUP] //
const authAxios = async () => {
	return axios.create({
		baseURL: '/pages',
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
	
	
	// [HOME] //
	s_: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get('/')).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [ACTIVITY] //
	s_activity: async function (sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/activity/${sort}/${limit}/${page}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [ADMIN] //
	s_admin: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get('/admin')).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_admin_function: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get('/admin/function')).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_admin_function_commentReports: async function (sort, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(
					`/admin/function/commentReports/${sort}/${limit}/${page}`
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
	},


	s_admin_function_comments: async function (sort, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(
					`/admin/function/comments/${sort}/${limit}/${page}`
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
	},


	s_admin_function_posts: async function (sort, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/admin/function/posts/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_admin_function_users: async function (sort, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/admin/function/users/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_admin_function_users_record: async function (user_id) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/admin/function/users/record/${user_id}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [CAT] //
	s_cat: async function (cat_id, sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()

			return (
				await authAxios.get(`/cat/${cat_id}/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [CLIENT] //
	s_client_create: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get('/client/create')).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_client_view: async function (client_id, sort, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			const { data } = await authAxios.get(
				`/client/view/${client_id}/${sort}/${limit}/${page}`
			)
	
			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [COMMENT] //
	s_comment_create: async function (post_id) {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/comment/create/${post_id}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_comment_edit: async function (comment_id) {
		try {
			const authAxios = await this.authAxios()
	
			const reqData = (await authAxios.get(`/comment/edit/${comment_id}`))
	
			return reqData.data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_comment_reply: async function (comment_id) {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/comment/reply/${comment_id}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [DASHBOARD] //


	// [MANAGER] //
	s_manager: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/manager`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},

	
	s_manager_dashboard: async function (organization_id) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/manager/dashboard/${organization_id}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_manager_inspectionReportAssignment_create: async function ({ organization_id, pre_client_id, pre_user_id }) {
		try {
			const authAxios = await this.authAxios()
			
			const { data } = await authAxios.get(
				`/manager/inspection-report-assignment/create/${organization_id}/${pre_client_id}/${pre_user_id}`
			)
				
			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_manager_inspectionReportAssignment_view: async function ({ organization_id, sort, limit, page }) {
		try {
			const authAxios = await this.authAxios()
			
			const { data } = await authAxios.get(
				`/manager/inspection-report-assignment/view/${organization_id}/${sort}/${limit}/${page}`
			)
				
			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_manager_organization_create: async function () {
		try {
			const authAxios = await this.authAxios()

			const { data } = await authAxios.get('/manager/organization/create')

			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_organization_view: async function ({ organization_id, sort, limit, page }) {
		try {
			const authAxios = await this.authAxios()

			const { data } = await authAxios.get(
				`/manager/organization/view/${organization_id}/${sort}/${limit}/${page}`
			)

			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_manager_profile: async function () {
		try {
			const authAxios = await this.authAxios()
			
			const { data } = await authAxios.get('/manager/profile')
				
			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [POST] //
	s_post: async function (post_id, limit, page) {
		try {
			const authAxios = await this.authAxios()

			const { data } = await authAxios.get(`/post/${post_id}/${limit}/${page}`)

			return data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_post_create: async function () {
		try {
			const authAxios = await this.authAxios()
	
			return (await authAxios.get(`/post/create`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [USER] //
	s_user: async function ({ sort, limit, page }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.get(`/user/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_activity: async function (sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()

			return (
				await authAxios.get(`/user/activity/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_activity_lookup: async function (user_id, sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(
					`/user/activity/lookup/${user_id}/${sort}/${limit}/${page}`
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
	},


	s_user_dashboard: async function ({ organization_id, sort, limit, page }) {
		try {
			const authAxios = await this.authAxios()
			
			return (
				await authAxios.get(`/user/dashboard/${organization_id}/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_followed: async function (sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/user/followed/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_notifications: async function (sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()
	
			return (
				await authAxios.get(`/user/notification/${sort}/${limit}/${page}`)
			).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_profile: async function () {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get('/user/profile')).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_profile_edit: async function () {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get(`/user/profile/edit`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `UserService: Error --> ${err}`
			}
		}
	},


	s_user_profile_lookup: async function (user_id) {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get(`/user/profile/lookup/-/${user_id}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	s_user_inspectionReport_create: async function () {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get(`/user/inspection-report/create`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},

	s_user_inspectionReport_read: async function ({ inspectionReport_id }) {
		try {
			const authAxios = await this.authAxios()
		
			return (
				await authAxios.get(
					`/user/inspection-report/read/view/${inspectionReport_id}`
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
	},

	s_user_inspectionReport_readAll: async function ({ organization_id, sort, limit, page }) {
		try {
			const authAxios = await this.authAxios()
		
			return (
				await authAxios.get(
					`/user/inspection-report/read-all/${organization_id}/${sort}/${limit}/${page}`
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
	},


	s_user_inspectionReportAssignment: async function (sort = 0, limit, page) {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get(`/user/inspection-report-assignment/${sort}/${limit}/${page}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},


	// [SEARCH] //
	s_search: async function (query, type, limit, page) {
		try {
			const authAxios = await this.authAxios()
		
			return (await authAxios.get(`/search/${query}/${type}/${limit}/${page}`)).data
		}
		catch (err) {
			return {
				executed: false,
				status: false,
				message: `PageService: Error --> ${err}`
			}
		}
	},
}