import React from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface FormValues {
  username: string;
  password: string;
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const { signup } = useAuthContext();
  const { successToast } = useToast();

  const onSubmit = React.useCallback(
    (values: FormValues) => {
      signup
        .signupAsync(values)
        .then(() => {
          successToast('Successfully signed up!');
          navigate('/');
        })
        .catch((err) => {
          console.log(err.response.data);
          setError('username', {
            type: err.response.data.type,
            message: err.response.data.message,
          });
        });
    },
    [signup, successToast, setError]
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
                minLength: { value: 5, message: 'Username should be at least 5 characters long' },
                maxLength: { value: 15, message: 'Username cannot exceed 15 characters' },
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
                minLength: { value: 5, message: 'Password should be at least 5 characters long' },
                maxLength: { value: 20, message: 'Password cannot exceed 20 characters' },
              })}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button my={2} size="md" colorScheme="orange" type="submit" isLoading={signup.isLoading}>
            Sign up
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
