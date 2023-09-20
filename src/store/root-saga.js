import { all, call } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.saga';

export function* rootSaga() {
    yield all([call(categoriesSaga, userSagas)]);
}

// function* is the syntax to denote generator function as per ES-6 