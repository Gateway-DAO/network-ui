'use client';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Paper, Stack, Typography, Link } from '@mui/material';

import GetIcon from './get-icon';

type Props = {
  heading: string;
  title: string;
  subtitle: string;
  link: string;
  btn_text: string;
  target: string;
  index: number;
};

export default function HomeCard({
  heading,
  title,
  subtitle,
  link,
  btn_text,
  target,
  index,
}: Props) {
  return (
    <Paper
      component={Link}
      href={link}
      target={target}
      variant="outlined"
      data-testid="home-card"
      sx={{
        padding: 2,
        paddingLeft: 2,
        width: '100%',
        marginTop: 2,
        mr: 1,
        textDecoration: 'none',
        '&:last-child': { mr: 0 },
      }}
    >
      <Stack flexDirection={'column'} justifyContent={'space-between'}>
        <GetIcon index={index} sx={{ width: 60, height: 50, mb: 2 }} />
        <Stack>
          <Typography
            sx={{ mt: { xs: 0, md: 10 } }}
            variant="body2"
            color="text.secondary"
          >
            {heading}
          </Typography>
          <Typography mt={2} variant="h5" width={250} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" width={300} gutterBottom sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
          <Button variant="outlined" size="small">
            {btn_text}
            {target === '_blank' && (
              <OpenInNewIcon sx={{ ml: 0.8, height: 18, width: 18 }} />
            )}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
