import fetch from 'node-fetch'

import { localStore } from '../store/modules/index'

var cookie = ''
const url = 'https://portal.seppelec.com/a_horas/s1.php'

function login() {
  const params = new URLSearchParams()
  params.append('usuario', localStore.get('seppelMail'))
  params.append('password', localStore.get('seppelPassword'))
  return fetch('https://portal.seppelec.com/core/login.php', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36'
    },
    body: params,
    method: 'POST',
    mode: 'cors'
  }).then(res => {
    cookie = res.headers.get('set-cookie').split(';')[0]
    return res.text()
  }).then(body => {
    if (!body.includes('access_ok')) {
      throw new Error('It was not possible to authenticate')
    }
    return body
  })
}

// Overloads the original fetch function to issue a login automatically
fetch = (originalFetch => {
  return (...args) => {
    const result = originalFetch.apply(this, args)
    return result.then(res => res.text())
      .then(body => {
        if (!body.includes('RESTRICTED ACCESS AREA')) {
          return body
        }
        // If we see the restricted text, log the user in
        return login().then(_ => {
        // After login, set the cookie and retry the function again
          args[1].headers.Cookie = cookie
          const result = originalFetch.apply(this, args)
          return result.then(res => res.text())
        })
      })
  }
})(fetch)

function getSeppFormattedDate(date) {
  const year = date.getFullYear()
  const month = (1 + date.getMonth()).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return day + '/' + month + '/' + year
}

export default {
  getProyects(filter) {
    var params = new URLSearchParams()
    params.append('f', 'auto_busqueda')
    params.append('t', 'trabajo')
    params.append('b', filter)
    return fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        Cookie: cookie
      },
      body: params,
      redirect: 'manual',
      method: 'POST',
      mode: 'cors'
    }).then(body => {
      let m
      const proyects = []
      const regex = /'([0-9A-Z-]+)','([0-9]+)'.*? style="font-size:10px"> - ([^<]*?)<\/span>/g
      while ((m = regex.exec(body)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++
        }
        if (m.length !== 4) {
          throw Error('The proyects could not be recovered')
        }
        const newProyect = {
          proyectName: m[1],
          extProyectId: m[2],
          proyectDescription: m[3],
          isSeppProyect: true
        }
        proyects.push(newProyect)
      }
      return proyects
    })
  },

  getUserId() {
    var params = new URLSearchParams()
    params.append('f', 'Añadir horas')

    return fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        Cookie: cookie
      },
      body: params,
      method: 'POST',
      mode: 'cors'
    }).then(body => {
      const regex = /id="usuario1" value="(\d+)"/gm
      const m = regex.exec(body)
      return m[1]
    })
  },

  uploadWork(userId, date, proyectId, hours) {
    var params = new URLSearchParams()
    params.append('f', 'envio_hora')
    params.append('id', 1)
    params.append('us', userId)
    params.append('fe', getSeppFormattedDate(date))
    params.append('t', proyectId)
    params.append('h', hours)
    params.append('p', 8)

    return fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        Cookie: cookie
      },
      body: params,
      method: 'POST',
      mode: 'cors'
    }).then(body => {
      if (!body.includes('Succesfull')) {
        throw Error('The work could not be uploaded')
      }
    })
  }
}
