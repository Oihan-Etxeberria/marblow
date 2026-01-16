import { Trophy } from 'lucide-react';

function HeroBets() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 px-4 py-12">
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-10 top-10 h-32 w-32 animate-pulse rounded-full bg-white blur-3xl"></div>
                <div className="absolute bottom-10 right-10 h-40 w-40 animate-pulse rounded-full bg-yellow-300 blur-3xl delay-75"></div>
            </div>
            <div className="relative z-10 mx-auto max-w-7xl text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                    <Trophy className="h-12 w-12 text-yellow-300" />
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Marble Racing Championship
                    </h1>
                </div>
                <p className="mb-6 text-xl text-purple-100">
                    Place your bets on the world's most rigged marble
                    competitions!(and lose surely)
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm">
                    <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-yellow-300">
                            3
                        </div>
                        <div>Live Races</div>
                    </div>
                    <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-yellow-300">
                            48
                        </div>
                        <div>Active Marbles</div>
                    </div>
                    <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-yellow-300">
                            12.5K
                        </div>
                        <div>Total Bets Today</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBets;
