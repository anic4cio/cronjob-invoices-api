import { LogLevel, WebClient } from '@slack/web-api'

const slackToken = process.env.SLACK_TOKEN
const channelId = process.env.SLACK_CHANNEL_ID
if (!channelId) throw new Error('channelId not found')

const client = new WebClient(slackToken, { logLevel: LogLevel.INFO })

const today = () => {
  const date = new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo'
  })
  return new Date(date).toISOString()
}

exports.executeJob = async () => {
  const messageToSlack =
		`Hello from most AUTOMATED function around the world!! 💖\n${today()}`
  return await sendMessageToSlack(messageToSlack)
}

const sendMessageToSlack = async (message: string) => {
  try {
    return await client.chat.postMessage({
      channel: channelId,
      text: message
    })
  } catch (error) {
    console.error('Failed to send report message to Slack')
    throw error
  }
}

console.log(today())
