// hooks/useUser.js
import useSWR from 'swr';
import axios from 'axios';


const fetcher = url => axios.get(url).then(res => res.data);

export function useUser() {

  const { data, error, mutate } = useSWR('/api/current', fetcher);
  console.log({data})

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
