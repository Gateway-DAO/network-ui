'use client';
import { useState } from 'react';

import ClearFiltersButton from '@/components/search-filters/clear-filters-button';
import SortByField, {
  SortByOption,
} from '@/components/search-filters/sort-by-field';
import TagsField from '@/components/search-filters/tags-field';
import SearchSection from '@/components/search-section/search-section';
import { useGtwSession } from '@/context/gtw-session-provider';
import useOrganization from '@/hooks/use-organization';
import { explorerDataModels } from '@/locale/en/datamodel';
import { apiPublic } from '@/services/protocol/api';
import {
  DataModel,
  IdentifierType,
  PermissionType,
} from '@/services/protocol/types';
import { useDebouncedState } from '@react-hookz/web';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import AmountOfIssuancesField from './fields/amount-of-issuances-field';
import ConsumpitonPriceField from './fields/consumpiton-price-field';
import SearchCard from './search-card';

const sortOptions: SortByOption<DataModel>[] = [
  {
    key: 'newest',
    label: 'Newest',
    value: undefined,
  },
  { key: 'oldest', label: 'Oldest', value: { createdAt: 'ASC' } },
  {
    key: 'price-high-to-low',
    label: 'Price high to low',
    value: { consumptionPrice: 'DESC' },
  },
  {
    key: 'price-low-to-high',
    label: 'Price low to high',
    value: { consumptionPrice: 'ASC' },
  },
];

export default function DataModelsSearch() {
  const { organization } = useOrganization();
  const { session } = useGtwSession();
  const [search, setSearch] = useDebouncedState('', 500);
  const [selectedSort, setSort] = useState<SortByOption<DataModel>>();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedConsumptionPrice, setSelectedConsumptionPrice] = useState<
    number[]
  >([]);
  const [selectedAmountOfIssuances, setSelectedAmountOfIssuances] = useState<
    number[]
  >([]);

  const metadata = useQuery({
    queryKey: ['data-models-metadata'],
    queryFn: () => apiPublic.explorer_data_models_metadata(),
  });

  const tags = metadata.data?.dataModelsMetadata.tags ?? [];
  const consumptionPrice =
    metadata.data?.dataModelsMetadata.consumptionPrice ?? 0;

  const dataModelsQuery = useInfiniteQuery({
    queryKey: [
      'data-models',
      selectedTags,
      selectedConsumptionPrice,
      selectedConsumptionPrice[0],
      selectedConsumptionPrice[1],
      selectedAmountOfIssuances,
      selectedAmountOfIssuances[0],
      selectedAmountOfIssuances[1],
      selectedSort?.value,
      search,
      organization,
      organization?.gatewayId,
      session.user.gatewayId,
    ],
    queryFn: ({ pageParam = 0 }) =>
      apiPublic.data_models_list_to_issue({
        filter: {
          tags: selectedTags.length > 0 ? selectedTags : undefined,
          consumptionPrice:
            selectedConsumptionPrice.length > 0
              ? {
                  min: selectedConsumptionPrice[0],
                  max: selectedConsumptionPrice[1],
                }
              : undefined,
          permissioning: [PermissionType.All, PermissionType.SpecificIds],
          allowedIssuers: [
            {
              type: IdentifierType.GatewayId,
              value: (organization
                ? organization.gatewayId
                : session.user.gatewayId) as string,
            },
          ],
          // issuedCount:
          //   selectedAmountOfIssuances.length > 0
          //     ? {
          //         min: selectedAmountOfIssuances[0],
          //         max: selectedAmountOfIssuances[1],
          //       }
          //     : undefined,
          search: search.length > 0 ? search : undefined,
        },
        skip: pageParam,
        order: selectedSort?.value,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.dataModels.length === 12 ? allPages.length * 12 : undefined,
  });

  const dataModels =
    dataModelsQuery.data?.pages?.flatMap(({ dataModels }) => dataModels) ?? [];

  const isFiltering =
    selectedTags.length > 0 ||
    selectedConsumptionPrice.length > 0 ||
    selectedAmountOfIssuances.length > 0 ||
    !!selectedSort;

  const onClearFilters = () => {
    setSelectedTags([]);
    setSelectedConsumptionPrice([]);
    setSelectedAmountOfIssuances([]);
    setSort(undefined);
  };

  const filters = (
    <>
      <TagsField
        tags={tags}
        selectedTags={selectedTags}
        setTags={setSelectedTags}
        isLoading={metadata.isLoading}
      />
      <ConsumpitonPriceField
        min={consumptionPrice.min}
        max={consumptionPrice.max}
        selectedConsumptionPrice={selectedConsumptionPrice}
        setConsumptionPrice={setSelectedConsumptionPrice}
        isLoading={metadata.isLoading}
      />
      {isFiltering && <ClearFiltersButton onClear={onClearFilters} />}
      <SortByField
        selectedSort={selectedSort}
        onSort={setSort}
        options={sortOptions}
      />
    </>
  );

  return (
    <SearchSection
      withContainer={false}
      title={explorerDataModels.listTitle}
      emptyText={explorerDataModels.empty}
      errorMessage="Error on searching for data models"
      isEmpty={dataModelsQuery.isSuccess && dataModels.length === 0}
      isError={dataModelsQuery.isError}
      isLoading={dataModelsQuery.isLoading}
      isFetchingMore={dataModelsQuery.isFetchingNextPage}
      hasMore={dataModelsQuery.hasNextPage}
      onSearch={setSearch}
      fetchMore={() => dataModelsQuery.fetchNextPage()}
      filters={filters}
      cards={
        dataModelsQuery.isSuccess &&
        dataModels.length > 0 &&
        dataModels.map((dataModel) => (
          <SearchCard key={dataModel.id} dataModel={dataModel} />
        ))
      }
    />
  );
}
