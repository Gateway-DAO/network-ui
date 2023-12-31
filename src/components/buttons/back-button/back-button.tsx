'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';

type Props = {
  href?: string;
};

export default function BackButton({ href }: Props) {
  const router = useRouter();

  return (
    <IconButton
      {...(href
        ? {
            component: Link,
            href,
          }
        : {
            onClick: router.back,
          })}
      sx={{ backgroundColor: 'action.selected' }}
    >
      <ChevronLeftIcon sx={{ color: 'text.secondary' }} />
    </IconButton>
  );
}
