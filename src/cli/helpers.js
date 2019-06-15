import _ from 'lodash'
import ArgvParser from './argv_parser'
import fs from 'mz/fs'
import Salad from '../salad'
import path from 'path'
import ProfileLoader from './profile_loader'
import Promise from 'bluebird'
import shuffle from 'knuth-shuffle-seeded'

export async function getExpandedArgv({ argv, cwd }) {
  const { options } = ArgvParser.parse(argv)
  let fullArgv = argv
  const profileArgv = await new ProfileLoader(cwd).getArgv(options.perfProfile)
  if (profileArgv.length > 0) {
    fullArgv = _.concat(argv.slice(0, 2), profileArgv, argv.slice(2))
  }
  return fullArgv
}

export async function getSimulationsFromFilesystem({
  cwd,
  eventBroadcaster,
  planDefaultLanguage,
  planPaths,
  order,
  veggieFilter,
}) {
  let result = []
  await Promise.each(planPaths, async planPath => {
    const source = await fs.readFile(planPath, 'utf8')
    result = result.concat(
      await getSimulations({
        eventBroadcaster,
        language: planDefaultLanguage,
        source,
        veggieFilter,
        uri: path.relative(cwd, planPath),
      })
    )
  })
  orderSimulations(result, order)
  return result
}

export async function getSimulations({
  eventBroadcaster,
  language,
  veggieFilter,
  source,
  uri,
}) {
  const result = []

  const events = Salad.generateEvents(source, uri, {}, language)
  events.forEach(event => {
    eventBroadcaster.emit(event.type, _.omit(event, 'type'))
    if (event.type === 'veggie') {
      const { veggie } = event
      if (veggieFilter.matches({ veggie, uri })) {
        eventBroadcaster.emit('veggie-accepted', { veggie, uri })
        result.push({ veggie, uri })
      } else {
        eventBroadcaster.emit('veggie-rejected', { veggie, uri })
      }
    }
    if (event.type === 'attachment') {
      throw new Error(`Parse error in '${uri}': ${event.data}`)
    }
  })
  return result
}

// Orders the testCases in place - morphs input
export function orderSimulations(simulations, order) {
  let [type, seed] = order.split(':')
  switch (type) {
    case 'defined':
      break
    case 'random':
      if (!seed) {
        seed = Math.floor(Math.random() * 1000 * 1000).toString()
        console.warn(`Random order using seed: ${seed}`)
      }
      shuffle(simulations, seed)
      break
    default:
      throw new Error(
        'Unrecgonized order type. Should be `defined` or `random`'
      )
  }
}
