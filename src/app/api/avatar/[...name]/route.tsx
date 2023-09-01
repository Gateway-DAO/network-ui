import { ImageResponse } from "next/server";

import AvatarImage from "./components/avatar-image";
export const runtime = 'edge'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const name = url.searchParams.get("name") ?? "";
  const gradient = url.searchParams.get("gradient");
  const hasGradient = gradient ? gradient.length > 0 : false;
  const size = Math.max(
    Math.min(
      Number(url.searchParams.get("size")) || 120,
      120
    )
    , 10);
  const avatar = (<AvatarImage name={name} size={size} gradient={hasGradient} />);
  return new ImageResponse(avatar, {
    width: 120,
    height: 120,
  });
}
