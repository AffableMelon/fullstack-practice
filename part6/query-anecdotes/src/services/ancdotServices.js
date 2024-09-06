import axios from "axios"

const baseurl = 'http://localhost:3001/anecdotes/'

export const getAll = async () => {
    const resp = await axios.get(baseurl)
    return(resp.data)
}


export const addAnc = async (anc) => {
    const resp = await axios.post(baseurl, anc)
    return(resp.data)
}

export const updateAnc = async (changedAnc) => {
    const url = `${baseurl}${changedAnc.id}`
    const resp = await axios.put(url, changedAnc)
    return(resp.data)
}


// export default { getAll, addAnc }