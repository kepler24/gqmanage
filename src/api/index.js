import axios from 'axios'

export function getOnePic (parameter) {
  return axios({
    url: '/gao/getOnePic',
    method: 'post',
    data:parameter
  })
}
export function upload (parameter) {
  return axios({
    url: '/gao/upload',
    method: 'post',
    data:parameter
  })
}
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
  export function updatePic (parameter) {
    return axios({
      url: '/gao/updatePic',
      method: 'post',
      data:parameter
    })
  }
  export function getPic (parameter) {
    return axios({
      url: '/gao/getPic',
      method: 'post',
      data:parameter
    })
  }
  export function addPic (parameter) {
    return axios({
      url: '/gao/addPic',
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