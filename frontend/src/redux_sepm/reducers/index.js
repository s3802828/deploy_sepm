import { combineReducers } from 'redux';

import authReducer from './user';
import languages from './language';
import categories from "./category";
import {functions, searchReducer} from './function';
import posts from './post'
import comment from './comment';
import profileOwnedPost from './profileOwnedPost';
import profileSavedFunction from './profileSavedFunction';
import profile from './profile';
import user_update from './user_update';

export const reducers = combineReducers({ authReducer, languages, categories, functions, searchReducer, posts, comment, profileOwnedPost, profileSavedFunction, user_update, profile });

