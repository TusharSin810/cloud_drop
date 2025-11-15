import { ShoppingCart, Package, Shield } from "lucide-react";

export default function Work(){
    return(
        <section className="bg-gradient-to-b from-transparent via-primary to-primary text-high2 py-16">
            <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-5xl font-bold mb-12">
                FEATURES
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <div className="flex flex-col items-start relative pr-6">
                <ShoppingCart className="w-10 h-10 mb-4 text-high1" />
                <h3 className="text-xl font-semibold mb-2">PLACE YOUR ORDER</h3>
                <p className="text-high2 text-sm">
                    Order through our app or website. Enter your delivery details,
                    confirm your order, and we&apos;ll handle the rest!
                </p>
                 <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-secondary to-transparent"></div>
            </div>

            <div className="flex flex-col items-start relative pr-6">
                <Package className="w-10 h-10 mb-4 text-high1" />
                <h3 className="text-xl font-semibold mb-2">
                    DRONE PICK UP & FLIGHT
                </h3>
                <p className="text-high2 text-sm">
                    Our drone picks up your package and flies directly to the delivery
                    address, avoiding traffic. You can track it in real-time.
                </p>
                <button className="mt-10 px-6 py-2 rounded-full border border-high1 text-high2 font-semibold hover:bg-high1 transition hover:cursor-pointer hover:text-primary">See Pricing
                </button>
                <div className="absolute right-0 top-1/4 h-1/2 w-px bg-gradient-to-b from-transparent via-secondary to-transparent"></div>

            </div>

            <div className="flex flex-col items-start">
                <Shield className="w-10 h-10 mb-4 text-high1" />
                <h3 className="text-xl font-semibold mb-2">SAFE DELIVERY</h3>
                <p className="text-high2 text-sm">
                    The drone safely delivers the package to your doorstep, and
                    you&apos;ll get a notification when it arrives. Fast, easy, and
                    hassle-free!
                </p>
            </div>
            </div>
            </div>
        </section>
    )
}