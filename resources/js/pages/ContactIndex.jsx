import { useState } from 'react';
import { router } from '@inertiajs/react';

const ContactIndex = ({ messages = [] }) => {

    const [selected, setSelected] = useState(null);

    const handleDelete = (id) => {
        if (!confirm('Delete this message?')) return;
        router.delete(route('contact.destroy', id), { preserveScroll: true });
    };

    return (
        <div className="container py-5">

            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                    <h1 className="fw-bold mb-0">Contact Messages</h1>
                    <p className="text-muted mb-0">{messages.length} message{messages.length !== 1 ? 's' : ''} received</p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-3"></i>
                    No messages yet.
                </div>
            ) : (
                <div className="row g-4">

                    {/* Tabla izquierda */}
                    <div className={selected ? 'col-12 col-lg-5' : 'col-12'}>
                        <div className="card shadow-sm border-0">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {messages.map((msg) => (
                                            <tr
                                                key={msg.id}
                                                onClick={() => setSelected(selected?.id === msg.id ? null : msg)}
                                                style={{ cursor: 'pointer' }}
                                                className={selected?.id === msg.id ? 'table-active' : ''}
                                            >
                                                <td className="fw-semibold">{msg.name}</td>
                                                <td className="text-muted small">{msg.email}</td>
                                                <td className="text-muted small">
                                                    {new Date(msg.created_at).toLocaleDateString('en-GB', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })}
                                                </td>
                                                <td onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(msg.id)}
                                                        title="Delete"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Panel detalle derecha */}
                    {selected && (
                        <div className="col-12 col-lg-7">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-start mb-4">
                                        <div>
                                            <h5 className="fw-bold mb-1">{selected.name}</h5>
                                            <a href={`mailto:${selected.email}`} className="text-muted small">
                                                {selected.email}
                                            </a>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <a
                                                href={`mailto:${selected.email}`}
                                                className="btn btn-sm btn-outline-secondary"
                                                title="Reply by email"
                                            >
                                                <i className="bi bi-reply me-1"></i> Reply
                                            </a>
                                            <button
                                                className="btn btn-sm btn-close"
                                                onClick={() => setSelected(null)}
                                                aria-label="Close"
                                            />
                                        </div>
                                    </div>

                                    <hr />

                                    <p className="text-muted small mb-2">
                                        <i className="bi bi-calendar3 me-1"></i>
                                        {new Date(selected.created_at).toLocaleDateString('en-GB', {
                                            weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
                                        })}
                                    </p>

                                    <div
                                        className="mt-3 p-3 bg-light rounded"
                                        style={{ whiteSpace: 'pre-wrap', lineHeight: '1.7' }}
                                    >
                                        {selected.message}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ContactIndex;
