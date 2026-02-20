import BettingForm from '@/components/BettingForm';
import Hero from '@/components/Hero';
import Layout from '@/layouts/Layout';
import { Link, usePage } from '@inertiajs/react';
import { Col, Container, Row } from 'react-bootstrap';

export default function BetPlace({ event, bettingWindow }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    if (!event) {
        return <div>Event not found</div>;
    }

    if (!user) {
        return (
            <>
                <Hero
                    title={event.name}
                    subtitle="Please log in to place bets"
                />
                <section className="py-5">
                    <Container>
                        <div
                            className="card"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}
                        >
                            <div className="card-body py-5 text-center">
                                <h3 className="card-title mb-4">
                                    Authentication Required
                                </h3>
                                <p className="card-text mb-4">
                                    You need to be logged in to place bets on
                                    this event.
                                </p>
                                <Link
                                    href={route('login')}
                                    className="btn btn-primary btn-lg"
                                    style={{ backgroundColor: '#3b82f6' }}
                                >
                                    Log In
                                </Link>
                                <div className="mt-3">
                                    <p className="text-muted">
                                        Don't have an account?{' '}
                                        <Link
                                            href={route('register')}
                                            style={{ color: '#3b82f6' }}
                                        >
                                            Register here
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>
            </>
        );
    }

    return (
        <>
            <Hero
                title={event.name}
                subtitle={event.description || 'Place your bet on this event'}
            />

            <section className="py-5">
                <Container>
                    <Row>
                        <Col md={8}>
                            <div
                                className="card"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                <div className="card-body">
                                    <h3 className="card-title mb-4">
                                        Event Details
                                    </h3>

                                    <div className="mb-3">
                                        <strong>Location:</strong>{' '}
                                        {event.location}
                                    </div>

                                    <div className="mb-3">
                                        <strong>Date:</strong>{' '}
                                        {new Date(
                                            event.date,
                                        ).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </div>

                                    {bettingWindow && (
                                        <>
                                            <div className="mb-3">
                                                <strong>Event Status:</strong>{' '}
                                                <span
                                                    className={`badge bg-${
                                                        bettingWindow.status ===
                                                        'open'
                                                            ? 'success'
                                                            : bettingWindow.status ===
                                                                'closed'
                                                              ? 'danger'
                                                              : 'info'
                                                    }`}
                                                >
                                                    {bettingWindow.status ===
                                                    'pending'
                                                        ? 'Opening Soon'
                                                        : bettingWindow.status}
                                                </span>
                                            </div>
                                        </>
                                    )}

                                    {event.description && (
                                        <div className="mt-4">
                                            <h5>Description</h5>
                                            <p>{event.description}</p>
                                        </div>
                                    )}

                                    <button
                                        className="btn btn-primary btn-lg mt-4"
                                        style={{
                                            backgroundColor: '#3b82f6',
                                        }}
                                        onClick={() => {
                                            document
                                                .querySelector('.betting-form')
                                                .scrollIntoView({
                                                    behavior: 'smooth',
                                                });
                                        }}
                                    >
                                        Place Bet
                                    </button>
                                </div>
                            </div>
                        </Col>

                        <Col md={4}>
                            <BettingForm event={event} />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

BetPlace.layout = (page) => <Layout>{page}</Layout>;
