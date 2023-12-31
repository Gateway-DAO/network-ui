import { Skeleton, Stack, Typography } from '@mui/material';

type Props = {
  label: string;
  value: string | number;
  dark?: boolean;
  isLoading?: boolean;
};

export default function NumberCard({ label, value, dark, isLoading }: Props) {
  return (
    <Stack
      gap={2}
      justifyContent="space-between"
      sx={{
        backgroundColor: dark ? 'primary.main' : '#771AC91F',
        p: 2,
        borderRadius: 1,
        flex: 1,
        minWidth: '243px',
      }}
    >
      <Typography
        variant="subtitle1"
        color={dark ? 'common.white' : '#9247D3'}
        sx={{ opacity: dark ? 0.7 : 1 }}
      >
        {label}
      </Typography>
      <Typography variant="h5" color={dark ? 'common.white' : 'primary.dark'}>
        {isLoading ? (
          <Skeleton width={100} />
        ) : typeof value === 'number' ? (
          value.toLocaleString()
        ) : (
          value
        )}
      </Typography>
    </Stack>
  );
}
