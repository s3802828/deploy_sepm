var router = require('express').Router();

var { changePassword, addAdmin } = require('../../controllers/signUpLogin/changePassword');
var validateAuth = require('../../middlewares/validateAuth')
var { updatePersonalInfo } = require('../../controllers/ProfilePage/personalInfo')

router.put('/changepass/:id', changePassword);
router.post('/addadmin', [validateAuth.checkDuplicateEmail, validateAuth.checkDuplicateUsername] , addAdmin);
router.put('/update', [validateAuth.checkDuplicateEmail, validateAuth.checkDuplicateUsername], updatePersonalInfo)

module.exports = router;