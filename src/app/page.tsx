"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function Home() {
  const { data: sessions } = useSession()
  return (
    <>
      <NextSeo title='Home' description='Home page' />
      {sessions === null
        ? <button onClick={() => signIn()}>Sign in</button>
        : <button onClick={() => signOut()}>Sign out</button>
      }
      {sessions && (
        <pre>
          {JSON.stringify(sessions, null, 2)}
        </pre>
      )
      }

      Go to <Link href="/countries">countries</Link> page
    </>
  )
}