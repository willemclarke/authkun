import React from 'react';
import { Box, Button, Flex, Heading, HStack, Spinner, VStack } from '@chakra-ui/react';
import { useGetUsers } from '../hooks/useGetUsers';

export const Home = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) {
    return <Spinner />;
  }

  if (error || !data) {
    console.log({ error });
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <Flex my={4} justify="center">
      <VStack spacing={4}>
        <Heading size="md">Currently viewing the homepage</Heading>
      </VStack>
      <Box>{JSON.stringify(data, null, 2)}</Box>
    </Flex>
  );
};
