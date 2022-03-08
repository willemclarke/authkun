import { Box, Flex, Heading } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';

const Nav = () => {
  return (
    <Flex my={4} justify="center">
      <Heading my="4">authkun</Heading>
    </Flex>
  );
};

const Landing = () => {
  return (
    <Flex my={4} justify="center">
      <Heading size="md">Sign up</Heading>
    </Flex>
  );
};

const NoMatch = () => {
  return (
    <Flex justify="center" mt={4}>
      <Heading size="md">Sorry, this page does not exist :(</Heading>
    </Flex>
  );
};

export const App = () => {
  return (
    <Flex h="100vh" flexDir="column">
      <Nav />
      <Box h="100%">
        <Routes>
          <Route index element={<Landing />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </Flex>
  );
};
