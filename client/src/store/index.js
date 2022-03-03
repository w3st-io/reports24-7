// [IMPORT] //
import Vue from 'vue'
import Vuex from 'vuex'

// [IMPORT] Personal //
import user_organizationInviteService from '../services/user/OrganizationInviteService'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		app_name: '',
		node_env: '',
		client_base_url: 'http://localhost:8080',
		server_base_url: 'http://localhost:5000',
		organizationInvites: []
	},

	// Syncrous //
	mutations: {
		initializeOrganizationInvites(state, organizationInvites) {
			if (organizationInvites) {
				organizationInvites.forEach(oI => {
					state.organizationInvites.push(oI)
				})
			}
		}
	},

	// Asyncronous //
	actions: {
		async initializeOrganizationInvites(state) {
			console.log('running')

			const reqData = await user_organizationInviteService.s_readNotifications()

			state.commit('initializeOrganizationInvites', reqData.organizationInvites)
		}
	},

	getters: {},
	
	modules: {},
});
