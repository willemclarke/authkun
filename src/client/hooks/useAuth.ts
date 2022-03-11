import React from 'react';
import { useLocalStorage } from 'react-use';
import { useSignupUser } from './useSignupUser';
import decode from 'jwt-decode';
import { Config } from '../../server/config/config';

interface SignupRequest {
  username: string;
  password: string;
}

interface JwtToken {
  exp: number;
  iat: number;
  id: string;
  username: string;
}

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string | undefined>('token');
  const signupUserMutation = useSignupUser();

  const signupAsync = React.useCallback(
    (request: SignupRequest) => {
      return signupUserMutation.mutateAsync(request).then((res) => {
        setToken(res);
      });
    },
    [signupUserMutation, setToken]
  );

  const signup = {
    ...signupUserMutation,
    signupAsync,
  };

  const login = React.useCallback(() => {}, []);
  const logout = React.useCallback(() => {}, []);

  const isAuthed = React.useMemo(() => {
    if (!token) {
      return false;
    }

    const payload = decode<JwtToken>(token);
    const now = new Date().valueOf() / 1000;

    if (payload.exp < now) {
      return true;
    }
    console.log({ now, payload });
  }, [token]);

  const authToken = React.useMemo(() => {}, []);

  return {
    signup,
    login,
    logout,
    isAuthed,
    authToken,
  };
};
