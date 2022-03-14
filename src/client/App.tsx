import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Signup } from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import { NoMatch } from './components/NoMatch';
import { Home } from './components/Home';
import { Logout } from './components/Logout';
import { Nav } from './components/Nav';
import { Login } from './components/Login';
import { GuardedRoute } from './components/GuardedRoute';

export const App = () => {
  return (
    <Flex h="100vh" flexDir="column">
      <Nav />
      <Box h="100%">
        <Routes>
          <Route
            path="/"
            element={
              <GuardedRoute>
                <Home />
              </GuardedRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Box>
    </Flex>
  );
};
