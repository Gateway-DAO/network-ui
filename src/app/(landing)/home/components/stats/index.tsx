import { useEffect, useLayoutEffect, useRef } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import useHeaderVariantDetection from '@/app/(landing)/hooks/use-header-variant-detection';
import { splitSpans } from '@/app/(landing)/utils/dom';
import { joinClasses } from '@/app/(landing)/utils/function';
import gsap from 'gsap';
import { InView } from 'react-intersection-observer';

import styles from './stats.module.scss';
import SectionLabel from '@/app/(landing)/components/section-label';
import Link from '@/app/(landing)/components/Link';
import Button from '@/app/(landing)/components/button';

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const spinNumbersAnimationElementsRef = useRef<(HTMLSpanElement | null)[]>(
    []
  );
  const tl = useRef<gsap.core.Timeline[]>([]);

  useHeaderVariantDetection(sectionRef, 'light');

  useLayoutEffect(() => {
    if (!spinNumbersAnimationElementsRef.current.length) return;

    spinNumbersAnimationElementsRef.current.forEach((spanRef, indexSpanRef) => {
      if (!spanRef) return;
      const letters = splitSpans(spanRef);

      const lettersWithoutNumbers = letters.filter((letter) => {
        const content = letter.textContent as string;
        const number = Number(content);
        return !isNaN(number);
      });

      tl.current[indexSpanRef] = gsap.timeline({ paused: true });

      lettersWithoutNumbers.forEach((letter, index) => {
        const content = letter.textContent as string;
        const number = Number(content);
        const letterBounds = letter.getBoundingClientRect();
        gsap.set(letter, {
          // width: letterBounds.width,
          height: letterBounds.height,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          willChange: 'transform',
        });

        if (isNaN(number)) return;

        letter.innerHTML = '';

        const arr: number[] = [];

        for (let i = 0; i <= index + 1; i++) {
          const numberToBeShown = number - i;
          if (numberToBeShown <= 0) {
            arr.push(0);
          } else {
            arr.push(numberToBeShown);
          }
        }
        arr.reverse();

        arr.forEach((number) => {
          const container = document.createElement('span');
          container.classList.add(styles.letter_container);
          container.textContent = String(number);
          letter.appendChild(container);
        });

        tl.current[indexSpanRef].to(
          letter,
          {
            y: -letterBounds.height * (index + 1),
            duration: 2,
            ease: 'Power4.easeInOut',
          },
          0
        );

        if (index === 0) {
          const lastSpan = letter.querySelectorAll('span');
          const boundsLastSpan =
            lastSpan[lastSpan.length - 1].getBoundingClientRect();

          const xValue = boundsLastSpan.x - spanRef.getBoundingClientRect().x;

          if (xValue) {
            tl.current[indexSpanRef].to(
              spanRef,
              { x: -xValue, duration: 1.5, ease: 'Power3.easeInOut' },
              '-=1.7'
            );
          }
        }
      });
    });
  }, []);

  const onChangeInview = (inView: boolean) => {
    if (inView) {
      tl.current.forEach((timeline, index) => {
        gsap.delayedCall(0.1 * index, () => {
          timeline?.play();
        });
      });
      gsap.to(spinNumbersAnimationElementsRef.current, {
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.3,
      });
    } else {
      gsap.set(spinNumbersAnimationElementsRef.current, { autoAlpha: 0 });
      tl.current.forEach((timeline) => {
        timeline?.pause();
        timeline?.time(0);
      });
    }
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <Wrapper>
        <SectionLabel
          className={styles.label}
          variant="white"
          text="The data driven pioneers"
        />

        <h2 className={styles.title}>
          Join the Gateway Network and build the data economy with us.
        </h2>

        <a
          className={styles.link}
          href="https://sandbox.mygateway.xyz/"
          target="_blank"
        >
          <Button variant="contained" className={styles.button}>
            Build Now
          </Button>
        </a>

        <InView className={styles.stats} onChange={onChangeInview}>
          <div className={joinClasses(styles.box, styles['box--lg'])}>
            <h3 className={styles.box_title}>Private Data Assets Issued</h3>
            <span
              className={joinClasses(styles.box_value, styles['box_value--lg'])}
              ref={(ref) => (spinNumbersAnimationElementsRef.current[0] = ref)}
            >
              2,500,000+
            </span>
          </div>

          <div className={joinClasses(styles.box, styles['box--md'])}>
            <h3 className={styles.box_title}>Users Empowered</h3>
            <span
              className={styles.box_value}
              ref={(ref) => (spinNumbersAnimationElementsRef.current[1] = ref)}
            >
              500,000+
            </span>
          </div>

          <div className={joinClasses(styles.box, styles['box--md'])}>
            <h3 className={styles.box_title}>Data Contributors</h3>
            <span
              className={styles.box_value}
              ref={(ref) => (spinNumbersAnimationElementsRef.current[2] = ref)}
            >
              20+
            </span>
          </div>
        </InView>
      </Wrapper>
    </section>
  );
}
