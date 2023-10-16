import CopyButton from '@/components/copy-button/copy-button';

import { Box, Button, Stack, Tab, Tabs, Typography } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsStructure() {
  return (
    <Stack mt={3}>
      <Stack>
        <Tabs value={0}>
          <Tab label="Create data request" />
          <Tab label="Details" />
        </Tabs>
      </Stack>
      <CustomTabPanel value={0} index={0}>
        <Typography variant="body1">
          Copy the mutation to create a data request using this template
        </Typography>
        <Box sx={{ gap: 2, display: 'flex', mt: 2 }}>
          <CopyButton
            variant="contained"
            customButtonText="Copy mutation"
            text="abuble"
          />
          <Button variant="outlined">Go to playground</Button>
        </Box>
        <code>`mutation {
	createDataRequest(input: {
		dataRequestTemplateId: "6a659127-4c2d-40fe-a544-ec149b68ac18",
		owner: {
			type: GATEWAY_ID,
			value: "ADD THE DATA OWNER"
		},
		dataUse: "ADD WHAT’S THE REASON TO REQUEST THE DATA"
	}) {
		arweaveUrl,
		id,
		status
		dataUse
	}
}`</code>
      </CustomTabPanel>
    </Stack>
  );
}
