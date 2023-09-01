import { generateColor, generateGradient } from "../lib/generate-color";

type Props = {
  name: string;
  size: number;
  gradient?: boolean;
}

const Gradient = ({ name, size }: Omit<Props, "gradient">) => {
  const gradient = generateGradient(name);

  return (
    <>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradient.fromColor} />
          <stop offset="100%" stopColor={gradient.toColor} />
        </linearGradient>
      </defs>
      <rect fill="url(#gradient)" x="0" y="0" width={size} height={size} />
    </>
  )
}

const Color = ({ name, size }: Omit<Props, "gradient">) => {
  const color = generateColor(name);

  return (
    <rect fill={color} x="0" y="0" width={size} height={size} />
  )
}

export default function AvatarImage({ gradient, ...props }: Props) {

  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox={`0 0 120 120`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradient ? <Gradient {...props} /> : <Color {...props} />}
    </svg>
  );
}
