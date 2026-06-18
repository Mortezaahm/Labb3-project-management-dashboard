import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  credit?: string;
}

export function SideImage({ src, alt, credit } : ImageProps) {
  return (
  <div className="hidden md:flex w-1/2 relative">
    <Image src={src} alt={alt} fill priority objectFit="cover" sizes="50vw" className="object-cover" />
    {credit && <span className="sr-only">{credit} </span >}
  </div>
  )
}
