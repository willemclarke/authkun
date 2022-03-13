import React from 'react';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { LinkButton } from './LinkButton';
import { CheckCircleIcon } from '@chakra-ui/icons';

export const Logout = () => {
  return (
    <Flex justify="center">
      <VStack>
        <CheckCircleIcon w="1.5rem" h="1.5rem" color="green.700" />
        <Heading size="md">Success, you're now logged out</Heading>
      </VStack>
    </Flex>
  );
};
