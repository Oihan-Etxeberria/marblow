import Hero from '@/components/Hero';
import Layout from '@/layouts/Layout';
import { Link } from '@inertiajs/react';
import { BarChart3, Lock, Shield, Zap } from 'lucide-react';
import { Col, Container, Row } from 'react-bootstrap';

export default function Bets({ bettingWindows = [] }) {
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

            {/* Upcoming Betting Windows */}
            {bettingWindows && bettingWindows.length > 0 && (
                <section
                    className="py-5"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        margin: '3rem 15rem',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Container>
                        <h2
                            className="mb-5 text-center"
                            style={{ color: '#1f2937' }}
                        >
                            Upcoming Betting Windows
                        </h2>
                        <div className="table-responsive">
                            <table
                                className="table-hover table"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: '#3b82f6',
                                            color: 'white',
                                        }}
                                    >
                                        <th className="ps-4">ID</th>
                                        <th className="ps-4">Event Name</th>
                                        <th>Location</th>
                                        <th>Event Date</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bettingWindows.map((bettingWindow) => {
                                        const {
                                            event,
                                            status,
                                            opens_at,
                                            closes_at,
                                        } = bettingWindow;
                                        const formatDate = (date) => {
                                            return new Date(
                                                date,
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            });
                                        };

                                        return (
                                            <tr key={bettingWindow.id}>
                                                <td className="ps-4">
                                                    <small className="text-muted">
                                                        #{event.id}
                                                    </small>
                                                </td>
                                                <td className="fw-bold ps-4">
                                                    {event.name}
                                                </td>
                                                <td>{event.location}</td>
                                                <td>
                                                    {formatDate(event.date)}
                                                </td>
                                                <td className="text-center">
                                                    <Link
                                                        href={route(
                                                            'bet.place',
                                                            event.id,
                                                        )}
                                                        className="btn btn-sm"
                                                        style={{
                                                            backgroundColor:
                                                                '#3b82f6',
                                                            color: '#fff',
                                                            border: 'none',
                                                            textDecoration:
                                                                'none',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        Place Bet
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </Container>
                </section>
            )}
        </>
    );
}

Bets.layout = (page) => <Layout>{page}</Layout>;
