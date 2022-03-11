import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { Link, LinkProps } from 'react-router-dom';

interface Props extends Partial<ButtonProps> {
  to: string;
  label: string;
}
export const LinkButton = (props: Props) => {
  const { to, label, ...rest } = props;

  return (
    <Link to={to}>
      <Button size="sm" colorScheme="orange" {...rest}>
        {label}
      </Button>
    </Link>
  );
};
