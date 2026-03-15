"use client";
import Link from "next/link";
import { PrimaryButton } from "./Button";
import {signIn, signOut, useSession} from "next-auth/react"

export default function Navbar(){

    const session = useSession();

    return(
 <header>
      <div className="flex justify-evenly p-2 gap-34 bg-transparent">
        <div>
            <Link href="/">
            <img className="text-xl font-extrabold tracking-tight h-12" src="/images/logo.png"></img>
            </Link>
        </div>
        <div className="flex items-center gap-12 text-sm font-mono">
          <a href="#home" className="text-high2/70">HOME</a>
          <a href="#service" className="text-high2/70">OUR SERVICE</a>
          <a href="#features" className="text-high2/70">FEATURES</a>
          <a href="#features" className="text-high2/70">FAQ</a>
        </div>
        <div className="flex items-center gap-4 font-mono">
            {session.data?.user? (
              <>
                <a className="text-high2 font-bold">LOG OUT</a>
                <PrimaryButton onClick={() => {
                  signOut();
                }}>&#x21d7;</PrimaryButton>
              </>
            ) : ( 
            <>
              <a className="text-high2 font-bold">LOG IN</a> 
              <PrimaryButton onClick={() => {
                signIn("google")
              }}>&#x21d7;</PrimaryButton>
            </>
            )}
            
        </div>
                
      </div>
    </header>
    )
}