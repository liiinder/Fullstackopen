import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const createEntry = newObject => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const updateEntry = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}

const deleteEntry = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default { getAll, createEntry, updateEntry, deleteEntry }