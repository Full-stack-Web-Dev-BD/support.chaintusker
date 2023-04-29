import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchAllSuccess, fetchAllFailure, fetchAllStart } from "./fetchAllSlice";
import axios from "axios";

// Worker
function* fetchAllWorker(action) {
  try {
    // yield put(fetchAllStart());
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: "https://chaintusker-backend-wtr7x.ondigitalocean.app/projects",
      method: "GET",
      headers: headersList,
    };
    let response = yield axios.request(reqOptions);
    console.log(response.data);

    yield put(fetchAllSuccess(response.data));
  } catch (error) {
    yield put(fetchAllFailure(error));
  }
}

// Watcher
export function* fetchAllWatcher() {
  yield takeEvery(fetchAllStart.type, fetchAllWorker);
}

// Export
export function* fetchAllSaga() {
  yield all([call(fetchAllWatcher)]);
}