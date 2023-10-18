'use client';
import { useRef, useEffect } from 'react';

import Wrapper from '@/app/(landing)/components/wrapper';
import { splitSpans } from '@/app/(landing)/utils/dom';
import { joinClasses } from '@/app/(landing)/utils/function';
import { useLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';

import styles from './pdas.module.scss';

export default function Pdas() {
  // Refs for DOM elements
  const sectionRef = useRef<HTMLElement>(null);
  const firstRenderRef = useRef(true);
  const linesParentRef = useRef<SVGGElement>(null);
  const logoBackgroundRef = useRef<SVGPathElement>(null);
  const logoContainerRef = useRef<SVGPathElement>(null);
  const logoRef = useRef<SVGPathElement>(null);
  const logoTextRef = useRef<SVGSVGElement>(null);
  const textPdasRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textContentPdasRefs = useRef<string[]>([]);
  const pdasLogoContainerRef = useRef<HTMLDivElement>(null);
  const textPdasParagraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const slashRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline>();

  const lenis = useLenis(({ scroll }) => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;

      gsap.delayedCall(0.4, () => {
        setTimelineProgress(scroll);
        gsap.to(sectionRef.current, { autoAlpha: 1 });
      });
      return;
    }

    setTimelineProgress(scroll);
  });

  // Animation setup using useEffect
  useEffect(() => {
    createAnimation();

    window.addEventListener('resize', reCalc);

    // Set second logo text bounds
    gsap.delayedCall(0.2, setLogoTextBounds);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', reCalc);
    };
  }, []);

  const setTimelineProgress = (scroll: number) => {
    if (!sectionRef.current || !tlRef.current) return;

    const offsetTop =
      sectionRef.current.offsetTop - window.innerHeight / 2 + 200;
    const sectionHeight = sectionRef.current.clientHeight;
    const scrollSection = scroll - offsetTop;
    const progress = scrollSection / (sectionHeight - window.innerHeight);

    if (progress >= 0 && progress <= 1) {
      tlRef.current.progress(progress);
    } else if (progress < 0) {
      tlRef.current.progress(0);
    } else {
      tlRef.current.progress(1);
    }
  };

  const reCalc = () => {
    if (!tlRef.current) return;

    tlRef.current.progress(0);
    tlRef.current.kill();

    if (textContentPdasRefs.current.length) {
      textContentPdasRefs.current.forEach((content, index) => {
        if (!textPdasRefs.current[index]) return;

        textPdasRefs.current[index]!.innerHTML = content;
      });
    }

    setLogoTextBounds();
    createAnimation();
    gsap.delayedCall(0.1, () => {
      setTimelineProgress(lenis?.scroll || 0);
    });
  };

  const createAnimation = () => {
    if (!linesParentRef.current || !logoContainerRef.current) return;

    if (tlRef.current) tlRef.current.kill();

    const lines = linesParentRef.current.querySelectorAll('path');
    const boundsLogo = logoContainerRef.current.getBoundingClientRect();

    tlRef.current = gsap.timeline({ paused: true });

    tlRef.current?.set(pdasLogoContainerRef.current, {
      position: 'absolute',
      xPercent: -50,
      yPercent: -50,
    });
    tlRef.current?.to(logoBackgroundRef.current, { autoAlpha: 1 });
    tlRef.current?.fromTo(
      logoRef.current,
      { y: `-1rem` },
      { autoAlpha: 1, y: 0 },
      '-=0.3'
    );
    tlRef.current?.set(logoContainerRef.current, { autoAlpha: 0 });
    tlRef.current?.set(logoTextRef.current, { autoAlpha: 1 });
    tlRef.current?.to(lines, {
      transform: 'scale(1)',
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.6,
      duration: 1,
    });
    tlRef.current?.to(lines, {
      autoAlpha: 0,
      stagger: 0.1,
      ease: 'power4.out',
      duration: 1,
    });
    tlRef.current?.to(
      logoTextRef.current,
      { scale: 98 / boundsLogo.width },
      '-=1'
    );
    tlRef.current?.to(pdasLogoContainerRef.current, { y: '-7.3rem' }, '<');

    textPdasRefs.current.forEach((element, index) => {
      if (!element || !tlRef.current) return;

      if (!textContentPdasRefs.current[index]) {
        textContentPdasRefs.current[index] = element.textContent as string;
      }

      splitSpans(element, '', () => {
        const parent = element.parentNode as HTMLParagraphElement;
        const { height } = parent.getBoundingClientRect();
        gsap.set(parent, { height });
      });
      const spans = element.querySelectorAll('span');

      const paragraphBounds =
        textPdasParagraphRefs.current[0]?.getBoundingClientRect();
      const texPdaBounds = element.getBoundingClientRect();

      if (index === 0) {
        tlRef.current?.set(slashRefs.current[0], { display: 'inline-block' });
        tlRef.current?.from(spans, { width: 0, display: 'none', stagger: 0.1 });
        tlRef.current?.set(logoTextRef.current, { transformOrigin: 'left' });
        tlRef.current?.to(
          logoTextRef.current,
          {
            scale: 43 / boundsLogo.width,
            left: 0,
            x: 0,
            duration: 0.8,
          },
          '<'
        );
        tlRef.current?.to(
          pdasLogoContainerRef.current,
          {
            xPercent: 0,
            left: 0,
            y: `-27.3rem`,
            duration: 0.8,
          },
          '<'
        );

        if (!paragraphBounds) return;

        const x = paragraphBounds.left - texPdaBounds.left;
        tlRef.current?.to(
          textPdasParagraphRefs.current,
          { x, y: `-23rem`, duration: 0.8 },
          '-=0.6'
        );
        tlRef.current?.set(textPdasParagraphRefs.current, {
          textAlign: 'left',
          x: 0,
        });
        tlRef.current?.set(slashRefs.current[0], { display: 'none' });
        tlRef.current?.set(slashRefs.current[1], { display: 'inline-block' });
      } else {
        tlRef.current?.from(spans, { width: 0, display: 'none', stagger: 0.1 });
      }
    });
  };

  // Function to set logo text bounds
  const setLogoTextBounds = () => {
    if (!logoTextRef.current || !logoContainerRef.current) return;

    logoTextRef.current.removeAttribute('style');

    const logoBounds = logoContainerRef.current.getBoundingClientRect();
    const logoTextBounds = logoTextRef.current.getBoundingClientRect();

    const top = logoBounds.top - logoTextBounds.top;
    const left = logoBounds.left - logoTextBounds.left;

    gsap.set(logoTextRef.current, { top, left });
    logoTextRef.current.style.width = `${logoBounds.width}px`;
  };

  return (
    <section className={styles.element} ref={sectionRef}>
      <div className={styles.svg_container}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 390 1511"
          className={styles.svg}
        >
          <mask
            id="b"
            width="1511"
            height="1511"
            x="0"
            y="0"
            maskUnits="userSpaceOnUse"
            style={{ maskType: 'alpha' }}
          >
            <g
              clipPath="url(#a)"
              className={styles.lines_parent}
              ref={linesParentRef}
            >
              <path
                fill="#771AC9"
                d="M247.872 859.602H143.128a51.774 51.774 0 0 1-51.73-51.73V703.128a51.777 51.777 0 0 1 51.73-51.73h104.744a51.774 51.774 0 0 1 51.73 51.73v104.744a51.772 51.772 0 0 1-15.165 36.565 51.772 51.772 0 0 1-36.565 15.165ZM143.128 655.107a48.085 48.085 0 0 0-48.02 48.021v104.744a48.083 48.083 0 0 0 48.02 48.021h104.744a48.082 48.082 0 0 0 48.021-48.021V703.128a48.083 48.083 0 0 0-48.021-48.021H143.128Z"
              />
              <path
                fill="#771AC9"
                d="M271.341 906.132H119.643a74.878 74.878 0 0 1-74.783-74.791v-151.69a74.869 74.869 0 0 1 74.783-74.783h151.698a74.878 74.878 0 0 1 74.79 74.783v151.69a74.884 74.884 0 0 1-74.79 74.791ZM119.643 609.969a69.757 69.757 0 0 0-69.682 69.682v151.69a69.758 69.758 0 0 0 69.682 69.69h151.698a69.765 69.765 0 0 0 69.69-69.69v-151.69a69.763 69.763 0 0 0-69.69-69.682H119.643Z"
              />
              <path
                fill="#771AC9"
                d="M294.818 952.661H96.212a97.957 97.957 0 0 1-97.897-97.842V656.212a97.959 97.959 0 0 1 97.866-97.873h198.607a97.95 97.95 0 0 1 97.834 97.842v198.607a97.952 97.952 0 0 1-97.804 97.873ZM96.212 564.83A91.463 91.463 0 0 0 4.83 656.181v198.607a91.459 91.459 0 0 0 91.351 91.382h198.607a91.454 91.454 0 0 0 91.343-91.351V656.212a91.456 91.456 0 0 0-91.343-91.351l-198.576-.031Z"
              />
              <path
                fill="#771AC9"
                d="M318.296 999.183H72.704c-66.66 0-120.894-54.227-120.894-120.887V632.704c0-66.661 54.234-120.887 120.894-120.887h245.592c66.661 0 120.887 54.226 120.887 120.887v245.592c0 66.66-54.226 120.887-120.887 120.887ZM72.704 519.699c-62.317 0-113.027 50.695-113.027 113.005v245.592c0 62.31 50.694 113.004 113.012 113.004H318.28c62.31 0 113.004-50.694 113.004-113.004V632.704c0-62.31-50.694-113.005-113.004-113.005H72.704Z"
              />
              <path
                fill="#771AC9"
                d="M341.773 1045.71H49.227c-79.373 0-143.94-64.571-143.94-143.937V609.227c0-79.365 64.567-143.939 143.94-143.939h292.546c79.366 0 143.94 64.574 143.94 143.939v292.546c0 79.381-64.574 143.937-143.94 143.937ZM49.227 474.561c-74.257 0-134.666 60.409-134.666 134.666v292.546c0 74.257 60.409 134.667 134.666 134.667h292.546c74.257 0 134.666-60.41 134.666-134.667V609.227c0-74.257-60.409-134.666-134.666-134.666H49.227Z"
              />
              <path
                fill="#771AC9"
                d="M365.243 1092.24H25.749c-21.93 0-43.645-4.32-63.906-12.71a166.905 166.905 0 0 1-54.177-36.2 166.984 166.984 0 0 1-48.908-118.087V585.749A166.991 166.991 0 0 1 25.749 418.758h339.494a166.984 166.984 0 0 1 118.085 48.908 166.982 166.982 0 0 1 48.914 118.083v339.494a166.995 166.995 0 0 1-48.911 118.087 166.916 166.916 0 0 1-54.179 36.2 167.055 167.055 0 0 1-63.909 12.71ZM25.749 429.422c-86.165 0-156.327 70.131-156.327 156.327v339.494c0 86.207 70.162 156.377 156.327 156.377h339.494c86.204 0 156.334-70.13 156.334-156.339V585.749c0-86.196-70.13-156.327-156.334-156.327H25.749Z"
              />
              <path
                fill="#771AC9"
                d="M388.72 1138.8H2.28c-24.962 0-49.68-4.91-72.742-14.47a190.04 190.04 0 0 1-117.309-175.633V562.303a190.034 190.034 0 0 1 55.645-134.421A190.046 190.046 0 0 1 2.28 372.198h386.44a190.041 190.041 0 0 1 175.6 117.359 190.054 190.054 0 0 1 14.452 72.746v386.394a190.024 190.024 0 0 1-14.452 72.743 190.036 190.036 0 0 1-102.858 102.89 189.94 189.94 0 0 1-72.742 14.47ZM2.28 384.284a177.993 177.993 0 0 0-164.456 109.895 177.996 177.996 0 0 0-13.54 68.124v386.394a177.984 177.984 0 0 0 13.54 68.123 177.992 177.992 0 0 0 38.583 57.76 178.066 178.066 0 0 0 57.75 38.59 178.125 178.125 0 0 0 68.123 13.55h386.44c23.377 0 46.525-4.61 68.123-13.55a178.07 178.07 0 0 0 57.75-38.59 177.992 177.992 0 0 0 38.583-57.76 177.984 177.984 0 0 0 13.54-68.123V562.303a177.996 177.996 0 0 0-52.123-125.879 177.996 177.996 0 0 0-125.873-52.14H2.28Z"
              />
              <path
                fill="#771AC9"
                d="M412.197 1185.3H-21.197a213.108 213.108 0 0 1-213.096-213.103V538.803A213.11 213.11 0 0 1-21.197 325.699h433.394a213.108 213.108 0 0 1 213.104 213.104v433.394a213.092 213.092 0 0 1-62.419 150.683 213.08 213.08 0 0 1-150.685 62.42ZM-21.197 339.145a199.657 199.657 0 0 0-141.182 58.476 199.662 199.662 0 0 0-58.476 141.182v433.394a199.622 199.622 0 0 0 15.196 76.403 199.62 199.62 0 0 0 108.055 108.06 199.538 199.538 0 0 0 76.407 15.19h433.394c26.22.01 52.183-5.16 76.407-15.19a199.594 199.594 0 0 0 64.774-43.28 199.606 199.606 0 0 0 43.281-64.78 199.622 199.622 0 0 0 15.196-76.403V538.803a199.657 199.657 0 0 0-58.477-141.182 199.658 199.658 0 0 0-141.181-58.476H-21.197Z"
              />
              <path
                fill="#771AC9"
                d="M435.713 1231.83H-44.675a236.181 236.181 0 0 1-166.983-69.17 236.174 236.174 0 0 1-69.173-166.985V515.326A236.172 236.172 0 0 1-44.675 279.169h480.388a236.172 236.172 0 0 1 236.156 236.157v480.349a236.174 236.174 0 0 1-69.173 166.985 236.181 236.181 0 0 1-166.983 69.17ZM-44.675 294.007a221.304 221.304 0 0 0-156.488 64.826 221.307 221.307 0 0 0-64.815 156.493v480.349a221.294 221.294 0 0 0 64.82 156.495 221.322 221.322 0 0 0 71.802 47.98 221.363 221.363 0 0 0 84.696 16.84h480.373c29.064 0 57.844-5.72 84.696-16.84a221.322 221.322 0 0 0 119.777-119.78 221.294 221.294 0 0 0 16.845-84.695V515.326a221.311 221.311 0 0 0-221.318-221.319H-44.675Z"
              />
              <path
                fill="#771AC9"
                d="M459.144 1278.36H-68.144a259.225 259.225 0 0 1-183.294-75.92 259.243 259.243 0 0 1-75.922-183.3V491.848A259.214 259.214 0 0 1-68.144 232.64h527.296a259.23 259.23 0 0 1 259.216 259.208v527.292a259.225 259.225 0 0 1-75.928 183.29 259.22 259.22 0 0 1-183.288 75.93h-.008ZM-68.144 248.868a242.972 242.972 0 0 0-242.988 242.98v527.292a242.98 242.98 0 0 0 18.492 92.99 242.983 242.983 0 0 0 52.673 78.84 243.014 243.014 0 0 0 78.833 52.67 243.022 243.022 0 0 0 92.99 18.49h527.296c64.444 0 126.249-25.6 171.818-71.17a242.983 242.983 0 0 0 71.169-171.82V491.848a242.985 242.985 0 0 0-242.987-242.98H-68.144Z"
              />
              <path
                fill="#771AC9"
                d="M482.621 1324.89h-574.25a281.915 281.915 0 0 1-108.048-21.44 281.897 281.897 0 0 1-91.6-61.18 282.079 282.079 0 0 1-82.613-199.65V468.379a282.564 282.564 0 0 1 172.394-260.082 280.528 280.528 0 0 1 109.867-22.179h574.25a280.527 280.527 0 0 1 109.875 22.179 282.015 282.015 0 0 1 172.425 260.082v574.241a282.076 282.076 0 0 1-82.627 199.67 282.265 282.265 0 0 1-91.612 61.18 282.151 282.151 0 0 1-108.061 21.42ZM-91.629 203.73a262.928 262.928 0 0 0-187.13 77.518 262.89 262.89 0 0 0-77.511 187.131v574.241c0 70.19 27.881 137.5 77.511 187.13a264.648 264.648 0 0 0 187.13 77.52h574.25a264.647 264.647 0 0 0 187.13-77.52 264.637 264.637 0 0 0 77.512-187.13V468.379a262.908 262.908 0 0 0-77.511-187.131 262.923 262.923 0 0 0-187.131-77.518h-574.25Z"
              />
              <path
                fill="#771AC9"
                d="M506.099 1371.41h-621.197c-40.104.03-79.82-7.84-116.877-23.17a305.168 305.168 0 0 1-99.085-66.18 305.1 305.1 0 0 1-89.359-215.96V444.901a305.639 305.639 0 0 1 186.474-281.294 303.36 303.36 0 0 1 118.847-24.019h621.197a303.356 303.356 0 0 1 118.847 23.996 304.256 304.256 0 0 1 97.046 65.424 304.394 304.394 0 0 1 89.42 215.893V1066.1c.033 40.1-7.841 79.82-23.173 116.88a305.123 305.123 0 0 1-66.177 99.08 304.999 304.999 0 0 1-99.085 66.18 305.152 305.152 0 0 1-116.878 23.17ZM-115.098 158.599a284.47 284.47 0 0 0-111.467 22.496 285.153 285.153 0 0 0-91.004 61.359 285.342 285.342 0 0 0-83.862 202.47V1066.1a286.089 286.089 0 0 0 21.732 109.61 286.17 286.17 0 0 0 62.064 92.92 286.002 286.002 0 0 0 92.927 62.05c34.753 14.38 72 21.76 109.61 21.72h621.197c37.606.03 74.85-7.35 109.6-21.73a286.114 286.114 0 0 0 92.916-62.05 286.167 286.167 0 0 0 62.057-92.92 286.036 286.036 0 0 0 21.729-109.6V444.901a286.614 286.614 0 0 0-174.866-263.806 284.392 284.392 0 0 0-111.436-22.496h-621.197Z"
              />
              <path
                fill="#771AC9"
                d="M529.576 1417.94h-668.152a328.14 328.14 0 0 1-125.692-24.93 328.183 328.183 0 0 1-106.556-71.17 328.153 328.153 0 0 1-71.163-106.57 328.067 328.067 0 0 1-24.915-125.69V421.424a327.334 327.334 0 0 1 96.135-232.191 327.366 327.366 0 0 1 104.372-70.37 326.3 326.3 0 0 1 127.819-25.804h668.152a326.363 326.363 0 0 1 127.819 25.804 327.359 327.359 0 0 1 104.373 70.37 327.41 327.41 0 0 1 96.173 232.191v668.156a328.082 328.082 0 0 1-96.092 232.27 328.074 328.074 0 0 1-106.568 71.17 328.016 328.016 0 0 1-125.705 24.92ZM-138.576 113.476a306.023 306.023 0 0 0-119.874 24.181 306.935 306.935 0 0 0-97.889 66.004 306.975 306.975 0 0 0-90.2 217.763v668.156a307.672 307.672 0 0 0 23.37 117.89 307.69 307.69 0 0 0 166.699 166.7 307.684 307.684 0 0 0 117.894 23.37h668.152c40.454.04 80.519-7.9 117.901-23.37a307.557 307.557 0 0 0 99.954-66.75 307.557 307.557 0 0 0 66.758-99.95 307.676 307.676 0 0 0 23.374-117.89V421.424a306.975 306.975 0 0 0-90.2-217.763 306.909 306.909 0 0 0-97.897-66.004 305.958 305.958 0 0 0-119.867-24.196l-668.175.015Z"
              />
              <path
                fill="#771AC9"
                d="M553.046 1464.47h-715.099c-46.16.04-91.874-9.03-134.528-26.67a351.205 351.205 0 0 1-114.048-76.18 351.063 351.063 0 0 1-76.17-114.05 351.08 351.08 0 0 1-26.671-134.52V397.947a349.176 349.176 0 0 1 27.619-136.784 350.203 350.203 0 0 1 75.308-111.706 350.323 350.323 0 0 1 111.699-75.308 349.184 349.184 0 0 1 136.783-27.62h715.099a349.221 349.221 0 0 1 136.783 27.62 350.3 350.3 0 0 1 111.699 75.308 350.304 350.304 0 0 1 75.308 111.699 349.3 349.3 0 0 1 27.62 136.783v715.111a351.167 351.167 0 0 1-26.672 134.53 351.175 351.175 0 0 1-76.172 114.05 351.189 351.189 0 0 1-114.051 76.17 351.05 351.05 0 0 1-134.53 26.67h.023ZM-162.053 68.322a327.482 327.482 0 0 0-128.282 25.896 328.566 328.566 0 0 0-104.798 70.648 328.506 328.506 0 0 0-70.648 104.783 327.453 327.453 0 0 0-25.896 128.282v715.119a329.308 329.308 0 0 0 25.012 126.18 329.26 329.26 0 0 0 71.446 106.98 329.257 329.257 0 0 0 106.978 71.45 329.34 329.34 0 0 0 126.188 25.02h715.099c43.299.04 86.18-8.46 126.19-25.02a329.39 329.39 0 0 0 106.981-71.44 329.371 329.371 0 0 0 71.448-106.98 329.359 329.359 0 0 0 25.013-126.19V397.947a327.662 327.662 0 0 0-25.896-128.283 328.77 328.77 0 0 0-70.648-104.782 328.651 328.651 0 0 0-104.782-70.648 327.55 327.55 0 0 0-128.283-25.896l-715.122-.016Z"
              />
              <path
                fill="#771AC9"
                d="M576.522 1511h-762.053c-49.187.04-97.9-9.62-143.351-28.43A374.17 374.17 0 0 1-560 1136.52V374.516a372.069 372.069 0 0 1 29.435-145.771 373.142 373.142 0 0 1 80.246-119.009 373.126 373.126 0 0 1 119.01-80.247A372.024 372.024 0 0 1-185.531 0h762.053a372.031 372.031 0 0 1 145.764 29.436 373.102 373.102 0 0 1 119.009 80.246 373.256 373.256 0 0 1 80.246 119.01A372.197 372.197 0 0 1 951 374.516v762.044a374.194 374.194 0 0 1-374.478 374.48v-.04ZM-185.531 23.183A349.06 349.06 0 0 0-322.26 50.787a350.08 350.08 0 0 0-111.668 75.285 350.082 350.082 0 0 0-75.285 111.66 349.093 349.093 0 0 0-27.604 136.784v762.044A350.97 350.97 0 0 0-434 1385.02a350.947 350.947 0 0 0 114.001 76.14 351.3 351.3 0 0 0 134.468 26.66h762.053c46.144.03 91.842-9.03 134.48-26.67A350.96 350.96 0 0 0 901.154 1271a350.965 350.965 0 0 0 26.662-134.48V374.516a349.057 349.057 0 0 0-27.604-136.784 350.068 350.068 0 0 0-75.285-111.667A350.139 350.139 0 0 0 713.259 50.78a349.095 349.095 0 0 0-136.737-27.604l-762.053.007Z"
              />
              <path
                stroke="#fff"
                strokeWidth=".559"
                d="M-495.641 1212.94H887.602"
                opacity=".2"
              />
            </g>
          </mask>
          <g mask="url(#b)">
            <path fill="#771AC9" d="M-1 328h391v848H-1z" />
            <path fill="url(#c)" fillOpacity=".5" d="M-1 328h391v848H-1z" />
            <path fill="url(#d)" d="M-1 328h391v848H-1z" />
          </g>
          <g clipPath="url(#e)" ref={logoContainerRef}>
            <path
              className={styles.logo_background}
              ref={logoBackgroundRef}
              fill="#E6D5FA"
              d="M123 720.61c0-19.667 15.943-35.61 35.61-35.61h74.78c19.667 0 35.61 15.943 35.61 35.61v74.78c0 19.667-15.943 35.61-35.61 35.61h-74.78c-19.667 0-35.61-15.943-35.61-35.61v-74.78Z"
            />
            <g
              fill="#771AC9"
              clipPath="url(#f)"
              ref={logoRef}
              className={styles.logo}
            >
              <path d="M159.319 804.333a3.148 3.148 0 0 1-2.412-.898 3.08 3.08 0 0 1-.907-2.388v-55.869c.052-9.048 3.706-17.712 10.169-24.11 6.463-6.399 15.214-10.016 24.354-10.068h10.954c9.14.052 17.891 3.669 24.354 10.068 6.463 6.398 10.117 15.062 10.169 24.11v14.461a3.27 3.27 0 0 1-.972 2.323 3.336 3.336 0 0 1-2.348.963c-.88 0-1.724-.346-2.347-.963a3.27 3.27 0 0 1-.972-2.323v-14.461a27.632 27.632 0 0 0-8.215-19.472 28.191 28.191 0 0 0-19.669-8.133h-10.954a28.191 28.191 0 0 0-19.669 8.133 27.632 27.632 0 0 0-8.215 19.472v55.869c0 .872-.35 1.707-.972 2.324a3.339 3.339 0 0 1-2.348.962Z" />
              <path d="M205.461 776.07a3.15 3.15 0 0 1-2.413-.898 3.08 3.08 0 0 1-.907-2.388v-22.676a5.143 5.143 0 0 0-.386-2.023 5.192 5.192 0 0 0-1.15-1.715 5.25 5.25 0 0 0-1.732-1.138 5.292 5.292 0 0 0-2.043-.382h-1.328a5.288 5.288 0 0 0-2.043.382 5.25 5.25 0 0 0-1.732 1.138 5.192 5.192 0 0 0-1.15 1.715 5.143 5.143 0 0 0-.386 2.023v22.676c0 .872-.35 1.707-.972 2.324a3.339 3.339 0 0 1-2.348.962c-.88 0-1.724-.346-2.347-.962a3.273 3.273 0 0 1-.972-2.324v-22.676a11.688 11.688 0 0 1 .901-4.533 11.808 11.808 0 0 1 2.589-3.843 11.936 11.936 0 0 1 3.882-2.563 12.026 12.026 0 0 1 4.578-.892h1.328a12.03 12.03 0 0 1 4.578.892 11.936 11.936 0 0 1 3.882 2.563c1.11 1.1 1.99 2.406 2.589 3.843.599 1.438.905 2.978.901 4.533v22.676a3.536 3.536 0 0 1-1.041 2.256 3.602 3.602 0 0 1-2.278 1.03Z" />
              <path d="M199.153 791.516h-5.975a24.139 24.139 0 0 1-9.196-1.936 23.931 23.931 0 0 1-7.733-5.294 24.58 24.58 0 0 1-6.639-13.802 3.265 3.265 0 0 1 .847-2.54 3.309 3.309 0 0 1 1.12-.798c.426-.185.887-.28 1.352-.277.814.036 1.59.351 2.195.89a3.477 3.477 0 0 1 1.125 2.067 18.566 18.566 0 0 0 4.979 10.188 17.304 17.304 0 0 0 11.95 5.258h5.975a16.745 16.745 0 0 0 6.521-1.414 16.607 16.607 0 0 0 5.43-3.844 18.561 18.561 0 0 0 4.979-13.145v-18.404a20.817 20.817 0 0 0-4.979-13.146 17.313 17.313 0 0 0-11.951-5.258h-5.975c-2.247.03-4.466.511-6.52 1.415a16.604 16.604 0 0 0-5.43 3.843 18.564 18.564 0 0 0-4.979 13.146c0 .871-.35 1.707-.972 2.324a3.339 3.339 0 0 1-2.348.962c-.88 0-1.724-.346-2.347-.962a3.274 3.274 0 0 1-.972-2.324 24.11 24.11 0 0 1 1.723-9.4 24.296 24.296 0 0 1 5.248-8.018 23.249 23.249 0 0 1 7.709-5.349 23.453 23.453 0 0 1 9.22-1.881h5.643a24.14 24.14 0 0 1 9.197 1.936 23.947 23.947 0 0 1 7.733 5.294 25.66 25.66 0 0 1 6.971 17.418v18.404a24.116 24.116 0 0 1-1.723 9.4 24.298 24.298 0 0 1-5.248 8.017 23.234 23.234 0 0 1-7.709 5.349 23.436 23.436 0 0 1-9.221 1.881Z" />
            </g>
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M-560 0H951v1511H-560z" />
            </clipPath>
            <clipPath id="e">
              <path fill="#fff" d="M123 685h146v146H123z" />
            </clipPath>
            <clipPath id="f">
              <path fill="#fff" d="M156 711h80v93.333h-80z" />
            </clipPath>
            <radialGradient
              id="c"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 424 -785.169 0 194.5 752)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopOpacity="0" />
              <stop offset="1" />
            </radialGradient>
            <radialGradient
              id="d"
              cx="0"
              cy="0"
              r="1"
              gradientTransform="matrix(0 318 -175.404 0 194.5 752)"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#00E0FF" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        <Wrapper className={styles.wrapper}>
          <div
            className={styles.pdas_logo_container}
            ref={pdasLogoContainerRef}
          >
            <svg
              className={styles.logo_text}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 120 120"
              ref={logoTextRef}
            >
              <g clipPath="url(#pdas_mobile_a)">
                <path
                  fill="#E6D5FA"
                  d="M0 29.268C0 13.104 13.104 0 29.268 0h61.464C106.896 0 120 13.104 120 29.268v61.464C120 106.896 106.896 120 90.732 120H29.268C13.104 120 0 106.896 0 90.732V29.268Z"
                />
                <g fill="#771AC9" clipPath="url(#pdas_mobile_b)">
                  <path d="M29.851 98.082a2.588 2.588 0 0 1-1.983-.738 2.536 2.536 0 0 1-.745-1.963v-45.92a28.113 28.113 0 0 1 8.358-19.816c5.312-5.259 12.505-8.232 20.017-8.275H64.5c7.512.043 14.705 3.016 20.017 8.275a28.114 28.114 0 0 1 8.358 19.817v11.885c0 .716-.287 1.403-.799 1.91a2.743 2.743 0 0 1-1.93.791 2.743 2.743 0 0 1-1.928-.791 2.687 2.687 0 0 1-.8-1.91V49.462a22.711 22.711 0 0 0-6.752-16.005 23.172 23.172 0 0 0-16.166-6.685h-9.003a23.172 23.172 0 0 0-16.166 6.685 22.711 22.711 0 0 0-6.752 16.005v45.92c0 .716-.288 1.403-.8 1.91a2.742 2.742 0 0 1-1.929.79Z" />
                  <path d="M67.776 74.853a2.588 2.588 0 0 1-1.983-.738 2.536 2.536 0 0 1-.746-1.963V53.513a4.23 4.23 0 0 0-.317-1.663 4.264 4.264 0 0 0-.945-1.41 4.347 4.347 0 0 0-3.103-1.25h-1.091a4.347 4.347 0 0 0-3.103 1.25 4.264 4.264 0 0 0-.945 1.41 4.23 4.23 0 0 0-.318 1.663V72.15c0 .717-.287 1.404-.799 1.91a2.742 2.742 0 0 1-1.929.792 2.742 2.742 0 0 1-1.93-.791 2.687 2.687 0 0 1-.798-1.91V53.513a9.614 9.614 0 0 1 .74-3.726 9.692 9.692 0 0 1 2.128-3.158 9.805 9.805 0 0 1 3.19-2.108 9.88 9.88 0 0 1 3.764-.732h1.091a9.88 9.88 0 0 1 3.763.733 9.805 9.805 0 0 1 3.19 2.107 9.69 9.69 0 0 1 2.129 3.158 9.614 9.614 0 0 1 .74 3.726V72.15c-.05.7-.354 1.359-.855 1.855a2.96 2.96 0 0 1-1.873.847Z" />
                  <path d="M62.591 87.548H57.68a19.843 19.843 0 0 1-7.559-1.591 19.677 19.677 0 0 1-6.356-4.351A20.202 20.202 0 0 1 38.31 70.26a2.676 2.676 0 0 1 .696-2.087 2.727 2.727 0 0 1 2.032-.884c.669.03 1.306.288 1.804.732.497.443.824 1.043.924 1.699a15.255 15.255 0 0 0 4.093 8.373 14.225 14.225 0 0 0 9.822 4.322h4.911c1.848-.024 3.67-.42 5.36-1.163a13.64 13.64 0 0 0 4.462-3.159 15.255 15.255 0 0 0 4.093-10.804V52.163a17.106 17.106 0 0 0-4.093-10.804 14.225 14.225 0 0 0-9.822-4.322H57.68c-1.847.024-3.67.42-5.36 1.163a13.64 13.64 0 0 0-4.462 3.159 15.255 15.255 0 0 0-4.093 10.804c0 .717-.287 1.404-.799 1.91a2.742 2.742 0 0 1-1.929.791 2.742 2.742 0 0 1-1.93-.79 2.688 2.688 0 0 1-.798-1.91 19.811 19.811 0 0 1 1.416-7.727 19.969 19.969 0 0 1 4.313-6.59 19.099 19.099 0 0 1 6.337-4.396 19.263 19.263 0 0 1 7.578-1.546h4.638c2.601.03 5.17.571 7.559 1.591a19.677 19.677 0 0 1 6.356 4.351 21.09 21.09 0 0 1 5.73 14.316V67.29a19.814 19.814 0 0 1-1.417 7.726 19.97 19.97 0 0 1-4.313 6.59 19.101 19.101 0 0 1-6.337 4.396 19.264 19.264 0 0 1-7.578 1.546Z" />
                </g>
              </g>
              <defs>
                <clipPath id="pdas_mobile_a">
                  <path fill="#fff" d="M0 0h120v120H0z" />
                </clipPath>
                <clipPath id="pdas_mobile_b">
                  <path fill="#fff" d="M27.123 21.37h65.753v76.712H27.123z" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className={styles.text_container}>
            <p
              className={joinClasses(
                styles.pdas_text,
                styles['pdas_text--white']
              )}
              ref={(ref) => (textPdasParagraphRefs.current[0] = ref)}
            >
              <span ref={(ref) => (textPdasRefs.current[0] = ref)}>
                Private Data Assets (PDAs)
              </span>
              <span
                className={styles.type_slash}
                ref={(ref) => (slashRefs.current[0] = ref)}
              >
                _
              </span>
            </p>
            <p
              className={joinClasses(
                styles.pdas_text,
                styles['pdas_text--purple']
              )}
              ref={(ref) => (textPdasParagraphRefs.current[1] = ref)}
            >
              <span ref={(ref) => (textPdasRefs.current[1] = ref)}>
                The foundation for true data privacy, sovereignty, and
                portability. Turn raw data into encrypted, secure, portable, and
                publicly verifiable assets.
              </span>
              <span
                className={styles.type_slash}
                ref={(ref) => (slashRefs.current[1] = ref)}
              >
                _
              </span>
            </p>
          </div>
        </Wrapper>
      </div>
    </section>
  );
}
