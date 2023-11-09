import { DOCS_BASE_URL } from '@/constants/docs';
import externalLinks from '@/constants/externalLinks';
import routes from '@/constants/routes';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

import { LinkedIn } from '@mui/icons-material';

export const socialsLinks = [
  {
    icon: FaTwitter,
    href: externalLinks.gateway_twitter,
    name: 'Twitter',
  },
  {
    icon: FaDiscord,
    href: externalLinks.gateway_discord,
    name: 'Discord',
  },
  {
    icon: LinkedIn,
    href: externalLinks.gateway_linkedin,
    name: 'LinkedIn',
  },
  {
    icon: SiSubstack,
    href: externalLinks.gateway_substack,
    name: 'Substack',
  },
  {
    icon: FaGithub,
    href: externalLinks.gateway_github,
    name: 'Github',
  },
];

export const listLinks = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Learn',
    href: routes.learn,
  },
  {
    title: 'Build',
    href: routes.build,
  },
  {
    title: 'Explorer',
    href: routes.explorer,
  },
  {
    title: 'Dashboard',
    href: routes.auth,
  },
  {
    title: 'Privacy',
    href: `${DOCS_BASE_URL}docs/privacy-security-standards`,
  },
  {
    title: 'Brand Kit',
    href: externalLinks.gateway_brandkit,
  },
  {
    title: 'Contact',
    href: 'mailto:ayyan@mygateway.xyz?subject=Contact Us',
  },
];