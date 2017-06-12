import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { tick, Actions } from '../actions'

function* handleTickAction({ type }) {
    if(type === Actions.START_TICK) {
        while(true) {
            yield call(delay, 1000);
            yield put(tick());
        }
    }
}

export default function* rootSaga() {
    yield takeLatest([Actions.START_TICK, Actions.STOP_TICK], handleTickAction)
}