import axios from 'axios';
import { useQuery } from 'react-query';
import { User } from '../../common/types';

const getUsers = async (): Promise<readonly User[]> => {
  const { data } = await axios.get('http://localhost:4000/protected');
  return data;
};

const getUsersQueryKey = () => ['users'];

export const useGetUsers = () => {
  return useQuery<readonly User[], Error>(getUsersQueryKey(), getUsers);
};
