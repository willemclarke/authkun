import axios from 'axios';
import { useQuery } from 'react-query';
import { PartialUser } from '../../server/services/database.service';

const getUsers = async (): Promise<readonly PartialUser[]> => {
  const { data } = await axios.get('http://localhost:4000/protected');
  return data;
};

const getUsersQueryKey = () => ['users'];

export const useGetUsers = () => {
  return useQuery<readonly PartialUser[], Error>(getUsersQueryKey(), getUsers);
};
