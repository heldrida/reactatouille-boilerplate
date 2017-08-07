import axios from 'axios'
import config from 'config'

class MyService {
  static fetchThat (param) {
    const URL = 'google.com'
    const PROMISE = axios({
      method: 'get',
      url: URL,
      responseType: 'json'
    })
    .then((response) => response.data)
    return PROMISE
  }
}

export default MyService
