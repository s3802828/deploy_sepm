var { updateAvatar } = require('../../controllers/ProfilePage/personalInfo');
var router = require('express').Router();

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './frontend/public/userUploads')
    }

})

var upload = multer({
    storage
});

router.put('/ava/:id', upload.single('avatar'), updateAvatar);

module.exports = router;