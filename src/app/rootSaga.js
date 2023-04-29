import {all, call} from 'redux-saga/effects';
import {loginSaga} from '../features/login/loginSaga';
import { fetchAllSaga } from '../features/projects/fetchAllSaga';
import { fetchProjectSaga } from '../features/projects/fetchProjectSaga';

export default function* rootSaga() {
    // Combine all sagas
    yield all([call(loginSaga), call(fetchAllSaga), call(fetchProjectSaga)]);
}   