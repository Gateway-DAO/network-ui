'use client';
import { useEffect, useRef } from 'react';

import Button from '@/app/(landing)/components/button';
import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { joinClasses } from '@/app/(landing)/utils/function';
import GTWLink from '@/components/gtw-link';
import routes from '@/constants/routes';
import gsap from 'gsap';
import Marquee from "react-fast-marquee";

import styles from './hero.module.scss';

const logos = [
  {
    href: 'https://li.fi/',
    src: 'lifi.svg',
  },
  {
    href: 'https://dimo.zone/',
    src: 'dimo.svg',
  },
  {
    href: 'https://www.pokt.network/',
    src: 'pokt.svg',
  },
  {
    href: 'https://www.plumenetwork.xyz/',
    src: 'plume.svg',
  },
  {
    href: 'https://spherepay.co/',
    src: 'sphere.svg',
  },
  {
    href: 'https://www.accessprotocol.co/',
    src: 'access.svg',
  },
  {
    href: 'https://commonwealth.im/',
    src: 'commonwealth.svg',
  },
  {
    href: 'https://piggylet.com/',
    src: 'piggylet.svg',
  },
  {
    href: 'https://www.tryodyssey.xyz/en/explore',
    src: 'odyssey.svg',
  },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const refLogo = useRef<(HTMLImageElement | null)[]>([]);
  const refCurrentWordElement = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const words = ['Create', 'Own', 'Share'];

  useHeaderVariantDetection(sectionRef, 'light');

  useEffect(() => {
    if (!refLogo.current) return;


    gsap.to(refLogo.current, {  })
  }, [])

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper className={styles.wrapper}>
        <h1 className={styles.title}>
          Transform your <br/>
          <span className={styles.highlight}>Data</span> into <span className={styles.highlight}>Assets</span>
        </h1>
        <p className={styles.text}>
          Gateway is the first decentralized identity access management protocol, <br/>
          allowing  users to control and share their data across the web.
        </p>

        <div className={styles.buttons_container}>
          <GTWLink href='https://docs.mygateway.xyz/introduction'>
            <Button className={styles.button} variant="outlined">How it works</Button>
          </GTWLink>

          <GTWLink href='https://mygateway.typeform.com/to/glphnWOS'>
            <Button variant="text">Get in Touch</Button>
          </GTWLink>
        </div>

        <p className={joinClasses(styles.text, styles['text--dark'])}>Trusted by</p>

        <div className={styles.logos}>
          <div className={joinClasses(styles.logos_container, styles['logos_container--desktop'])}>
            <Marquee>
              {logos.map((logo, index) => (
                <a key={index} href={logo.href} target='_blank'>
                  <img
                    className={styles.logo}
                    src={`/images/${logo.src}`}
                    ref={ref => refLogo.current[index] = ref}
                  />
                </a>
              ))}
            </Marquee>
          </div>

          <div className={joinClasses(styles.logos_container, styles['logos_container--mobile'])}>
            <Marquee speed={30}>
              {logos.slice(0, logos.length / 2).map((logo, index) => (
                <a key={index} href={logo.href} target='_blank'>
                  <img
                    className={styles.logo}
                    src={`/images/${logo.src}`}
                    ref={ref => refLogo.current[index] = ref}
                  />
                </a>
              ))}
            </Marquee>
            <Marquee direction='right' speed={30}>
              {logos.slice(logos.length / 2).map((logo, index) => (
                <a key={index} href={logo.href} target='_blank'>
                  <img
                    className={styles.logo}
                    src={`/images/${logo.src}`}
                    ref={ref => refLogo.current[index] = ref}
                  />
                </a>
              ))}
            </Marquee>
          </div>
        </div>
      </Wrapper>
    </section>
  );
}
