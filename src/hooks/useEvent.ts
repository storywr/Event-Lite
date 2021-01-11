import axios from 'axios'
import { useQuery } from 'react-query'
import api from '../util/api'

const useEvents = (id: string | number) => {
  return useQuery('event', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api}/events/${id}`,
      headers: JSON.parse(localStorage.user),
      data: {
        id
      }
    })
    return data
  })
}

export default useEvents
