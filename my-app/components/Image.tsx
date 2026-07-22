import Image from 'next/image'

interface ImageProps {
    src: string
    alt: string
    credit?: string
    variant?: 'side' | 'center'
}

export function SiteImage({ src, alt, credit, variant = 'side' }: ImageProps) {
    if (variant === 'center') {
        return (
            <div className="flex justify-center items-center w-full lg:min-h-[60vh]">
                <Image
                    src={src}
                    alt={alt}
                    width={650}
                    height={350}
                    className="rounded-xl shadow-2xl border-gray-100 dark:border-gray-700"
                    style={{ width: 'auto', height: 'auto' }}
                    priority
                />

                {credit && <span className="sr-only">{credit} </span>}
            </div>
        )
    }
    return (
        <div className="hidden md:flex w-1/2 relative">
            <Image
                src={src}
                alt={alt}
                fill
                priority
                sizes="50vw"
                className="object-cover"
            />
            {credit && <span className="sr-only">{credit} </span>}
        </div>
    )
}
