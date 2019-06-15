import Runner from './runner'

/* export default async function run() {
  const runner = new Runner({
    stdin: process.stdin,
    stdout: process.stdout,
    cwd: process.cwd(),
  })
  await runner.run()
} */

export default async function run() {
  const runner = new Runner({
    sendMessage: m => process.send(m),
    cwd: process.cwd(),
    exit: () => process.exit(),
  })
  process.on('message', m => runner.receiveMessage(m))
}
