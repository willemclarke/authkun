import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Signup } from './pages/Signup';
import { Route, Routes } from 'react-router-dom';
import { NoMatch } from './pages/NoMatch';
import { Home } from './pages/Home';
import { Logout } from './pages/Logout';
import { Nav } from './components/Nav';
import { Login } from './pages/Login';
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
