import { delay } from 'redux-saga'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { tick, Actions } from '../actions'
import { Schedule } from '../gameModel';

const getTick = state => state.getIn(['global','tick']);
let dt = 0;

function* handleTickAction({ type }) {
    if(type === Actions.START_TICK) {
        while(true) {
            let before = Date.now();
            yield call(delay, 1000);
            dt += Date.now() - before;
            while(dt > 1000) {
                yield put(tick());
                dt -= 1000;
            }
        }
    }
}

export function* tickSaga() {
    yield takeLatest([Actions.START_TICK, Actions.STOP_TICK], handleTickAction)
}

function* handleTickSchedule() {
    const tick = yield select(getTick);
    if(Schedule[tick]) yield put(Schedule[tick]());
}

export function* scheduleSaga() {
    yield takeLatest(Actions.TICK, handleTickSchedule)
}

export default function* rootSaga() {
    yield all([
        tickSaga(),
        scheduleSaga()
    ])
}