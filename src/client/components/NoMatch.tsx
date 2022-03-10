import { Heading, Flex } from '@chakra-ui/react';

export const NoMatch = () => {
  return (
    <Flex justify="center" mt={4}>
      <Heading size="md">Sorry, this page does not exist :( </Heading>
    </Flex>
  );
};
