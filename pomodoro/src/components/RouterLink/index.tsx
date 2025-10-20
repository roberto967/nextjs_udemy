import type React from 'react';
import { Link } from 'react-router';

type RouterLinkProps = {
  children: React.ReactNode;
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function RouterLink({ children, href, ...props }: RouterLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
