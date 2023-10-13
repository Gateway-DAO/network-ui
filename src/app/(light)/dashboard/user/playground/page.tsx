import { Metadata } from 'next';

import TitleLayout from '@/components/title-layout/title-layout';
import { playground } from '@/locale/en/playground';

import DocumentationLinks from './components/documentation-links';
import PlaygroundWrapper from './components/playground-wrapper';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Start playing with playground - Gateway Network',
  };
}

export default async function PlaygroundPage() {
  return (
    <>
      <TitleLayout
        titleId="playground-title"
        title={playground.title}
        subtitle={playground.subtitle}
      />
      <DocumentationLinks />
      <PlaygroundWrapper />
    </>
  );
}
