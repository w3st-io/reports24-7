// [REQUIRE] //
const cors = require('cors')
const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
const socketIO = require('socket.io')


// [REQUIRE] Personal //
const config = require('./s-config')
const Functionality = require('./s-middleware/Functionality')
const rateLimiter = require('./s-rate-limiters')
const s_socket = require('./s-socket')
// [API-ROUTES] //
const a_ = require('./s-routes/api')
const a_admin = require('./s-routes/api/admin')
const a_admin_commentReports = require('./s-routes/api/admin/comment-reports')
const a_admin_comments = require('./s-routes/api/admin/comments')
const a_admin_posts = require('./s-routes/api/admin/posts')
const a_admin_users = require('./s-routes/api/admin/users')
const a_mail = require('./s-routes/api/mail')
const a_manager = require('./s-routes/api/manager')
const a_manager_clients = require('./s-routes/api/manager/clients')
const a_manager_inspectionReportAssignments = require('./s-routes/api/manager/inspection-report-assignments')
const a_manager_organizations = require('./s-routes/api/manager/organizations')
const a_manager_organizationInvites = require('./s-routes/api/manager/organization-invites')
const a_manager_searchUsers = require('./s-routes/api/manager/search-users')
const a_user = require('./s-routes/api/user')
const a_user_comments = require('./s-routes/api/user/comments')
const a_user_inspectionReports = require('./s-routes/api/user/inspection-reports')
const a_user_notifications = require('./s-routes/api/user/notifications')
const a_user_organizationInvites = require('./s-routes/api/user/organization-invites')
const a_user_posts = require('./s-routes/api/user/posts')
// [PAGE-ROUTES] //
const p_ = require('./s-routes/pages')
const p_activity = require('./s-routes/pages/activity')
const p_admin = require('./s-routes/pages/admin')
const p_admin_function_commentReports = require('./s-routes/pages/admin/function/comment-reports')
const p_admin_function_comments = require('./s-routes/pages/admin/function/comments')
const p_admin_function_posts = require('./s-routes/pages/admin/function/posts')
const p_admin_function_users = require('./s-routes/pages/admin/function/users')
const p_cat = require('./s-routes/pages/cat')
const p_client_create = require('./s-routes/pages/client/create')
const p_client_view = require('./s-routes/pages/client/view')
const p_comment_create = require('./s-routes/pages/comment/create')
const p_comment_edit = require('./s-routes/pages/comment/edit')
const p_comment_reply = require('./s-routes/pages/comment/reply')
const p_dashboard = require('./s-routes/pages/dashboard')
const p_manager = require('./s-routes/pages/manager')
const p_manager_dashboard = require('./s-routes/pages/manager/dashboard')
const p_manager_inspectionReportAssignment_create = require('./s-routes/pages/manager/inspection-report-assignment/create')
const p_manager_inspectionReportAssignment_view = require('./s-routes/pages/manager/inspection-report-assignment/view')
const p_manager_organization_create = require('./s-routes/pages/manager/organization/create')
const p_manager_organization_view = require('./s-routes/pages/manager/organization/view')
const p_manager_profile = require('./s-routes/pages/manager/profile')
const p_post = require('./s-routes/pages/post')
const p_post_create = require('./s-routes/pages/post/create')
const p_search = require('./s-routes/pages/search')
const p_user = require('./s-routes/pages/user')
const p_user_activity = require('./s-routes/pages/user/activity')
const p_user_activity_lookup = require('./s-routes/pages/user/activity/lookup')
const p_user_dashboard = require('./s-routes/pages/user/dashboard')
const p_user_followed = require('./s-routes/pages/user/followed')
const p_user_notifications = require('./s-routes/pages/user/notifications')
const p_user_profile = require('./s-routes/pages/user/profile')
const p_user_profile_edit = require('./s-routes/pages/user/profile/edit')
const p_user_profile_lookup = require('./s-routes/pages/user/profile/lookup')
const p_user_inspectionReport_create = require('./s-routes/pages/user/inspection-report/create')
const p_user_inspectionReport_read = require('./s-routes/pages/user/inspection-report/read')
const p_user_inspectionReport_readAll = require('./s-routes/pages/user/inspection-report/read-all')
const p_user_inspectionReportAssignment = require('./s-routes/pages/user/inspection-report-assignment')


// [INIT] Const //
const port = config.PORT


// [EXPRESS + SERVER] //
const app = express()
const server = http.createServer(app)


// [SOCKET.IO] //
const io = socketIO.listen(server)
s_socket.start(io)
app.io = io


// [MONGOOSE-CONNECTION] //
mongoose.connect(
	config.MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	(err, connected) => {
		if (connected) { console.log('Mongoose Connected to DB') }
		else { console.log(`Mongoose Connection Error --> ${err}`) }
	}
)


// [USE] // Default Stuff // Set static Folder // Rate-Limiter //
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/static', express.static(__dirname + '/s-static'))
app.use(rateLimiter.limiter)


// [USE] Personal //
// API //
app.use('/api', a_)
app.use('/api/admin', Functionality.admin(), a_admin)
app.use('/api/admin/comment-reports', Functionality.admin(), a_admin_commentReports)
app.use('/api/admin/comments', Functionality.admin(), a_admin_comments)
app.use('/api/admin/posts', Functionality.admin(), a_admin_posts)
app.use('/api/admin/users', Functionality.admin(), a_admin_users)
app.use('/api/manager', Functionality.manager(), a_manager)
app.use('/api/manager/clients', Functionality.manager(), a_manager_clients)
app.use('/api/manager/inspection-report-assignments', Functionality.manager(), a_manager_inspectionReportAssignments)
app.use('/api/manager/organizations', Functionality.manager(), a_manager_organizations)
app.use('/api/manager/organization-invites', Functionality.manager(), a_manager_organizationInvites)
app.use('/api/manager/search-users', Functionality.manager(), a_manager_searchUsers)
app.use('/api/mail', a_mail)
app.use('/api/user', Functionality.user(), a_user)
app.use('/api/user/comments', Functionality.comments(), a_user_comments)
app.use('/api/user/inspection-reports', Functionality.user(), a_user_inspectionReports)
app.use('/api/user/notifications', Functionality.user(), a_user_notifications)
app.use('/api/user/organization-invites', Functionality.user(), a_user_organizationInvites)
app.use('/api/user/posts', Functionality.posts(), a_user_posts)
// Pages //
app.use('/pages', p_)
app.use('/pages/activity', p_activity)
app.use('/pages/admin', p_admin)
app.use('/pages/admin/function/commentReports', p_admin_function_commentReports)
app.use('/pages/admin/function/comments', p_admin_function_comments)
app.use('/pages/admin/function/posts', p_admin_function_posts)
app.use('/pages/admin/function/users', p_admin_function_users)
app.use('/pages/cat', p_cat)
app.use('/pages/client/create', p_client_create)
app.use('/pages/client/view', p_client_view)
app.use('/pages/comment/create', p_comment_create)
app.use('/pages/comment/edit', p_comment_edit)
app.use('/pages/comment/reply', p_comment_reply)
app.use('/pages/dashboard', p_dashboard)
app.use('/pages/manager', p_manager)
app.use('/pages/manager/dashboard', p_manager_dashboard)
app.use('/pages/manager/inspection-report-assignment/create', p_manager_inspectionReportAssignment_create)
app.use('/pages/manager/inspection-report-assignment/view', p_manager_inspectionReportAssignment_view)
app.use('/pages/manager/organization/create', p_manager_organization_create)
app.use('/pages/manager/organization/view', p_manager_organization_view)
app.use('/pages/manager/profile', p_manager_profile)
app.use('/pages/post', p_post)
app.use('/pages/post/create', p_post_create)
app.use('/pages/search', p_search)
app.use('/pages/user', p_user)
app.use('/pages/user/activity', p_user_activity)
app.use('/pages/user/activity/lookup', p_user_activity_lookup)
app.use('/pages/user/dashboard', p_user_dashboard)
app.use('/pages/user/followed', p_user_followed)
app.use('/pages/user/notification', p_user_notifications)
app.use('/pages/user/profile', p_user_profile)
app.use('/pages/user/profile/edit', p_user_profile_edit)
app.use('/pages/user/profile/lookup', p_user_profile_lookup)
app.use('/pages/user/inspection-report/create', p_user_inspectionReport_create)
app.use('/pages/user/inspection-report/read', p_user_inspectionReport_read)
app.use('/pages/user/inspection-report/read-all', p_user_inspectionReport_readAll)
app.use('/pages/user/inspection-report-assignment', p_user_inspectionReportAssignment)


// [HEROKU] Set Static Folder for Heroku //
if (config.NODE_ENV == 'production') {
	app.use(express.static('client/dist'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
	})
}


// [LISTEN] //
server.listen(port, () => { console.log(`Server Running on Port: ${port}`) })