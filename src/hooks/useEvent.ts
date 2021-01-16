import axios from 'axios'
import { useQuery } from 'react-query'
import api from '../util/api'

const useEvents = (userId: string | number, id: string | number) => {
  return useQuery('event', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api}/users/${userId}/events/${id}`,
      headers: JSON.parse(localStorage.user),
      data: {
        id
      }
    })
    return data
  })
}

export default useEvents
