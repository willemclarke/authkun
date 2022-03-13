import React from 'react';
import { Flex, Heading, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LinkButton } from './LinkButton';
import { useAuthContext } from '../context/AuthContext';

export const Nav = () => {
  const { isAuthed, logout } = useAuthContext();

  const content = isAuthed ? (
    <LinkButton to="logout" label="Logout" onClick={logout} />
  ) : (
    <>
      <LinkButton to="signup" label="Sign up" />
      <LinkButton to="login" label="Login" />
      <LinkButton to="logout" label="Logout" onClick={logout} />
    </>
  );
  return (
    <Flex mt={4} mb={2} justify="center">
      <HStack spacing={4}>
        <Link to="/">
          <Heading my="2">authkun</Heading>
        </Link>
        {content}
      </HStack>
    </Flex>
  );
};
