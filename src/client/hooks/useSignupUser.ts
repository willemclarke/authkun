import axios from 'axios';
import { useMutation } from 'react-query';

interface Variables {
  username: string;
  password: string;
}

type JWT = string;

const postUser = async (variables: Variables): Promise<JWT> => {
  const { data } = await axios.post('http://localhost:4000/register', variables);
  return data;
};

export const useSignupUser = () => {
  return useMutation<JWT, Error, Variables>(postUser);
};
