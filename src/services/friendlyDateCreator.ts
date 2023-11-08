export const makeFriendlyCurrentDate = () => {
  const dayMonthYear = getBrazilianDate().split('/')
  const day = dayMonthYear[0]
  const month = getMonthNameByNumber(dayMonthYear[1])
  const year = dayMonthYear[2]
  if (!day || !month || !year)
    throw new Error('could not generate date indexes')
  return `Brasília-DF, ${day} de ${month} de ${year}`
}

const getBrazilianDate = () => {
  const today = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  })
  const dateWithSlashes = today.split(' ')[0]
  return dateWithSlashes
}

const getMonthNameByNumber = (monthNumber: string) => {
  const currentMonthNumber = parseInt(monthNumber)
  return monthNames.get(currentMonthNumber)
}

const monthNames = new Map([
  [1, 'janeiro'],
  [2, 'fevereiro'],
  [3, 'marco'],
  [4, 'abril'],
  [5, 'maio'],
  [6, 'junho'],
  [7, 'julho'],
  [8, 'agosto'],
  [9, 'setembro'],
  [10, 'outubro'],
  [11, 'novembro'],
  [12, 'dezembro'],
])
