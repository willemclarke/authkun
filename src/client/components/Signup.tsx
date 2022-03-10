import React from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useSignupUser } from '../hooks/useSignupUser';

interface Inputs {
  username: string;
  password: string;
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<Inputs>();
  const signupUserMutation = useSignupUser();

  const onSubmit = React.useCallback(
    (inputs: Inputs) => {
      signupUserMutation
        .mutateAsync({ ...inputs })
        .then((res) => console.log(res))
        .catch((err) => {
          // capture and setError here in a way react-hook-form understands
          console.log(err);
        });
    },
    [signupUserMutation]
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
            <FormErrorMessage overflowX="clip">
              {errors.username && errors.username.message}
            </FormErrorMessage>
            <FormLabel my={1} htmlFor="password" fontWeight="bold">
              Password
            </FormLabel>
            <Input my={1} id="password" placeholder="password" {...register('password')} />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>
          <Button my={2} size="md" colorScheme="orange" type="submit" isLoading={isSubmitting}>
            Sign up
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
