'use client';
import Link from 'next/link';

import GatewayIcon from '@/components/icons/gateway-squared';
import { brandColors } from '@/theme/config/brand';

import { Avatar, Box, Stack, Typography, Link as MuiLink } from '@mui/material';

import { listLinks, socialsLinks } from './list-links';

export default function ExplorerFooter() {
  return (
    <Stack
      component="footer"
      direction="column"
      sx={{
        backgroundColor: 'primary.light',
        py: 5,
        px: 4,
        borderRadius: 1,
      }}
    >
      <GatewayIcon
        sx={{ width: 74, height: 74 }}
        backgroundProps={{
          fill: brandColors.primary,
          fillOpacity: 1,
        }}
        shapeProps={{
          fill: brandColors.primaryLight,
        }}
      />
      <Stack
        justifyContent="space-between"
        sx={{
          mt: 3,
          px: { xs: 0, md: 3 },
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          gap: {
            xs: 3,
            lg: 2,
          },
        }}
      >
        <Stack direction="column" gap={3} flexGrow={1}>
          <Typography>© 2023 Gateway Inc. All rights reserved.</Typography>
          <Stack
            component="ul"
            direction="row"
            gap={1}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0,
            }}
          >
            {socialsLinks.map(({ icon: Icon, href, name }) => (
              <li key={name}>
                <Avatar
                  component={Link}
                  href={href}
                  title={name}
                  target="_blank"
                  variant="rounded"
                  sx={{ background: 'white', color: 'primary.main' }}
                >
                  <Icon />
                </Avatar>
              </li>
            ))}
          </Stack>
        </Stack>
        <Box
          component="ul"
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(5, 1fr)',
            gridAutoFlow: 'column',
            listStyle: 'none',
            columnGap: 5,
            flexGrow: 1,
            p: 0,
            m: 0,
          }}
        >
          {listLinks.map(({ title, href }) => (
            <Box key={title} component="li">
              <MuiLink
                component={Link}
                href={href as string}
                color="black"
                underline="hover"
              >
                {title}
              </MuiLink>
            </Box>
          ))}
        </Box>
        <Stack flexGrow={1}>{/* <Newsletter /> */}</Stack>
      </Stack>
    </Stack>
  );
}
