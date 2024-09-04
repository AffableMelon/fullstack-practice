import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.post(baseUrl, newObj, config)
  return(resp.data)
}

const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token }
  }
  const resp = await axios.delete(url, config)
}

const update = async (newObj, id) => {
  const url = `${baseUrl}/${id}`
  const config = {
    headers: { Authorization: token },
  }
  const resp = await axios.put(url, newObj, config)
  return(resp.data)
}


export default { getAll, setToken, create, update, remove }