const Rivescript = require('rivescript')
const debug = require('debug')('genie-router-plugin-rivescript:client')

let rivescriptBot = null

function start (config) {
  return new Promise(function (resolve, reject) {
    rivescriptBot = new Rivescript()
    debug('Loading rivescript .rive files from', config.scripts)
    rivescriptBot.loadDirectory(
      config.scripts,
      function () {
        // Done
        rivescriptBot.sortReplies()
        resolve({process: process})
      },
      function (error) {
        debug('Error loading rive files', error)
        reject(new Error(error))
      })
  })
}

function process (message) {
  return new Promise(function (resolve, reject) {
    const sessionId = getSessionId(message)

    const reply = rivescriptBot.reply(sessionId, message.input)
    resolve({'output': reply})
  })
}

/**
 * Uses the message.userId / message.sessionId parameter, if
 * they are set, they are used to scope the session in the rivescript bot.
 * If not, a static value is used, which means that the chatsession is shared
 * across all clients.
*/
function getSessionId (message) {
  if (message.sessionId) {
    return message.sessionId
  }
  if (message.userId) {
    return message.userId
  }

  return 'rs-session'
}

module.exports = {start: start}
