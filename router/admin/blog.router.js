const express = require('express')
const admin_blog = express.Router()
const { jwtAdminAuth } = require('../../middleware/auth')
const adminBlogController = require('../../controller/admin/blog.controller')
const uploadImage = require('../../utils/uploadImagesBlogs')

admin_blog.get('/blog' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.adminBlog)
admin_blog.get('/addblog' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.adminAddBlog)
admin_blog.post('/createBlog' , jwtAdminAuth, adminBlogController.adminAuth, uploadImage.single('image') ,adminBlogController.admincreateBlog)
admin_blog.get('/editBlog:id' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.adminEditBlog)
admin_blog.post('/updateblog:id' , jwtAdminAuth, adminBlogController.adminAuth, uploadImage.single('image') , adminBlogController.adminUpdateBlog)
admin_blog.get('/deleteblog:id' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.adminDeleteBlog)
admin_blog.get('/activeblog:id' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.activeBlog)
admin_blog.get('/deactiveblog:id' , jwtAdminAuth, adminBlogController.adminAuth, adminBlogController.deactiveBlog)


module.exports = admin_blog