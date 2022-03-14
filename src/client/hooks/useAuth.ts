import React from 'react';
import { useLocalStorage } from 'react-use';
import { useLoginUser } from './useLoginUser';
import { useSignupUser } from './useSignupUser';
import decode from 'jwt-decode';
import { JwtToken } from '../../common/types';

interface Request {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [token, setToken, remove] = useLocalStorage<string | undefined>('auth');

  const signupUserMutation = useSignupUser();
  const loginUserMutation = useLoginUser();

  const signupAsync = React.useCallback(
    (request: Request) => {
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

  const loginAsync = React.useCallback(
    (request: Request) => {
      return loginUserMutation.mutateAsync(request).then((res) => {
        setToken(res);
      });
    },
    [loginUserMutation, setToken]
  );

  const login = {
    ...loginUserMutation,
    loginAsync,
  };

  const logout = React.useCallback(() => remove(), [remove]);

  const isAuthenticated = React.useMemo(() => {
    if (!token) {
      return false;
    }

    const payload = decode<JwtToken>(token);
    const now = new Date().valueOf() / 1000;

    // if the tokens expiry > then current date, token is valid
    const isExpired = payload.exp > now;
    return isExpired;
  }, [token]);

  const authToken = React.useMemo(() => token, [token]);

  return {
    signup,
    login,
    logout,
    isAuthenticated,
    authToken,
  };
};
