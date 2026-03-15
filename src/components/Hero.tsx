"use client";
import Image from "next/image"
import { PrimaryButton } from "./Button"
import { useRouter } from "next/navigation";

export default function Hero(){
    const router = useRouter();

    return(
        <div className="bg-transparent h-max flex justify-center pt-14">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-high2">
                    CLOUD <span className="text-high1">DROP</span>
                </h1>
                <h2 className="text-5xl font-semibold mt-4 text-high1 mb-3">
                 DRONE <span className="text-high2">DELIVERY</span>
                </h2>
                <PrimaryButton onClick={() => {router.push("/dashboard")}}>ORDER DELIVERY</PrimaryButton>

                <Image src="/images/Drone.png" height={1400} width={1400} alt="Drone Image"></Image>

            </div>
        </div>
    )
}