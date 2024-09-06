import axios from "axios"

const baseurl = 'http://localhost:3001/anecdotes'


const getAll = async () => {
    const resp = await axios.get(baseurl)
    return resp.data
}

const createNew = async (anecdot) => {
    const response = await axios.post(baseurl, anecdot)
    return response.data
  }

const updateAnc = async (anecdot) => {
  const url = `${baseurl}/${anecdot.id}`
  const resp = await axios.put(url, anecdot)
  return resp.data
}


export default {getAll, createNew, updateAnc}