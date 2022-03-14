import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../common/types';
import { useAuthContext } from '../context/AuthContext';

const getUsers = async (token?: string): Promise<readonly User[]> => {
  const { data } = await axios.get('http://localhost:4000/protected', {
    headers: {
      Authorization: `Bearer ${token ?? ''}`,
    },
  });
  return data;
};

const getUsersQueryKey = () => ['users'];

export const useGetUsers = () => {
  const { authToken } = useAuthContext();

  return useQuery<readonly User[], Error>(getUsersQueryKey(), () => getUsers(authToken));
};
