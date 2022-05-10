var router = require('express').Router();

var {addComment, editComment, deleteComment} = require('../../controllers/forumPage/commentCRUD');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './../../frontend/public/commentUploads')
    }

})

var upload = multer({
    storage
});

router.post('/comment', upload.single('images'), addComment);
router.put('/comment/update', upload.single('images'), editComment);
router.delete('/comment/delete/:id', deleteComment);

module.exports = router;