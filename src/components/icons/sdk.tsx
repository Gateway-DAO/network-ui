import { SvgIcon, SvgIconProps } from '@mui/material';

export default function SDKIcon(props: SvgIconProps) {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 41 40"
      fill="none"
      {...props}
    >
      <path
        fill="#771AC9"
        fillRule="evenodd"
        d="M5.419 3A5.085 5.085 0 00.333 8.085V32.2a5.085 5.085 0 005.086 5.086h29.829a5.085 5.085 0 005.085-5.086V8.085A5.085 5.085 0 0035.248 3H5.418zm.629 6.667a2.857 2.857 0 00-2.857 2.857V31.57a2.857 2.857 0 002.857 2.858h28.571a2.857 2.857 0 002.857-2.858V12.524a2.857 2.857 0 00-2.857-2.857H6.048z"
        clipRule="evenodd"
      />
      <path
        fill="#F5B5FF"
        d="M19.924 14c-1.04 0-2.07.207-3.032.609a7.92 7.92 0 00-2.571 1.734 8.008 8.008 0 00-1.718 2.596 8.067 8.067 0 000 6.122 8.016 8.016 0 001.718 2.596 7.919 7.919 0 002.57 1.734 7.86 7.86 0 003.033.609V14zm1.208 0h.528c3.502 0 6.34 2.865 6.34 6.4L21.132 14zM28 24.291V30h-6.868v-5.709c0-1.854 1.538-3.358 3.434-3.358 1.897 0 3.434 1.504 3.434 3.358z"
      />
    </SvgIcon>
  );
}