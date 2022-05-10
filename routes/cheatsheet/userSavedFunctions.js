var router = require('express').Router()

var {userSave, userUnSave} = require('../../controllers/CheatSheet/user_savedFunctions')
var {checkSave, checkUnsave} = require('../../middlewares/checkSave')


router.put('/function/:id/save',[checkSave], userSave)
router.put('/function/:id/unsave',[checkUnsave], userUnSave)



module.exports = router;