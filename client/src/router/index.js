// [IMPORT] //
import Vue from 'vue'
import Router from 'vue-router'


// [IMPORT] Personal (Ordered by path) //
import companyInfo from '@/defaults/companyInfo'
// Home //
import index from '@/pages'
// Activity //
import activity from '@/pages/activity'
// Admin //
import admin from '@/pages/admin'
import admin_function_commentReports from '@/pages/admin/function/comment-reports'
import admin_function_comments from '@/pages/admin/function/comments'
import admin_function_posts from '@/pages/admin/function/posts'
import admin_function_users from '@/pages/admin/function/users'
import admin_login from '@/pages/admin/login'
import admin_profile from '@/pages/admin/profile'
import admin_register from '@/pages/admin/register'
// Cat //
import cat from '@/pages/cat'
// Comment //
import comment_create from '@/pages/comment/create'
import comment_edit from '@/pages/comment/edit'
import comment_reply from '@/pages/comment/reply'
// Client //
import client_create from '@/pages/client/create'
import client_view from '@/pages/client/view'
// Components //
import components from '@/pages/components'
import components_bcarousel from '@/pages/components/bcarousel'
import components_conveyor from '@/pages/components/conveyor'
import components_getQuote from '@/pages/components/get-quote'
import components_parallax from '@/pages/components/parallax'
// Dashboard //
import dashboard from '@/pages/dashboard'
// Email //
import emailSent from '@/pages/email-sent'
// Home //
import home from '@/pages/home'
// Manager //
import manager from '@/pages/manager'
import manager_dashboard from '@/pages/manager/dashboard'
import manager_inspection from '@/pages/manager/inspection'
import manager_inspectionReportAssignment_view from '@/pages/manager/inspection-report-assignment/view'
import manager_inspectionReportAssignment_create from '@/pages/manager/inspection-report-assignment/create'
import manager_login from '@/pages/manager/login'
import manager_organization_create from '@/pages/manager/organization/create'
import manager_organization_addMember from '@/pages/manager/organization/add-member'
import manager_organization_view from '@/pages/manager/organization/view'
import manager_password_change from '@/pages/manager/password/change'
import manager_password_request from '@/pages/manager/password/request'
import manager_password_reset from '@/pages/manager/password/reset'
import manager_profile from '@/pages/manager/profile'
import manager_register from '@/pages/manager/register'
import manager_verify from '@/pages/manager/verify'
// Post //
import post from '@/pages/post'
import post_create from '@/pages/post/create'
// User //
import user from '@/pages/user'
import user_activity from '@/pages/user/activity'
import user_activity_lookup from '@/pages/user/activity/lookup'
import user_dashboard from '@/pages/user/dashboard'
import user_followed from '@/pages/user/followed'
import user_inspectionReport_create from '@/pages/user/inspection-report/create'
import user_inspectionReport_read from '@/pages/user/inspection-report/read'
import user_inspectionReport_readAll from '@/pages/user/inspection-report/read-all'
import user_login from '@/pages/user/login'
import user_notifications from '@/pages/user/notifications'
import user_password_change from '@/pages/user/password/change'
import user_password_request from '@/pages/user/password/request'
import user_password_reset from '@/pages/user/password/reset'
import user_profile from '@/pages/user/profile'
import user_profile_edit from '@/pages/user/profile/edit'
import user_profile_lookup from '@/pages/user/profile/lookup'
import user_register from '@/pages/user/register'
import user_registered from '@/pages/user/registered'
import user_verify from '@/pages/user/verify'
// Search //
import search from '@/pages/search'
// Not-Found //
import NotFound from '@/pages/404'


// [USE] //
Vue.use(Router)


// [EXPORT] //
const router = new Router ({
	mode: 'history',

	routes: [
		// Home //
		{
			path: '/',
			name: '/',
			component: index,
			meta: {
				auth: true,
				title: 'Home'
			}
		},
		// Activity //
		{
			path: '/activity/:sort/:limit/:page',
			name: 'activity',
			component: activity,
			meta: {
				auth: true,
				title: 'Activity'
			}
		},
		// Admin //
		{
			path: '/admin',
			name: 'admin',
			component: admin,
			meta: {
				auth: true,
				title: 'Admin'
			}
		},
		{
			path: '/admin/function/comment-reports/:sort/:limit/:page',
			name: 'admin_f_comment_reports',
			component: admin_function_commentReports,
			meta: {
				auth: true,
				title: 'Admin-f-comment-reports'
			}
		},
		{
			path: '/admin/function/comments/:sort/:limit/:page',
			name: 'admin_f_comment',
			component: admin_function_comments,
			meta: {
				auth: true,
				title: 'Admin-f-comments'
			}
		},
		{
			path: '/admin/function/posts/:sort/:limit/:page',
			name: 'admin_f_posts',
			component: admin_function_posts,
			meta: {
				auth: true,
				title: 'Admin-f-posts'
			}
		},
		{
			path: '/admin/function/users/:sort/:limit/:page',
			name: 'admin_f_users',
			component: admin_function_users,
			meta: {
				auth: true,
				title: 'Admin-f-users'
			}
		},
		{
			path: '/admin/login',
			name: 'admin_login',
			component: admin_login,
			meta: {
				auth: true,
				title: 'Admin Login'
			}
		},
		{
			path: '/admin/profile',
			name: 'admin_profile',
			component: admin_profile,
			meta: {
				auth: true,
				title: 'Admin Profile'
			}
		},
		{
			path: '/admin/register',
			name: 'admin_register',
			component: admin_register,
			meta: {
				auth: true,
				title: 'Admin Register'
			}
		},
		// Cat //
		{
			path: '/cat/:cat_id/:sort/:limit/:page',
			name: 'cat',
			component: cat,
			meta: {
				auth: true,
				title: `Cat -`
			}
		},
		// Client //
		{
			path: '/client/create/:organization_id',
			name: 'client_create',
			component: client_create,
			meta: {
				auth: true,
				title: 'Create Client'
			},
		},
		{
			path: '/client/view/:client_id',
			name: 'client_view',
			component: client_view,
			meta: {
				auth: true,
				title: 'View Client'
			},
		},
		// Components //
		{
			path: '/components',
			name: 'components',
			component: components,
			meta: {
				auth: true,
				title: 'Components'
			},
		},
		{
			path: '/components/bcarousel',
			name: 'components_bcarousel',
			component: components_bcarousel,
			meta: {
				auth: true,
				title: 'Components Carousel'
			},
		},
		{
			path: '/components/conveyor',
			name: 'components_conveyor',
			component: components_conveyor,
			meta: {
				auth: true,
				title: 'Components Carousel'
			},
		},
		{
			path: '/components/get-quote',
			name: 'components_get-quote',
			component: components_getQuote,
			meta: {
				auth: true,
				title: 'Components Get Quote'
			},
		},
		{
			path: '/components/parallax',
			name: 'components_parallax',
			component: components_parallax,
			meta: {
				auth: true,
				title: 'Components Parallax'
			},
		},
		// Comment //
		{
			path: '/comment/create/:post_id',
			name: 'comment_create',
			component: comment_create,
			meta: {
				auth: true,
				title: 'Create Comment'
			}
		},
		{
			path: '/comment/edit/:comment_id',
			name: 'comment_edit',
			component: comment_edit,
			meta: {
				auth: true,
				title: 'Edit Comment'
			}
		},
		{
			path: '/comment/reply/:comment_id',
			name: 'comment_reply',
			component: comment_reply,
			meta: {
				auth: true,
				title: 'Reply to Comment'
			}
		},
		// Dashboard //
		{
			path: '/dashboard',
			name: 'dashboard',
			component: dashboard,
			meta: {
				auth: true,
				title: 'Dashboard'
			}
		},
		// Email //
		{
			path: '/email-sent',
			name: 'email-sent',
			component: emailSent,
			meta: {
				auth: true,
				title: 'Email Sent'
			},
		},
		// Home //
		{
			path: '/home',
			name: 'home',
			component: home,
			meta: {
				auth: true,
				title: 'Home'
			},
		},
		// Manager //
		{
			path: '/manager',
			name: 'manager',
			component: manager,
			meta: {
				auth: true,
				title: 'Manager Dashboard'
			},
		},
		{
			path: '/manager/dashboard/:organization_id',
			name: 'manager_dashboard',
			component: manager_dashboard,
			meta: {
				auth: true,
				title: 'Manager Dashboard'
			},
		},
		{
			path: '/manager/inspection',
			name: 'manager_inspection',
			component: manager_inspection,
			meta: {
				auth: true,
				title: 'Inspection'
			},
		},
		{
			path: '/manager/inspection-report-assignment/create/:organization_id/:pre_user_id/:pre_client_id',
			name: 'manager_inspection-report-assignment_create',
			component: manager_inspectionReportAssignment_create,
			meta: {
				auth: true,
				title: 'Manager Report Event Create'
			}
		},
		{
			path: '/manager/inspection-report-assignment/view/:organization_id/:sort/:limit/:page',
			name: 'manager_inspection-report-assignment_view',
			component: manager_inspectionReportAssignment_view,
			meta: {
				auth: true,
				title: 'Manager Report Events'
			}
		},
		{
			path: '/manager/login',
			name: 'manager_login',
			component: manager_login,
			meta: {
				auth: true,
				title: 'Manager Login'
			},
		},
		{
			path: '/manager/organization/create',
			name: 'manager_organization_create',
			component: manager_organization_create,
			meta: {
				auth: true,
				title: 'Create Organization'
			},
		},
		{
			path: '/manager/organization/add-member/:organization_id',
			name: 'manager_organization_add-member',
			component: manager_organization_addMember,
			meta: {
				auth: true,
				title: 'Add Member'
			},
		},
		{
			path: '/manager/organization/view/:organization_id/:sort/:limit/:page',
			name: 'manager_organization_view',
			component: manager_organization_view,
			meta: {
				auth: true,
				title: 'View Organization'
			},
		},
		{
			path: '/manager/password/change',
			name: 'manager_password_change',
			component: manager_password_change,
			meta: {
				auth: true,
				title: 'Change Password'
			}
		},
		{
			path: '/manager/password/request',
			name: 'manager_request',
			component: manager_password_request,
			meta: {
				auth: true,
				title: 'Request for Password Reset'
			}
		},
		{
			path: '/manager/password/reset/:manager_id/:verification_code',
			name: 'manager_password_reset',
			component: manager_password_reset,
			meta: {
				auth: true,
				title: 'Reset Password'
			}
		},
		{
			path: '/manager/profile',
			name: 'manager_profile',
			component: manager_profile,
			meta: {
				auth: true,
				title: 'Manager Profile'
			}
		},
		{
			path: '/manager/register',
			name: 'manager_register',
			component: manager_register,
			meta: {
				auth: true,
				title: 'Manager Register'
			}
		},
		{
			path: '/manager/verify/:manager_id/:verification_code',
			name: 'manager_verify',
			component: manager_verify,
			meta: {
				auth: true,
				title: 'Verfiying your account..'
			}
		},
		// Post //
		{
			path: '/post/:post_id/:limit/:page',
			name: 'post',
			component: post,
			meta: {
				auth: true,
				title: 'Post -'
			}
		},
		{
			path: '/post/create/:cat_id',
			name: 'post_create',
			component: post_create,
			meta: {
				auth: true,
				title: 'Create a Post'
			}
		},
		// User //
		{
			path: '/user/:sort/:limit/:page',
			name: 'user',
			component: user,
			meta: {
				auth: true,
				title: 'User'
			},
		},
		{
			path: '/user/activity/:sort/:limit/:page',
			name: 'user_activity',
			component: user_activity,
			meta: {
				auth: true,
				title: 'Your Activity'
			}
		},
		{
			path: '/user/activity/lookup/:user_id/:sort/:limit/:page',
			name: 'user_activity_lookup',
			component: user_activity_lookup,
			meta: {
				auth: true,
				title: 'Lookup Activity'
			}
		},
		{
			path: '/user/dashboard/:organization_id/:sort/:limit/:page',
			name: 'user_dashboard',
			component: user_dashboard,
			meta: {
				auth: true,
				title: 'User Dashboard'
			},
		},
		{
			path: '/user/followed/:page',
			name: 'user_followed',
			component: user_followed,
			meta: {
				auth: true,
				title: 'Posts You Are Following'
			}
		},
		{
			path: '/user/inspection-report/create/-/:inspectionreportassignment_id',
			name: 'user_inspection-report_create',
			component: user_inspectionReport_create,
			meta: {
				auth: true,
				title: 'Create a Reports'
			}
		},
		{
			path: '/user/inspection-report/read/-/:inspectionreport_id',
			name: 'user_inspection-report_read',
			component: user_inspectionReport_read,
			meta: {
				auth: true,
				title: 'Read Report'
			}
		},
		{
			path: '/user/inspection-report/read-all/:organization_id/:sort/:limit/:page',
			name: 'user_inspection-report_read-all',
			component: user_inspectionReport_readAll,
			meta: {
				auth: true,
				title: 'Read All Reports'
			}
		},
		{
			path: '/user/login',
			name: 'user_login',
			component: user_login,
			meta: {
				auth: true,
				title: 'Login'
			}
		},
		{
			path: '/user/notifications/:sort/:limit/:page',
			name: 'user_notifications',
			component: user_notifications,
			meta: {
				auth: true,
				title: 'notifications'
			}
		},
		{
			path: '/user/password/change',
			name: 'user_password_change',
			component: user_password_change,
			meta: {
				auth: true,
				title: 'Change Password'
			}
		},
		{
			path: '/user/password/request',
			name: 'user_request',
			component: user_password_request,
			meta: {
				auth: true,
				title: 'Request for Password Reset'
			}
		},
		{
			path: '/user/password/reset/:user_id/:verification_code',
			name: 'user_password_reset',
			component: user_password_reset,
			meta: {
				auth: true,
				title: 'Reset Password'
			}
		},
		{
			path: '/user/profile',
			name: 'user_profile',
			component: user_profile,
			meta: {
				auth: true,
				title: 'Your Profile'
			}
		},
		{
			path: '/user/profile/edit',
			name: 'user_profile_edit',
			component: user_profile_edit,
			meta: {
				auth: true,
				title: 'Edit Your Profile'
			}
		},
		{
			path: '/user/profile/lookup/-/:user_id',
			name: 'user_profile_lookup',
			component: user_profile_lookup,
			meta: {
				auth: true,
				title: ''
			}
		},
		{
			path: '/user/register',
			name: 'user_register',
			component: user_register,
			meta: {
				auth: true,
				title: 'Register'
			}
		},
		{
			path: '/user/registered',
			name: 'user_registered',
			component: user_registered,
			meta: {
				auth: true,
				title: 'Successfully Created Account'
			}
		},
		{
			path: '/user/verify/:user_id/:verification_code',
			name: 'user_verify',
			component: user_verify,
			meta: {
				auth: true,
				title: 'Verfiying your account..'
			}
		},
		// Search //
		{
			path: '/search/:query/:type/:limit/:page',
			name: 'search',
			component: search,
			meta: {
				auth: true,
				title: 'Search'
			}
		},
		// Not-Found //
		{
			path: '/**',
			name: 'not_found',
			component: NotFound,
			meta: {
				auth: true,
				title: '404 Not Found..'
			},
		},
	],
	
	// [VUE-ROUTER] Scroll Behavior //
	scrollBehavior () { return { x: 0, y: 0 } }
})


// [VUE-ROUTER-SET-TITLE] //
router.beforeEach((to, from, next) => {
	document.title = to.meta.title + ' - ' + companyInfo.companyName
	next()
})


export default router