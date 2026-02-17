import Hero from '@/components/Hero';
import Highlights from '@/components/HighlightsSection';
import AdBanner from '@/components/AdBanner';

import { Link, usePage } from '@inertiajs/react';

const Home = () => {
  const { auth } = usePage().props;         // ← Aquí está la magia
  const user = auth?.user;

  return (
    <>
      <Hero 
        title="IMBC Rulebook"
        subtitle="The rules for aura blowing."
        cosas={
          <div class="text-start">
            <section>
                <h2>1. MISSION STATEMENT</h2>

                <p>The <strong>International Marble Blow-Racing Championship (IMBC)</strong> is the ultimate test of respiratory endurance, precision, and tactical lung capacity. We celebrate the intersection of human spirit and aerodynamic mastery. In this arena, we honor the veterans of the "Seasoned Lung," recognizing that every breath taken is a step toward glory.</p>
            </section>

            <section>
                <h2>2. COMPETITION SPECIFICATIONS</h2>
                <h3>2.1 The Marble</h3>
                <ul>
                    <li><strong>Official IMBC 16mm Glass Sphere:</strong> Weight must be exactly 5.5 grams.</li>
                    <li><strong>Modifications:</strong> Polishing is permitted; adhesive or weighted cores result in immediate disqualification.</li>
                </ul>
                <h3>2.2 The Circuit</h3>
                <p>Each track consists of:</p>
                <ul>
                    <li><strong>The Hairpins:</strong> Sharp curves for short, tactical bursts.</li>
                    <li><strong>The Lung-Busters:</strong> Long straightaways for sustained exhalation.</li>
                    <li><strong>The "Marlboro Tunnels":</strong> Narrow passages requiring extreme precision.</li>
                </ul>
            </section>

            <section>
                <h2>3. CORE RULES OF PLAY</h2>
                <ul>
                    <li><strong>The "No-Touch" Mandate:</strong> Movement must be generated strictly by oral exhalation. No physical contact allowed.</li>
                    <li><strong>The "Dry Gale" Policy:</strong> Excessive moisture or "spray" results in a 5-second penalty.</li>
                    <li><strong>Proximity Zone:</strong> Competitors must stay 2cm away from the marble. "Lip-to-Glass" contact is a foul.</li>
                    <li><strong>The Restart:</strong> If a marble leaves the track, it returns to the last checkpoint after a 3-second "Recovery Breath."</li>
                </ul>
            </section>

            <section>
                <h2>4. THE "SEASONED LUNG" CULTURE</h2>
                <div class="highlight">
                    "We acknowledge the masters of the breath—those whose years of practice have forged lungs of steel."
                </div>
                <p><strong>Pre-Heat Rituals:</strong> Competitors are granted 5 minutes in the designated <strong>Marlboro Lounges</strong> for respiratory focus.</p>
                <p><strong>The Master’s Advantage:</strong> Veterans (10+ years) may wear the Traditional Trench Coat during the heat.</p>
            </section>

            <section>
                <h2>5. PENALTIES</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Infraction</th>
                            <th>Penalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Manual Contact</td>
                            <td>Immediate Disqualification (DQ)</td>
                        </tr>
                        <tr>
                            <td>Blowing Out of Turn</td>
                            <td>10-second Pit Stop</td>
                        </tr>
                        <tr>
                            <td>Air Interference</td>
                            <td>Re-run of the heat</td>
                        </tr>
                        <tr>
                            <td>Lack of "Grit"</td>
                            <td>Official Warning</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            </div>
        }
      />
    </>
  );
};

export default Home;