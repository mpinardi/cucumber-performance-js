import _ from 'lodash'

export default class Formatter {
  constructor(options) {
    _.assign(
      this,
      _.pick(options, [
        'colorFns',
        'cwd',
        'eventBroadcaster',
        'eventDataCollector',
        'log',
        'stream',
        'supportCodeLibrary',
        'options'
      ])
    )
  }

  updateLog(stream)
  {
    this.log = ::stream.write
    this.stream = stream
  }

  isStdio()
  {
    return this.stream._isStdio
  }
}