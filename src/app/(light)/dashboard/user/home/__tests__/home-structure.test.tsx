import { SessionProvider } from 'next-auth/react';

import { session } from '@/mocks/session';
import { fireEvent, render, screen, within } from '@testing-library/react';

import '@testing-library/jest-dom';
import HomeStructure from '../components/home-structure';

import { userEvent } from '@storybook/testing-library';

describe('Dashboard User Home', () => {
  test('should display Banner issue now', () => {
    render(
      <SessionProvider session={session}>
        <HomeStructure username={''} />
      </SessionProvider>
    );

    const banner = screen.getByTestId('issue-now-card');
    expect(banner).toBeInTheDocument();
  });
  test('should display 3 institutional cards', () => {
    render(
      <SessionProvider session={session}>
        <HomeStructure username={''} />
      </SessionProvider>
    );

    const cards = screen.getAllByTestId('home-card');
    expect(cards).toHaveLength(3);

    expect(cards[0]).toHaveTextContent('Create an Organization');
    expect(cards[1]).toHaveTextContent('Getting started using the protocol');
    expect(cards[2]).toHaveTextContent('Learn about Gateway Network');
  });

  test('should display 3 instructional cards', async () => {
    render(
      <SessionProvider session={session}>
        <HomeStructure username={''} />
      </SessionProvider>
    );

    const cards = screen.getAllByTestId('instructional-card');
    expect(cards).toHaveLength(3);

    expect(cards[0]).toHaveTextContent('How to use your PDA');
    expect(cards[1]).toHaveTextContent('How to issue a PDA');
    expect(cards[2]).toHaveTextContent('How to create a Request');

    const dialogs = screen.queryAllByTestId('instructional-card__dialog');
    expect(dialogs).toHaveLength(0);

    // const closeButton = within(cards[0]).getByTestId('CloseIcon');
    // fireEvent.click(closeButton);

    // const cardsAfter = await screen.findAllByTestId('instructional-card');
    // expect(cardsAfter).toHaveLength(2);
  });
});
