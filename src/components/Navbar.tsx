import Link from "next/link";

export default function Navbar(){
    return(
 <header>
      <div className="flex justify-evenly p-2 gap-34 bg-primary border-b-2 border-white/20">
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
            <a href="/login" className="text-high2 font-bold">LOG IN</a>
            <button className="text-high2 border-1 w-14 h-8 rounded-2xl text-sm hover:cursor-pointer hover:scale-105 hover:bg-high1">&#x21d7;</button>
        </div>
                
      </div>
    </header>
    )
}