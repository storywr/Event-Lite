import axios from 'axios'
import { useQuery } from 'react-query'
import api from '../util/api'

const useEvents = (search: string) => {
  return useQuery('events', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api}/events?search=${search}`,
      headers: JSON.parse(localStorage.user)
    })
    return data
  })
}

export default useEvents
