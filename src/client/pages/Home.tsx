import React from 'react';
import { Center, Tag, Flex, HStack, List, ListItem, Spinner } from '@chakra-ui/react';
import { useGetUsers } from '../hooks/useGetUsers';

export const Home = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (error || !data) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  const users = data.map((user, index) => {
    return (
      <ListItem key={index}>
        <HStack spacing={4} my={2}>
          <Tag colorScheme="orange" variant="outline">
            {user.username}
          </Tag>
          <Tag variant="outline">{user.id}</Tag>
        </HStack>
      </ListItem>
    );
  });

  return (
    <Flex my={4} justify="center">
      <List>{users}</List>
    </Flex>
  );
};
