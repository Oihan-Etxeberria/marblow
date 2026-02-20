import { Calendar, Clock } from 'lucide-react';

export default function BettingWindowCard({ bettingWindow }) {
    const { event, status, opens_at, closes_at } = bettingWindow;
    const now = new Date();
    const opensDate = new Date(opens_at);
    const closesDate = new Date(closes_at);
    const eventDate = new Date(event.date);

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'success';
            case 'closed':
                return 'danger';
            case 'pending':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'open':
                return 'Open for Betting';
            case 'closed':
                return 'Closed';
            case 'pending':
                return 'Coming Soon';
            default:
                return status;
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            className="card h-100 shadow-sm"
            style={{
                border: '1px solid #e9ecef',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                    '0 1rem 3rem rgba(0,0,0,0.175)';
                e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                    '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            <div className="card-body">
                <h5 className="card-title mb-3" style={{ color: '#1f2937' }}>
                    {event.name}
                </h5>

                <div className="mb-3">
                    <span className={`badge bg-${getStatusColor(status)}`}>
                        {getStatusLabel(status)}
                    </span>
                </div>

                <div className="mb-3" style={{ color: '#4b5563' }}>
                    <div className="d-flex align-items-center mb-2">
                        <Calendar size={16} className="me-2" />
                        <small>
                            <strong>Event:</strong> {formatDate(eventDate)}
                        </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                        <Clock size={16} className="me-2" />
                        <small>
                            <strong>Opens:</strong> {formatDate(opensDate)}
                        </small>
                    </div>
                    <div className="d-flex align-items-center">
                        <Clock size={16} className="me-2" />
                        <small>
                            <strong>Closes:</strong> {formatDate(closesDate)}
                        </small>
                    </div>
                </div>

                {event.location && (
                    <p
                        className="card-text"
                        style={{ color: '#4b5563', fontSize: '0.9rem' }}
                    >
                        <strong>Location:</strong> {event.location}
                    </p>
                )}

                {event.description && (
                    <p
                        className="card-text"
                        style={{ color: '#4b5563', fontSize: '0.9rem' }}
                    >
                        {event.description}
                    </p>
                )}

                <button
                    className="btn btn-sm mt-3"
                    style={{
                        backgroundColor:
                            status === 'open' ? '#3b82f6' : '#6b7280',
                        color: '#fff',
                        border: 'none',
                    }}
                    disabled={status !== 'open'}
                >
                    {status === 'open' ? 'Place Bet' : 'Coming Soon'}
                </button>
            </div>
        </div>
    );
}
