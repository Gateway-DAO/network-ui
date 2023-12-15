import documentationRoutes from '@/constants/documentationRoutes';
import { PermissionType } from '@/services/protocol/types';

export const datamodel = {
  title: 'Data model',
  data_model_id: 'Data model ID',
  consumption_cost: 'Consumption cost',
  issuances: 'Issuances',
};

export const datamodels = {
  empty: 'No data models yet',
  title: 'Data models',
  id: 'data-models',
  my_data_models: 'My Data Models',
  network_data_models: 'Network Data Models',
  subtitle: 'These are the data model you have created and all on the network',
  org_subtitle:
    'These are the data model you have created and all on the network',
};

export const helperContent = {
  title: 'How to Create Data Models',
  desc: 'Data Models serve as foundational structures for Data Assets. Data Models streamline the process for developers and applications to issue or verify claims.',
  btnText: 'Learn how',
  btnLink: documentationRoutes.dataModel,
};

export const explorerDataModels = {
  title: 'Data Models',
  subtitle:
    'Data models serve as foundational templates for Private Data Assets (PDAs). Each PDA created using a data model adheres to a standardized structure of claims, making these frameworks exceptionally reusable for various related scenarios.',
  help: 'How to use data models',
  empty: 'No data models found',
  featuredTitle: 'Featured',
  listTitle: 'All data models',
  issuers: 'Issuers',
  pdas_issued: 'PDAs issued',
  view_more: 'View all data models',
  filters: {
    comsumption_price: 'Consumption price',
    amount_of_issuances: 'Amount of issuances',
  },
};

export const explorerDataModelDetail = {
  tabs: {
    issuers: 'Issuers',
    tied_request_templates: 'Tied Request Templates',
  },
};

export const explorerDataModelDetailOverview = {
  unique_issuers: 'Unique Issuers',
  pdas_issued: 'PDAs Issued',
  tied_request_templates: 'Tied Request Templates',
  revenue_generated: 'Revenue Generated',
  labels: {
    signed_by: 'Signed by',
    creation_date: 'Creation date',
    last_update: 'Last update',
    pda_comsumption_cost: 'PDA consumption cost',
    data_model_id: 'Data model ID',
    allowed_to_issue: 'Allowed to issue',
  },
  tooltip: {
    pda_comsumption_cost:
      'When a verifier consume a PDA from this Data Model, the issuer receives this value per consumption.',
    pda_consumption_cost_explorer:
      'When a verifier successfully requests and receives a Proof containing a PDA from this Data Model, the issuer receives this much money.',
  },
  actions: {
    copy_claim_structure: 'Copy claim structure',
  },
  permissions: {
    ALL: 'Anyone',
    ORGANIZATIONS: 'Organizations only',
    SPECIFIC_IDS: 'Specific IDs',
  } as Record<PermissionType, string>,
};

export const dataModelCard = {
  consumption: 'per consumption',
  issuances: (count: number) => `issuance${count > 0 ? 's' : ''}`,
  learn_more: 'Learn more',
  issue: 'Issue',
};

export const issuePda = {
  view_on_explorer: 'View on Explorer',
  issue: 'Issue now',
};

export const explorerIssuersByDataModel = {
  empty: 'No issuers found',
  issuers: 'Issuers',
  pdas_issued: 'PDAs issued',
};

export const explorerDataModelRequestTemplates = {
  empty: 'No request templates found',
  data_request_template: 'Data request template',
  data_request_template_id: 'Data request template ID',
  data_requests: 'Data requests',
  filters: {
    amount_of_data_requests: 'Amount of data requests',
    average_cost: 'Average cost',
  },
};
