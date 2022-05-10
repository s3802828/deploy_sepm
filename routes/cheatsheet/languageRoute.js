var router = require('express').Router();

var {fetchAllLanguages,
    fetchTopicsForLanguage,
    fetchFunctionsForTopic,
    fetchFunctionDetail,
    searchByTopic,
    searchByFunction} 
    = require('../../controllers/CheatSheet/fetchLanguage');

router.get('/languages', fetchAllLanguages);
router.get('/language/:language_id', fetchTopicsForLanguage);
router.get('/topic/:language_id', fetchFunctionsForTopic);
router.get('/function/:id', fetchFunctionDetail)
router.get('/search/topic/:language_id/:keyword', searchByTopic)
router.get('/search/function/:language_id/:keyword', searchByFunction)

module.exports = router;