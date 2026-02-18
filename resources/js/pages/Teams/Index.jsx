import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, teams }) {
    const handleDelete = (teamId, teamName) => {
        if (confirm(`Delete this team: ${teamName}?`)) {
            router.delete(route('teams.destroy', teamId));
        }
    };

    return (
        <>
            <Head title="Teams" />
            
            <div className="container py-5">
                <h1 className="text-center mb-4 display-4">Teams</h1>
                
                {auth.user?.role === 'admin' && (
                    <div className="text-end mb-4">
                        <Link 
                            href={route('teams.create')} 
                            className="btn btn-success"
                        >
                            <i className="bi bi-plus-circle"></i> New Team
                        </Link>
                    </div>
                )}
                
                {teams.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No teams found. Create the first one!
                    </div>
                ) : (
                    <div className="row">
                        {teams.map((team) => (
                            <div key={team.id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-lg">
                                    {team.logo ? (
                                        <img 
                                            src={`${team.logo}`}
                                            className="card-img-top"
                                            alt={team.name}
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div 
                                            className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                                            style={{ height: '200px' }}
                                        >
                                            <span className="text-white">No Logo</span>
                                        </div>
                                    )}
                                    
                                    <div className="card-body">
                                        <h5 className="card-title">{team.name}</h5>
                                        
                                        {team.description && (
                                            <p className="card-text text-muted">
                                                {team.description.length > 150 
                                                    ? team.description.substring(0, 150) + '...'
                                                    : team.description
                                                }
                                            </p>
                                        )}
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="badge bg-primary">
                                                    <i className="bi bi-people"></i> 
                                                    {' '}{team.blowers_count} blowers
                                                </span>
                                            </div>
                                            
                                            <Link 
                                                href={route('teams.show', team.slug)}
                                                className="btn btn-primary btn-sm"
                                            >
                                                View Team
                                            </Link>
                                        </div>
                                    </div>
                                    
                                    {auth.user?.role === 'admin' && (
                                        <div className="card-footer bg-transparent">
                                            <div className="d-flex justify-content-end gap-2">
                                                <Link 
                                                    href={route('teams.edit', team.id)}
                                                    className="btn btn-warning btn-sm"
                                                >
                                                    <i className="bi bi-pencil"></i> Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(team.id, team.name)}
                                                    className="btn btn-danger btn-sm"
                                                >
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}