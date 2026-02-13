import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ team, blowers }) {
    const { data, setData, post, errors, processing } = useForm({
        name: team.name || '',
        description: team.description || '',
        logo: null,
        blowers: team.blowers.map(b => b.id.toString()) || [],
        _method: 'PUT'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teams.update', team.id));
    };

    const handleFileChange = (e) => {
        setData('logo', e.target.files[0]);
    };

    const handleBlowersChange = (e) => {
        const selected = Array.from(e.target.selectedOptions, option => option.value);
        setData('blowers', selected);
    };

    return (
        <>
            <Head title={`Edit Team: ${team.name}`} />
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header bg-warning text-dark">
                                <h4 className="mb-0">
                                    <i className="bi bi-pencil me-2"></i>Edit Team: {team.name}
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Team Name *</label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            id="name" 
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required 
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">{errors.name}</div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea 
                                            className="form-control" 
                                            id="description" 
                                            rows="3"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="logo" className="form-label">Team Logo</label>
                                        
                                        {team.logo && (
                                            <div className="mb-2">
                                                <img 
                                                    src={`/${team.logo}`} 
                                                    alt="Current logo" 
                                                    className="img-thumbnail" 
                                                    style={{ maxHeight: '100px' }}
                                                />
                                                <br />
                                                <small>Current logo</small>
                                            </div>
                                        )}
                                        
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="logo" 
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-muted">Leave empty to keep current logo. Max size: 2MB</small>
                                    </div>
                                    
                                    <div className="mb-4">
                                        <label className="form-label">Select Blowers</label>
                                        <select 
                                            name="blowers[]" 
                                            className="form-select" 
                                            multiple 
                                            size="5"
                                            value={data.blowers}
                                            onChange={handleBlowersChange}
                                        >
                                            {blowers.map(blower => (
                                                <option key={blower.id} value={blower.id}>
                                                    {blower.name} {blower.surname}
                                                </option>
                                            ))}
                                        </select>
                                        <small className="text-muted">Hold Ctrl/Cmd to select multiple</small>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between">
                                        <Link href={route('teams.show', team.slug)} className="btn btn-secondary">
                                            <i className="bi bi-arrow-left me-2"></i>Cancel
                                        </Link>
                                        <div>
                                            <button type="submit" className="btn btn-warning" disabled={processing}>
                                                <i className="bi bi-save me-2"></i>Update Team
                                            </button>
                                            <Link href={route('teams.index')} className="btn btn-outline-primary ms-2">
                                                Back to Teams
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}