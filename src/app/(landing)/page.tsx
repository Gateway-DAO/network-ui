'use client';

import Header from './components/header';
import LandingFooter from './components/landing-footer/landing-footer';
import { HeaderContextProvider } from './contexts/header-context';
import Hero from './home/components/hero';
import ForUsers from './home/components/for-users';
import ForBusiness from './home/components/for-business';
import UseCases from './home/components/use-cases';
import ForDevelopers from './home/components/for-developers';
import Cta from './home/components/cta';
import Investors from './home/components/investors';
import Stats from './home/components/stats';

export default function IndexPage() {
  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <ForUsers />
      <ForBusiness />
      <UseCases />
      <ForDevelopers />
      <Stats />
      <Cta/>
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
