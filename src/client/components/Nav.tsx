import React from 'react';
import { Button, Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LinkButton } from './LinkButton';

export const Nav = () => {
  return (
    <Flex mt={4} mb={2} justify="center">
      <HStack spacing={4}>
        <Link to="/">
          <Heading my="2">authkun</Heading>
        </Link>
        <LinkButton to="signup" label="Sign up" />
        <LinkButton to="login" label="Login" />
        <LinkButton to="logout" label="Logout" />
      </HStack>
    </Flex>
  );
};
