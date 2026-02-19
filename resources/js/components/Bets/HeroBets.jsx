import { TrendingUp, Users, Zap } from 'lucide-react';

function HeroBets() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 px-4 py-20">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
                <div
                    className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 opacity-10 blur-3xl"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-2">
                        <Zap className="h-5 w-5 text-yellow-400" />
                        <span className="text-sm font-semibold text-purple-200">
                            Live Betting Platform
                        </span>
                    </div>

                    <h1 className="mb-4 bg-gradient-to-r from-yellow-300 via-purple-200 to-blue-300 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
                        Marble Racing
                    </h1>
                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                        Championship Betting
                    </h2>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-purple-200">
                        Experience the thrill of precision betting on the
                        world's most elite marble racing competition. Fast
                        payouts, competitive odds, and the prestige of MBC.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-500/20 to-purple-600/10 p-6 backdrop-blur-sm transition hover:border-purple-300/50">
                        <div className="mb-4 flex items-center gap-3">
                            <Zap className="h-6 w-6 text-yellow-400" />
                            <span className="text-sm font-semibold text-purple-300">
                                Active
                            </span>
                        </div>
                        <div className="mb-2 text-4xl font-bold text-white">
                            3
                        </div>
                        <div className="text-purple-200">Live Races</div>
                    </div>

                    <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10 p-6 backdrop-blur-sm transition hover:border-blue-300/50">
                        <div className="mb-4 flex items-center gap-3">
                            <Users className="h-6 w-6 text-blue-300" />
                            <span className="text-sm font-semibold text-blue-300">
                                Competing
                            </span>
                        </div>
                        <div className="mb-2 text-4xl font-bold text-white">
                            48
                        </div>
                        <div className="text-blue-200">Active Marbles</div>
                    </div>

                    <div className="rounded-xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-6 backdrop-blur-sm transition hover:border-emerald-300/50">
                        <div className="mb-4 flex items-center gap-3">
                            <TrendingUp className="h-6 w-6 text-emerald-300" />
                            <span className="text-sm font-semibold text-emerald-300">
                                Volume
                            </span>
                        </div>
                        <div className="mb-2 text-4xl font-bold text-white">
                            $12.5K
                        </div>
                        <div className="text-emerald-200">Total Bets Today</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBets;
