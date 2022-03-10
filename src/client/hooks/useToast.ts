import { useToast as chakraToast } from '@chakra-ui/react';

export const useToast = () => {
  const toast = chakraToast();

  const successToast = (title: string) => {
    toast({
      title,
      status: 'success',
      isClosable: true,
      duration: 3000,
      position: 'bottom',
    });
  };

  return {
    toast,
    successToast,
  };
};
