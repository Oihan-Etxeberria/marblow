import { Link } from '@inertiajs/react';

export default function BlowerCard({ blower }) {
    return (
        <Link href={route('blowers.show', blower.slug)}>
            <div className="participant-card">
                <div className="participant-card-img-container">
                    <img 
                        src={blower.image_path} 
                        alt={`${blower.surname} portrait`}
                        className="participant-card-img"
                    />
                </div>

                <div className="participant-card-overlay text-center text-white">
                    <div className="mb-1">
                        <span className="participant-badge">{blower.name}</span>
                    </div>
                    <h3 className="participant-nickname mb-2">{blower.surname}</h3>
                    <div className="participant-details">
                        <span>{blower.age} YEARS</span>
                        <span className="mx-2">•</span>
                        <span>{blower.pulmon_capacity || blower.lung_capacity} DL</span>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .participant-details span{
                    color: black !important;
                }
            `}</style>
        </Link>
    );
}
