import get from 'axios'

const acuityToken = process.env.TOKEN

interface IAcuityAppointment {
  id: number
  firstName: string
  lastName: string
  email: string
  date: string
  datetimeCreated?: string
  datetime: string
  paid: string
  notes: string
}

export const getAllAppointments = async () => {
  const options = {
    method: 'GET',
    url: 'https://acuityscheduling.com/api/v1/appointments?max=1000&canceled=false&excludeForms=false&direction=DESC',
    headers: {
      accept: 'application/json',
      authorization: acuityToken
    }
  }
  const response = await get<IAcuityAppointment[]>(options)
  return { appointments: response.data }
}
