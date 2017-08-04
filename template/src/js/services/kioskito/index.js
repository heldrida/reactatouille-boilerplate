import axios from 'axios'
import config from 'config'

class Kioskito {
  static fetchReservation (param) {
    const URL = config.api.reservationFinder.replace('$number_or_memorable_term', param)
    const PROMISE = axios({
      method: 'get',
      url: URL,
      responseType: 'json'
    })
    .then((response) => response.data)
    return PROMISE
  }

  static fetchSku (param) {
    const URL = config.api.skuFinder.replace('$sku', param)
    const PROMISE = axios({
      method: 'get',
      url: URL,
      responseType: 'json'
    })
    .then((response) => response.data)
    return PROMISE
  }

  static createOrder (data) {
    const URL = `${config.api.addToNewOrder}`
    const PROMISE = axios({
      method: 'post',
      url: URL,
      data
    })
    .then((response) => response.data)
    return PROMISE
  }

  static updateOrder (orderId, data) {
    const URL = config.api.addToExistingOrder.replace('$order_id', orderId)
    const PROMISE = axios({
      method: 'post',
      url: URL,
      data
    })
    .then((response) => response.data)
    return PROMISE
  }

  static postCheckout (orderId, data) {
    // const URL = `${config.api.checkout}/${orderId}`
    const URL = config.api.checkout.replace('$order_id', orderId)
    const PROMISE = axios({
      method: 'post',
      url: URL,
      data
    })
    .then((response) => response)
    return PROMISE
  }
}

export default Kioskito
