var router = require('express').Router()
var {userAccess, adminAccess} = require('../../controllers/signUpLogin/getRole')
var {login, signup} = require('../../controllers/signUpLogin/auth')
// var {askForEmail, resetPassword} = require('../../controllers/signUpLogin/resetPassword')
var {verifyToken, isAdmin} = require('../../middlewares/authJWT')
var validateAuth = require('../../middlewares/validateAuth')
const { user } = require('../../models/user')

router.get('/user', [verifyToken], userAccess)
router.get('/admin', [verifyToken, isAdmin], adminAccess)

router.post('/signup', [validateAuth.checkDuplicateEmail, validateAuth.checkDuplicateUsername], signup)
router.post('/login', login)
// router.post('/emailforreset', askForEmail)
// router.post('/passwordreset/:userId/:token', resetPassword)

module.exports = router;