import { sendFileToSlack } from './services/slackSender'
import { getAllAppointments } from './services/appointmentsGetter'

exports.start = async () => {
  await sendAppointmentsToSlack()
}

const today = () => {
  const date = new Date().toLocaleString('en-US', {
    timeZone: 'America/Sao_Paulo'
  })
  return new Date(date).toLocaleDateString().replaceAll('/', '-')
}

const getAppointmentsDataBuffer = async () => {
  const acuityAppointments = await getAllAppointments()
  return Buffer.from(JSON.stringify(acuityAppointments))
}

const sendAppointmentsToSlack = async () => {
  const message = today()
  const file = await getAppointmentsDataBuffer()
  await sendFileToSlack({ file, message })
}
