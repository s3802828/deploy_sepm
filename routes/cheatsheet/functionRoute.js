var { addFunction, updateFunction, deleteFunction } = require('../../controllers/CheatSheet/functions');
var router = require('express').Router();

router.post('/functions', addFunction)
router.put('/functions/update', updateFunction)
router.delete('/functions/delete/:id', deleteFunction)

module.exports = router;