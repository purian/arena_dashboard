import moment from 'moment'

export function getDate(date) {
  if (date) {
    return moment(date).format("Do, MMM,  YYYY, h:mm:ss a")
  }
  return 'NA'
}

export function getDateStringFromDate(date) {
  if (date) {
    const dateString = []
    dateString.push(('0' + date.getDate()).slice(-2))
    dateString.push(getMonth(`${date.getMonth() + 1}`))
    dateString.push(date.getFullYear())
    return dateString.join('-')
  }
  return 'NA'
}

function getMonth(month) {
  switch (month) {
    case '1': return 'Jan'
    case '2': return 'Feb'
    case '3': return 'Mar'
    case '4': return 'Apr'
    case '5': return 'May'
    case '6': return 'June'
    case '7': return 'July'
    case '8': return 'Aug'
    case '9': return 'Sep'
    case '10': return 'Oct'
    case '11': return 'Nov'
    case '12': return 'Dec'
    default: return 'NA'
  }
}

export function getDatePayload(date) {
  if (date) {
    date = moment(date).toDate()
    const dateString = []
    dateString.push(date.getFullYear())
    dateString.push(('0' + (date.getMonth() + 1)).slice(-2))
    dateString.push(('0' + date.getDate()).slice(-2))
    return dateString.join('-')
  }
  return 'NA'
}


export function getYear(date) {
  if (date) {
    var d = date;
    var n = d.getFullYear();
    return n
  }
  return 'NA'
}
