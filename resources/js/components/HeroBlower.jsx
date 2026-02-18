export default function HeroBlower({ blower }) {
    const calculatePercentage = (value, max) => {
        return Math.min(100, (value / max) * 100);
    };

    return (
        <section className="d-flex justify-content-center align-items-center py-5">
            <div className="container">
                <div 
                    className="hero-blur blower p-4 p-md-5" 
                    style={{
                        borderRadius: '20px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}
                >
                    <div className="row align-items-center">
                        {/* Imagen */}
                        <div className="col-md-5 col-lg-4 mb-4 mb-md-0 text-center">
                            <div 
                                style={{
                                    padding: '10px',
                                    border: '2px solid rgba(255,255,255,0.2)',
                                    borderRadius: '15px',
                                    display: 'inline-block'
                                }}
                            >
                                <img 
                                    src={blower.image_path} 
                                    alt={blower.full_name} 
                                    className="img-fluid rounded"
                                    style={{
                                        maxHeight: '350px',
                                        objectFit: 'cover',
                                        width: '100%',
                                        boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Información */}
                        <div className="col-md-7 col-lg-8">
                            <div className="pl-md-3">
                                <h2 className="text-white display-5 font-weight-bold mb-0">
                                    {blower.name}
                                </h2>
                                <h3 className="text-info mb-4">{blower.surname}</h3>
                                
                                {blower.description && (
                                    <div className="mb-4 text-white font-weight-bold">
                                        {blower.description}
                                    </div>
                                )}

                                {/* Estadísticas */}
                                <div className="stats-bars">
                                    {/* Edad */}
                                    <div className="mb-2">
                                        <div className="d-flex justify-content-between text-white mb-1">
                                            <span style={{ fontSize: '1.1rem' }}>🎂 Edad</span>
                                            <span className="font-weight-bold">{blower.age} años</span>
                                        </div>
                                        <div 
                                            className="progress" 
                                            style={{
                                                height: '24px',
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <div 
                                                className="progress-bar bg-success" 
                                                role="progressbar" 
                                                style={{ width: `${calculatePercentage(blower.age, 80)}%` }}
                                                aria-valuenow={blower.age} 
                                                aria-valuemin="0" 
                                                aria-valuemax="80"
                                            />
                                        </div>
                                    </div>

                                    {/* Años de Fumador */}
                                    <div className="mb-2">
                                        <div className="d-flex justify-content-between text-white mb-1">
                                            <span style={{ fontSize: '1.1rem' }}>🚬 Años de Fumador</span>
                                            <span className="font-weight-bold">{blower.smoking_years} años</span>
                                        </div>
                                        <div 
                                            className="progress" 
                                            style={{
                                                height: '24px',
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <div 
                                                className="progress-bar bg-danger" 
                                                role="progressbar" 
                                                style={{ width: `${calculatePercentage(blower.smoking_years, blower.age)}%` }}
                                                aria-valuenow={blower.smoking_years} 
                                                aria-valuemin="0" 
                                                aria-valuemax={blower.age}
                                            />
                                        </div>
                                    </div>

                                    {/* Capacidad Pulmonar */}
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between text-white mb-1">
                                            <span style={{ fontSize: '1.1rem' }}>🫁 Capacidad Pulmonar</span>
                                            <span className="font-weight-bold">{blower.pulmon_capacity} dl</span>
                                        </div>
                                        <div 
                                            className="progress" 
                                            style={{
                                                height: '24px',
                                                borderRadius: '12px',
                                                backgroundColor: 'rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <div 
                                                className="progress-bar bg-info" 
                                                role="progressbar" 
                                                style={{ width: `${calculatePercentage(blower.pulmon_capacity, 100)}%` }}
                                                aria-valuenow={blower.pulmon_capacity} 
                                                aria-valuemin="0" 
                                                aria-valuemax="100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}