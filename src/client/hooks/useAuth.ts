import React from 'react';
import { useLocalStorage } from 'react-use';
import { useLoginUser } from './useLoginUser';
import { useSignupUser } from './useSignupUser';
import decode from 'jwt-decode';
import { JwtToken } from '../../common/types';

interface SignupRequest {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [token, setToken] = useLocalStorage<string>('token');

  const signupUserMutation = useSignupUser();
  const loginUserMutation = useLoginUser();

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

  const loginAsync = React.useCallback(
    (request: SignupRequest) => {
      return loginUserMutation.mutateAsync(request).then((res) => {
        setToken(res);
      });
    },
    [loginUserMutation, setToken]
  );

  const login = {
    ...loginAsync,
    signupAsync,
  };

  const logout = React.useCallback(() => {
    return setToken(undefined);
  }, []);

  const isAuthed = React.useMemo(() => {
    if (!token) {
      return false;
    }

    const payload = decode<JwtToken>(token);
    const now = new Date().valueOf() / 1000;

    const isExpired = payload.exp > now;
    return isExpired;
  }, [token]);

  const authToken = React.useMemo(() => token, [token]);

  return {
    signup,
    login,
    logout,
    isAuthed,
    authToken,
  };
};
