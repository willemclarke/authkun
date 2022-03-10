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
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';

const Nav = () => {
  return (
    <Flex mt={4} mb={2} justify="center">
      <Link to="/">
        <Heading my="4">authkun</Heading>
      </Link>
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
