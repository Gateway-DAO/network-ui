import { settings } from '@/locale/en/settings';
import { Auth } from '@/services/protocol/types';
import { PartialDeep } from 'type-fest/source/partial-deep';

import { AddOutlined } from '@mui/icons-material';
import { Button, ListItem, ListItemText } from '@mui/material';

import AliasMenuButton from '../alias-menu-button';
import AccountSection from './account-section';
import SectionSkeleton from './section-skeleton';

type Props = {
  wallets: PartialDeep<Auth>[];
  onAddWallet: () => void;
  onDisconnect: (address: string) => void;
  isLoading: boolean;
};

export default function WalletsSection({
  wallets,
  onAddWallet,
  onDisconnect,
  isLoading,
}: Props) {
  return (
    <AccountSection
      title={settings.connected_accounts.wallet}
      button={
        <Button
          variant="text"
          startIcon={<AddOutlined />}
          onClick={onAddWallet}
        >
          {settings.actions.add_wallet}
        </Button>
      }
    >
      {isLoading && <SectionSkeleton />}
      {wallets.length === 0 && !isLoading && (
        <ListItemText sx={{ mx: 2 }}>No items to be displayed</ListItemText>
      )}
      {wallets.length > 0 &&
        wallets?.map(({ data }) => (
          <ListItem
            key={data?.address}
            secondaryAction={
              <AliasMenuButton
                onDisconnect={() => onDisconnect(data?.address as string)}
              />
            }
          >
            <ListItemText primary={data?.address} secondary={data?.chain} />
          </ListItem>
        ))}
    </AccountSection>
  );
}
