import { Metadata } from 'next';

import documentationRoutes from '@/constants/documentationRoutes';
import { explorerRequestTemplates } from '@/locale/en/request-template';

import { Divider } from '@mui/material';

import ExplorerHero from '../components/hero/hero';
import RequestTemplatesExplorerFeatured from './components/featured';
import DataModelsRequestExplorerSearch from './components/search/search';

export const metadata: Metadata = {
  title: `Gateway Request Templates`,
  description: `Discover a diverse range of customizable data request templates on our Gateway Platform. Find the request that best fits your business.`,
};

export default function RequestTemplatesExplorerPage() {
  return (
    <>
      <ExplorerHero
        title={explorerRequestTemplates.title}
        subtitle={explorerRequestTemplates.subtitle}
        help={explorerRequestTemplates.help}
        helpLink={documentationRoutes.requestTemplate}
        infoCard
        sx={{
          backgroundColor: 'primary.50',
        }}
      />
      <RequestTemplatesExplorerFeatured />
      <Divider />
      <DataModelsRequestExplorerSearch />
    </>
  );
}
