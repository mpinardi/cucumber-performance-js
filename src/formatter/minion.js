import _ from 'lodash'

export default class Minion {
  constructor(options) {
    _.assign(this, _.pick(options, ['colorFns', 'strict', 'options']))
  }

  run(object) {
    return object
  }
}
