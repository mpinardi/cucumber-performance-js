export default class MinionOptionSplitter {
  static split(minion, formatterOptions) {
    let result = minion.split(':')
    return {
      type: result !== undefined ? result[0] : minion,
      options:
        result !== undefined && result.length > 1
          ? getOptions(
              result[1],
              formatterOptions.strict,
              formatterOptions.colorFns,
              formatterOptions.cwd
            )
          : getOptions(
              '',
              formatterOptions.strict,
              formatterOptions.colorFns,
              formatterOptions.cwd
            ),
    }
  }
}

function getOptions(options, strict, colorFns, cwd) {
  let mo = options.includes(',')
    ? options.split(',')
    : options === ''
    ? []
    : [options]
  return {
    options: mo,
    colorFns: colorFns,
    cwd: cwd,
    strict: strict,
  }
}
