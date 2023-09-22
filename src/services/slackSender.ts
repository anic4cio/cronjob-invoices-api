import { LogLevel, WebClient } from '@slack/web-api'

const slackToken = process.env.SLACK_TOKEN
const channelId = process.env.SLACK_CHANNEL_ID
if (!channelId) throw new Error('channelId not found')

const client = new WebClient(slackToken, { logLevel: LogLevel.INFO })

export const sendFileToSlack = async (params: {
  file: Buffer
  message: string
}) => {
  const { file, message } = params
  try {
    return await client.files.uploadV2({
      initial_comment: message,
      file: file,
      channel: channelId,
    })
  } catch (error) {
    console.error('Failed to send report message to Slack')
    throw error
  }
}
