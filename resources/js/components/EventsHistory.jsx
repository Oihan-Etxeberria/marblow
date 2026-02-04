export default function EventsHistory({ events }) {
    const getRankBadge = (rank) => {
        switch (rank) {
            case 1:
                return (
                    <span className="badge bg-warning text-dark" style={{ fontSize: '1em' }}>
                        🥇 1º
                    </span>
                );
            case 2:
                return (
                    <span className="badge bg-secondary" style={{ fontSize: '1em' }}>
                        🥈 2º
                    </span>
                );
            case 3:
                return (
                    <span 
                        className="badge" 
                        style={{ 
                            fontSize: '1em', 
                            backgroundColor: '#cd7f32', 
                            color: 'white' 
                        }}
                    >
                        🥉 3º
                    </span>
                );
            default:
                return <span className="font-weight-bold">{rank}º</span>;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <section className="py-5" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="container">
                <h3 className="text-white mb-4 border-bottom pb-2 border-secondary">
                    🏆 Historial de Competiciones
                </h3>

                {events && events.length > 0 ? (
                    <div className="table-responsive">
                        <table 
                            className="table table-dark table-hover text-center align-middle" 
                            style={{ borderRadius: '10px', overflow: 'hidden' }}
                        >
                            <thead style={{ backgroundColor: '#000' }}>
                                <tr>
                                    <th className="py-3 text-uppercase text-secondary">Evento</th>
                                    <th className="py-3 text-uppercase text-secondary">Fecha</th>
                                    <th className="py-3 text-uppercase text-secondary">Ranking</th>
                                    <th className="py-3 text-uppercase text-secondary">Tiempo</th>
                                    <th className="py-3 text-uppercase text-info">💨 Top Blow</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event, index) => (
                                    <tr key={event.id || index}>
                                        <td className="text-white">{event.name}</td>
                                        <td className="text-white-50">
                                            {formatDate(event.date)}
                                        </td>
                                        <td>
                                            {getRankBadge(event.pivot.rank)}
                                        </td>
                                        <td>{event.pivot.time}</td>
                                        <td 
                                            className="font-weight-bold text-info" 
                                            style={{ fontSize: '1.1rem' }}
                                        >
                                            {event.pivot.top_blow}{' '}
                                            <span style={{ fontSize: '0.8rem' }}>N</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-muted">
                            Este participante aún no tiene registros de eventos.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}