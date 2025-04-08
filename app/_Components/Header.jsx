import Image from 'next/image'
import React from 'react'

export default function Header() {
  return (
    <>
        <Image src="/logo.svg" alt='logo' width="75" height={75} />
    </>
  )
}
