import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavLink({
  href,
  children,
  className,
  scroll,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  scroll?: boolean;
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
    <Link href={href} scroll={scroll}>
      <a className={className}>{children}</a>
    </Link>
  );
}
