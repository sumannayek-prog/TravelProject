const express = require('express')
const admin_banner = express.Router()
const { jwtAdminAuth } = require('../../middleware/auth')
const { adminAuth } = require('../../controller/admin/banner.controller')
const adminBannerController = require('../../controller/admin/banner.controller')
const uploadImage = require('../../utils/uploadImagesBanner')

admin_banner.get('/bannerr' , jwtAdminAuth, adminAuth, adminBannerController.adminBanner)
admin_banner.get('/addBanner' , jwtAdminAuth, adminAuth, adminBannerController.adminAddBanner)
admin_banner.post('/createBanner' , jwtAdminAuth, adminAuth,uploadImage.single('image'),adminBannerController.adminCreateBanner)
admin_banner.get('/editbanner:id' , jwtAdminAuth, adminAuth, adminBannerController.editBanner)
admin_banner.post('/updatebanner:id' , jwtAdminAuth, adminAuth, uploadImage.single('image'),adminBannerController.updateBanner)
admin_banner.get('/deletebanner:id' , jwtAdminAuth, adminAuth, adminBannerController.deleteBanner)
admin_banner.get("/activeThumps:id", jwtAdminAuth, adminAuth,adminBannerController.activeThumpsBanner);
admin_banner.get("/deactiveThumps:id",jwtAdminAuth, adminAuth, adminBannerController.deactiveThumpsBanner);

module.exports = admin_banner