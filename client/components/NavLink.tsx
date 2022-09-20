/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { asPath } = useRouter();

  const isActive = asPath === href;

  if (isActive) {
    if (className == null) {
      className = 'active';
    } else {
      className += ' active';
    }
  }

  return (
    <Link href={href}>
      <a className={className}>{children}</a>
    </Link>
  );
}
