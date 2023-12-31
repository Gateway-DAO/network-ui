'use client';

import InfiniteLoadMore from '@/components/infinite-load-more/infinite-load-more';
import PdaCardSkeleton from '@/components/pda-card/pda-card-skeleton';
import { useGtwSession } from '@/context/gtw-session-provider';
import { Received_PdasQuery } from '@/services/protocol/types';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Stack } from '@mui/material';

import PDAsList from '../../components/pdas-list';
import PDAsListContainer from '../../components/pdas-list-container';

type Props = {
  pdas: Received_PdasQuery['myPDAs'];
};

export default function ReceivedPDAsList({ pdas: initialPdas }: Props) {
  const { privateApi } = useGtwSession();

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['pdas', privateApi],
      queryFn: async ({ pageParam }) => {
        return (await privateApi!.received_pdas({ take: 6, skip: pageParam }))
          ?.myPDAs;
      },
      getNextPageParam: (lastPage, pages) =>
        lastPage && lastPage.length < 6 ? undefined : pages.length * 6,
      initialData: {
        pageParams: [0],
        pages: [initialPdas],
      },
    });

  const pdas = data?.pages.flat().filter(Boolean);

  return (
    <>
      <Stack gap={1}>
        <PDAsList pdas={pdas ?? []} />
        {privateApi && hasNextPage && (
          <InfiniteLoadMore
            isLoading={isFetchingNextPage}
            onLoadMore={() => fetchNextPage()}
          >
            <PDAsListContainer>
              <PdaCardSkeleton />
              <PdaCardSkeleton />
              <PdaCardSkeleton />
            </PDAsListContainer>
          </InfiniteLoadMore>
        )}
      </Stack>
    </>
  );
}
