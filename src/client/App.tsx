import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Signup } from './components/Signup';
import { Link, Route, Routes } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Logout } from './components/Logout';
import { Nav } from './components/Nav';

export const App = () => {
  return (
    <Flex h="100vh" flexDir="column">
      <Nav />
      <Box h="100%">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </Flex>
  );
};
