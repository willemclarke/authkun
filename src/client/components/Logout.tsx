import React from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { LinkButton } from './LinkButton';

export const Logout = () => {
  return (
    <Flex justify="center">
      <VStack>
        <Heading size="md">Success, you're now logged out</Heading>
        <LinkButton to="login" label="Login" />
      </VStack>
    </Flex>
  );
};
