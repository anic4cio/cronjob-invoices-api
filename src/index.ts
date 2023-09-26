import { sendFileToSlack } from './services/slackSender'
import { makePDF } from './services/pdfGenerator'

exports.start = async () => {
  await makePDF()
}
