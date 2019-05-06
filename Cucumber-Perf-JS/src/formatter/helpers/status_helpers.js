import _ from 'lodash'
import {Status}from 'cucumber'

export function isStatusFailure(status) {
    return _.includes([Status.AMBIGUOUS, Status.FAILED], status)
}

export function isStatusWarning(status) {
    return _.includes(
        [Status.PENDING, Status.UNDEFINED],
        status)
}