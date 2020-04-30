import axios from 'axios'
export function deleteOne (parameter) {
  return axios({
    url: '/gao/deleteOne',
    method: 'post',
    data:parameter
  })
}
export function addDaily (parameter) {
    return axios({
      url: '/gao/addDaily',
      method: 'post',
      data:parameter
    })
  }
  export function updateDaily (parameter) {
    return axios({
      url: '/gao/updateDaily',
      method: 'post',
      data:parameter
    })
  }
  export function addDailyTitle (parameter) {
    return axios({
      url: '/gao/addDailyTitle',
      method: 'post',
      data:parameter
    })
  }
  export function getDaily (parameter) {
    return axios({
      url: '/gao/getDaily',
      method: 'post',
      data:parameter
    })
  }
  export function getDailyTitle (parameter) {
    return axios({
      url: '/gao/getDailyTitle',
      method: 'post',
      data:parameter
    })
  }

  export function getOneDaily (parameter) {
    return axios({
      url: '/gao/getOneDaily',
      method: 'post',
      data:parameter
    })
  }