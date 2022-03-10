import { Button, Flex, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

interface Inputs {
  username: string;
  password: string;
}

export const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit = async (inputs: Inputs) => {
    return fetch('http://localhost:8080/register', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: inputs.username, password: inputs.password }),
    })
      .then((res) => {
        console.log(res.json());
        return res.json();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Flex justify="center" mt={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir="column">
          <FormControl>
            <FormLabel my={1} htmlFor="username" fontWeight="bold">
              Username
            </FormLabel>
            <Input
              my={1}
              id="username"
              placeholder="username"
              {...register('username', { required: true, minLength: 5, maxLength: 10 })}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
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
