import { Button, Flex, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Home = () => {
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
