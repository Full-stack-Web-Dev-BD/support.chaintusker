import { all, call, put, takeEvery } from "redux-saga/effects";
import { loginSuccess, loginFailure, loginStart } from "./loginSlice";
import { RPCError, RPCErrorCode } from "magic-sdk";
import { magicMumbai } from "../../web3/magic";
import axios from "axios";

// Worker
function* loginWorker(action) {
  try {
    // yield put(loginStart());
    const { email } = action.payload;
    const didToken = yield magicMumbai.auth.loginWithEmailOTP({ email });
    const metadata = yield magicMumbai.user.getMetadata();
    let headersList = {
      Accept: "*/*",
      token: didToken,
      "Content-Type": "application/json",
    };

    let reqOptions = {
      url: "https://chaintusker-backend-wtr7x.ondigitalocean.app/signup",
      method: "POST",
      headers: headersList,
    };
    let response = yield axios.request(reqOptions);
    console.log(response.data);

    yield put(loginSuccess(metadata));
  } catch (error) {
    if (error instanceof RPCError) {
      switch (error.code) {
        case RPCErrorCode.MagicLinkExpired:
          // handle error
          console.log("Magic Link Expired");
          break;
        case RPCErrorCode.UserAlreadyLoggedIn:
          // handle error
          console.log("User Already Logged In");
          break;
        default:
          // handle error
          console.log("Unknown Error");
      }
    }
    yield put(loginFailure(error));
  }
}

// Watcher
export function* loginWatcher() {
  yield takeEvery(loginStart.type, loginWorker);
}

// Export
export function* loginSaga() {
  yield all([call(loginWatcher)]);
}
