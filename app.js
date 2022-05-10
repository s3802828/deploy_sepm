const app = require('express')();
var path = require('path')
require('dotenv').config();

const cors = require('cors');
const bodyParser = require('body-parser');

const languageRoute = require('./routes/cheatsheet/languageRoute');
const userSavedFunctionsRoute = require('./routes/cheatsheet/userSavedFunctions');
const postDetailsRoute = require('./routes/forumPage/postDetailsRoute');
const avatarRoute = require('./routes/profilePage/avatarRoute');
const userUpdateRoute = require('./routes/profilePage/userUpdate')
const auth = require('./routes/signUpLoginRoutes/auth');
const post = require('./routes/forumPage/post');
const profileRoute = require('./routes/profilePage/profileRoute');
const functionsRoute = require('./routes/cheatsheet/functionRoute')
const postsRoute = require('./routes/forumPage/postRoute')

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/cheatsheet', languageRoute);
app.use('/saved', userSavedFunctionsRoute);
app.use('/postdetails', postDetailsRoute);
app.use('/profile', avatarRoute);
app.use('/user', userUpdateRoute);

app.use('/auth', auth);
app.use('/post', post);


app.use('/cheatsheet', functionsRoute)
app.use('/discussion', postsRoute)
app.use('/profilepage', profileRoute)

// Step 1:
app.use(express.static(path.resolve(__dirname, "./frontend/build")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"));
});

module.exports = app;
