import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
	routing: routerReducer
});

if (module.hot) {
	module.hot.accept();
};


export default rootReducer;