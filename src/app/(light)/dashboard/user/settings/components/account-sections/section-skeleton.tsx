import { Divider, Skeleton, Stack } from '@mui/material';

export default function SectionSkeleton() {
  return (
    <Stack divider={<Divider />}>
      <Skeleton width={200} sx={{ m: 2 }} />
      <Skeleton width={200} sx={{ m: 2 }} />
      <Skeleton width={200} sx={{ m: 2 }} />
    </Stack>
  );
}
