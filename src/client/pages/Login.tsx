import React from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { AxiosError } from 'axios';
import { parseServerFieldErrors } from '../utils/utils';

interface FormValues {
  username: string;
  password: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const { login } = useAuthContext();
  const navigate = useNavigate();
  const { successToast } = useToast();

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      login
        .loginAsync(values)
        .then(() => {
          successToast('Successfully logged in!');
          navigate('/', { replace: true });
        })
        .catch((err: AxiosError) => {
          parseServerFieldErrors<FormValues>(err, setError);
        });
    },
    [login, successToast, parseServerFieldErrors, setError]
  );

  return (
    <Flex justify="center" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column" w={{ sm: 300, md: 400, lg: 500, xl: 600 }}>
          <FormControl isInvalid={errors.username || errors.password ? true : false}>
            <FormLabel my={1} htmlFor="username" fontWeight="bold">
              Username
            </FormLabel>
            <Input
              my={1}
              id="username"
              placeholder="username"
              {...register('username', {
                required: true,
                minLength: 5,
                maxLength: 15,
              })}
            />
            <FormErrorMessage overflowX="clip">{errors.username?.message}</FormErrorMessage>
            <FormLabel my={1} htmlFor="password" fontWeight="bold">
              Password
            </FormLabel>
            <Input
              my={1}
              id="password"
              placeholder="password"
              {...register('password', {
                required: true,
                minLength: 5,
                maxLength: 15,
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button my={2} size="md" colorScheme="orange" type="submit" isLoading={login.isLoading}>
            Login
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
