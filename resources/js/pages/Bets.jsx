import Hero from '@/components/Hero';
import Layout from '@/layouts/Layout';
import { BarChart3, Lock, Shield, Zap } from 'lucide-react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Bets() {
    const features = [
        {
            icon: Zap,
            title: 'Real-Time Odds',
            description:
                'Dynamic odds that update instantly as races progress and bets are placed.',
        },
        {
            icon: Shield,
            title: 'Secure & Fair',
            description:
                'Licensed betting platform with verified fairness and transparent algorithms.',
        },
        {
            icon: BarChart3,
            title: 'Live Analytics',
            description:
                'Track your betting history, win rates, and performance metrics in real-time.',
        },
        {
            icon: Lock,
            title: 'Protected Account',
            description:
                'Bank-level security to keep your funds and personal information safe.',
        },
    ];

    return (
        <>
            {/* Title Banner */}
            <Hero
                title="Marble Racing Championship"
                subtitle="Experience the thrill of precision betting on the world's most elite marble racing competition. Fast payouts, competitive odds, and the prestige of MBC."
            />

            {/* Features Section Banner */}
            <Hero
                title="Why Choose Us"
                subtitle="Professional betting experience with industry-leading features"
                heroStyle={{
                    background: 'rgb(59, 131, 246)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                }}
                cosas={
                    <Container className="mt-4">
                        <Row className="g-4">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <Col
                                        key={index}
                                        md={6}
                                        lg={3}
                                        className="mb-4"
                                    >
                                        <div
                                            className="h-100 border-light hover-shadow-lg rounded-lg border p-4 shadow-sm transition"
                                            style={{
                                                backgroundColor: '#fff',
                                                transition: 'all 0.3s ease',
                                                borderColor: '#e9ecef',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow =
                                                    '0 1rem 3rem rgba(0,0,0,0.175)';
                                                e.currentTarget.style.transform =
                                                    'translateY(-4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow =
                                                    '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                                                e.currentTarget.style.transform =
                                                    'translateY(0)';
                                            }}
                                        >
                                            <div
                                                className="mb-3"
                                                style={{
                                                    color: '#3b82f6',
                                                }}
                                            >
                                                <Icon size={32} />
                                            </div>
                                            <h5
                                                className="fw-bold mb-3"
                                                style={{
                                                    color: '#1f2937',
                                                }}
                                            >
                                                {feature.title}
                                            </h5>
                                            <p
                                                style={{
                                                    color: '#4b5563',
                                                }}
                                            >
                                                {feature.description}
                                            </p>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Container>
                }
            />

            {/* Coming Soon Banner */}
            <Hero
                title="Betting Platform Launching Soon"
                subtitle="We're building the most advanced marble racing betting platform. The full experience will be available shortly with live race betting, live odds, and instant payouts."
                cosas={
                    <div className="mt-4">
                        <div className="d-flex justify-content-center flex-wrap gap-3">
                            <button
                                className="btn btn-lg"
                                style={{
                                    backgroundColor: '#3b82f6',
                                    color: '#fff',
                                    border: 'none',
                                }}
                            >
                                Notify Me
                            </button>
                            <button
                                className="btn btn-lg"
                                style={{
                                    borderColor: '#3b82f6',
                                    color: '#3b82f6',
                                }}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                }
            />
        </>
    );
}

Bets.layout = (page) => <Layout>{page}</Layout>;
