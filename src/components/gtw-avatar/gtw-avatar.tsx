import { brandColors } from '@/theme/config/brand';
import BoringAvatar from 'boring-avatars';

import { Avatar } from '@mui/material';

type Props = {
  src?: string | undefined | null;
  name?: string | undefined | null;
  alt?: string | undefined | null;
  size?: number;
  hasBorder?: boolean;
};

const colors = [
  brandColors.primary,
  '#53128C',
  '#70ECFE',
  '#4EA5B1',
  '#F5B5FF',
];

export default function GTWAvatar({ src, name, alt, hasBorder, size }: Props) {
  if (!src) {
    return (
      <BoringAvatar
        variant="marble"
        name={name ?? 'Avatar'}
        size={size}
        colors={colors}
      />
    );
  }

  return (
    <Avatar
      src={src}
      alt={alt ?? name ?? 'Avatar'}
      sx={{
        ...(hasBorder && {
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'divider',
        }),
        ...(size && {
          width: size,
          height: size,
        }),
      }}
    >
      {alt ?? name}
    </Avatar>
  );
}
