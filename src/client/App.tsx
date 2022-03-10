import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
} from '@chakra-ui/react';
import { Signup } from './components/Signup';
import { Link, Route, Routes } from 'react-router-dom';

const Nav = () => {
  return (
    <Flex mt={4} mb={2} justify="center">
      <Link to="/">
        <Heading my="4">authkun</Heading>
      </Link>
    </Flex>
  );
};

const Home = () => {
  return (
    <Flex mb={4} justify="center">
      <HStack>
        <Link to="signup">
          <Button colorScheme="orange" size="sm">
            Sign up
          </Button>
        </Link>
        <Link to="login">
          <Button colorScheme="orange" size="sm">
            Login
          </Button>
        </Link>
      </HStack>
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
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </Flex>
  );
};
