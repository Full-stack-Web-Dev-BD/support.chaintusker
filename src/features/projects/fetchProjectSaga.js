import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProjectFailure,
  fetchProjectStart,
  fetchProjectSuccess,
} from "./fetchProjectSlice";
import axios from "axios";

// Worker
function* fetchProjectWorker(action) {
  try {
    // yield put(fetchProjectStart());
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: `https://chaintusker-backend-wtr7x.ondigitalocean.app/projects/${action.payload}`,
      method: "GET",
      headers: headersList,
    };
    let response = yield axios.request(reqOptions);
    console.log(response.data);

    yield put(fetchProjectSuccess(response.data));
  } catch (error) {
    yield put(fetchProjectFailure(error));
  }
}

// Watcher
export function* fetchProjectWatcher() {
  yield takeLatest(fetchProjectStart.type, fetchProjectWorker);
}

// Export
export function* fetchProjectSaga() {
  yield all([call(fetchProjectWatcher)]);
}
