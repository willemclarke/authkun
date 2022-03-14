import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../common/types';

const getUsers = async (token?: string): Promise<readonly User[]> => {
  const { data } = await axios.get('http://localhost:4000/protected', {
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

const getUsersQueryKey = () => ['users'];

export const useGetUsers = (token?: string) => {
  return useQuery<readonly User[], Error>(getUsersQueryKey(), () => getUsers(token));
};
