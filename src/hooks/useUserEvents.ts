import axios from 'axios'
import { useQuery } from 'react-query'
import api from '../util/api'

interface Props {
  userId: string | number
  search: string
}

const useEvents = ({ userId, search }: Props) => {
  return useQuery('events', async () => {
    const { data } = await axios({
      method: 'GET',
      url: `${api}/users/${userId}/events?search=${search}`,
      headers: JSON.parse(localStorage.user)
    })
    return data
  })
}

export default useEvents
