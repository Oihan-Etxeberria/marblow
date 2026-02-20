import React from 'react';
import { Button, Container } from 'react-bootstrap';

interface HeroSectionProps {
    title?: string;
    subtitle?: string;
    primaryButton?: { href: string; label: string; variant?: string };
    secondaryButton?: { href: string; label: string; variant?: string };
    cosas?: React.ReactNode;
    heroStyle?: React.CSSProperties;
}

function HeroSection({
    title,
    subtitle,
    primaryButton,
    secondaryButton,
    cosas,
    heroStyle,
}: HeroSectionProps) {
    return (
        <section className="d-flex justify-content-center align-items-center py-5">
            <Container>
                <div className="hero-blur text-center" style={heroStyle}>
                    {title && <h1 className="display-3 mb-3">{title}</h1>}

                    {subtitle && (
                        <p
                            className="lead mb-4"
                            style={{ maxWidth: '800px', margin: '0 auto' }}
                        >
                            {subtitle}
                        </p>
                    )}
                    {cosas && <div className="hero-cosas">{cosas}</div>}

                    {(primaryButton || secondaryButton) && (
                        <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                            {primaryButton && (
                                <Button
                                    href={primaryButton.href}
                                    variant={primaryButton.variant || 'primary'}
                                    size="lg"
                                    className="fw-bold gap-3 px-4 shadow-lg"
                                >
                                    {primaryButton.label}
                                </Button>
                            )}

                            {secondaryButton && (
                                <Button
                                    href={secondaryButton.href}
                                    variant={
                                        secondaryButton.variant ||
                                        'outline-light'
                                    }
                                    size="lg"
                                    className="px-4"
                                >
                                    {secondaryButton.label}
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}

export default HeroSection;
