import Image from "next/image"

export default function Hero(){
    return(
        <div className="bg-primary h-max flex justify-center pt-14">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-high2">
                    CLOUD <span className="text-high1">DROP</span>
                </h1>
                <h2 className="text-5xl font-semibold mt-4 text-high1">
                 DRONE <span className="text-high2">DELIVERY</span>
                </h2>
                <button className="border-1 w-40 h-10 rounded-4xl text-sm mt-6 text-high2 hover:bg-high1 border-high1 font-semibold hover:cursor-pointer hover:text-primary">ORDER DELIVERY</button>

                <Image src="/images/Drone.png" height={1400} width={1400} alt="Drone Image"></Image>

            </div>
        </div>
    )
}