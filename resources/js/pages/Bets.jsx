import HeroBets from '@/components/Bets/HeroBets';
import Stats from '@/components/Bets/Stats';
import "./Bets.css"

const balance = 1250.75
  const bets = {
    "3-7": 50,     // carrera 3 - participante 7 → $50
    "3-12": 30,    // carrera 3 - participante 12 → $30
    "5-4": 100     // carrera 5 - participante 4 → $100
  }
  
  const upcomingRaces = [
    {
      id: 3,
      participants: [
        { id: 7, odds: 3.4 },
        { id: 12, odds: 8.9 },
        // ...
      ]
    },
    {
      id: 5,
      participants: [
        { id: 4, odds: 2.15 },
        // ...
      ]
    }
  ]

export default function Bets() {
    return (
        <div>
            <HeroBets />
            <Stats 
                balance={balance}
                bets={bets}
                upcomingRaces={upcomingRaces}
            />
        </div>
    );
}
