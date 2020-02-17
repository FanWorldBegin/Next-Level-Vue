import axios from 'axios'
import Nprogress from 'nprogress'
// json-server -d 1500 db.json
// 等待1500 milliseconds before responding
const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000 // throw error if API call takes longer than 10 seconds
})

// when request is about to go, start
apiClient.interceptors.request.use(config => {
  Nprogress.start()
  return config
})

// when response returns, finish the progress bar
apiClient.interceptors.response.use(response => {
  Nprogress.done()
  return response
})
export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id) {
    return apiClient.get('/events/' + id)
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  }
}
