import Image from 'next/image'

export function Header() {
  return (
    <div className="flex justify-center mb-4">
      <Image
        src="https://michaelvaughngreen.com/McPollster/mcArch.svg"
        alt="McDonald's Logo"
        width={24}
        height={24}
      />
    </div>
  )
}
