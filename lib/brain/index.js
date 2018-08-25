const pify = require('pify');
const Rivescript = require('rivescript');
const debug = require('debug')('genie-router-plugin-rivescript:client');

let rivescriptBot = null;

/**
 * Uses the message.userId / message.sessionId parameter, if
 * they are set, they are used to scope the session in the rivescript bot.
 * If not, a static value is used, which means that the chatsession is shared
 * across all clients.
*/
function getSessionId(message) {
    if (message.sessionId) {
        return message.sessionId;
    }
    if (message.userId) {
        return message.userId;
    }

    return 'rs-session';
}

async function process(message) {
    const sessionId = getSessionId(message);

    const reply = rivescriptBot.reply(sessionId, message.input);
    return { output: reply };
}

async function start(config) {
    rivescriptBot = new Rivescript();
    debug('Loading rivescript .rive files from', config.scripts);
    try {
        await pify(rivescriptBot.loadDirectory.bind(rivescriptBot))(config.scripts);
        rivescriptBot.sortReplies();
        return { process };
    } catch (error) {
        debug('Error loading rive files', error);
        throw new Error(error);
    }
}

module.exports = { start };
