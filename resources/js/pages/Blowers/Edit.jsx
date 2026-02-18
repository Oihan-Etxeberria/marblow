import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ blower, events: allEvents }) {
    const { data, setData, post, errors, processing } = useForm({
        name: blower.name || '',
        surname: blower.surname || '',
        description: blower.description || '',
        age: blower.age || '',
        pulmon_capacity: blower.pulmon_capacity || '',
        smoking_years: blower.smoking_years || '',
        lung_capacity: blower.lung_capacity || '',
        image: null,
        events: blower.events?.map(e => ({
            event_id: e.id,
            rank: e.pivot.rank,
            time: e.pivot.time,
            top_blow: e.pivot.top_blow
        })) || [],
        _method: 'PUT'
    });

    const initialFields = blower.events?.map((event, index) => ({
        id: index,
        event_id: event.id,
        rank: event.pivot.rank,
        time: event.pivot.time,
        top_blow: event.pivot.top_blow
    })) || [];

    const [eventFields, setEventFields] = useState(initialFields);
    const [eventCounter, setEventCounter] = useState(initialFields.length);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('blowers.update', blower.id));
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const addEventField = () => {
        const newId = eventCounter;
        setEventCounter(newId + 1);
        setEventFields([...eventFields, { id: newId, event_id: '', rank: '', time: '', top_blow: '' }]);
    };

    const removeEventField = (id) => {
        setEventFields(eventFields.filter(field => field.id !== id));
        
        const index = eventFields.findIndex(f => f.id === id);
        if (index !== -1) {
            const updatedEvents = data.events.filter((_, i) => i !== index);
            setData('events', updatedEvents);
        }
    };

    const updateEventField = (id, field, value) => {
        const index = eventFields.findIndex(f => f.id === id);
        if (index !== -1) {
            const updatedEvents = [...data.events];
            if (!updatedEvents[index]) {
                updatedEvents[index] = {};
            }
            updatedEvents[index][field] = value;
            setData('events', updatedEvents);
        }
    };

    return (
        <>
            <Head title={`Edit Blower: ${blower.name}`} />
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header bg-warning text-dark">
                                <h4 className="mb-0">
                                    <i className="bi bi-pencil me-2"></i>Edit Blower: {blower.name}
                                </h4>
                            </div>
                            
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Name *</label>
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
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="surname" className="form-label">Surname/Nickname *</label>
                                            <input 
                                                type="text" 
                                                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                                                id="surname"
                                                value={data.surname}
                                                onChange={e => setData('surname', e.target.value)}
                                                required 
                                            />
                                            {errors.surname && (
                                                <div className="invalid-feedback">{errors.surname}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description *</label>
                                        <textarea 
                                            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                            id="description"
                                            rows="3"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            required
                                        />
                                        {errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="age" className="form-label">Age *</label>
                                            <input 
                                                type="number" 
                                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                                id="age"
                                                value={data.age}
                                                onChange={e => setData('age', e.target.value)}
                                                min="1" 
                                                max="120" 
                                                required 
                                            />
                                            {errors.age && (
                                                <div className="invalid-feedback">{errors.age}</div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="pulmon_capacity" className="form-label">Pulmonar Cap. (dl) *</label>
                                            <input 
                                                type="number" 
                                                className={`form-control ${errors.pulmon_capacity ? 'is-invalid' : ''}`}
                                                id="pulmon_capacity"
                                                value={data.pulmon_capacity}
                                                onChange={e => setData('pulmon_capacity', e.target.value)}
                                                min="1" 
                                                max="200" 
                                                required 
                                            />
                                            {errors.pulmon_capacity && (
                                                <div className="invalid-feedback">{errors.pulmon_capacity}</div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="smoking_years" className="form-label">Years as smoker *</label>
                                            <input 
                                                type="number" 
                                                className={`form-control ${errors.smoking_years ? 'is-invalid' : ''}`}
                                                id="smoking_years"
                                                value={data.smoking_years}
                                                onChange={e => setData('smoking_years', e.target.value)}
                                                min="0" 
                                                required 
                                            />
                                            {errors.smoking_years && (
                                                <div className="invalid-feedback">{errors.smoking_years}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="lung_capacity" className="form-label">Lung Size (L)</label>
                                        <input 
                                            type="number" 
                                            step="0.1" 
                                            className={`form-control ${errors.lung_capacity ? 'is-invalid' : ''}`}
                                            id="lung_capacity"
                                            value={data.lung_capacity}
                                            onChange={e => setData('lung_capacity', e.target.value)}
                                        />
                                        {errors.lung_capacity && (
                                            <div className="invalid-feedback">{errors.lung_capacity}</div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Photo of Blower</label>
                                        
                                        {blower.image && (
                                            <div className="mb-2">
                                                <img 
                                                    src={`/${blower.image}`} 
                                                    alt="Current image" 
                                                    className="img-thumbnail" 
                                                    style={{ maxHeight: '150px' }}
                                                />
                                                <br />
                                                <small>Current image</small>
                                            </div>
                                        )}
                                        
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-muted">Leave empty to keep current image. Max size: 2MB</small>
                                        {errors.image && (
                                            <div className="text-danger">{errors.image}</div>
                                        )}
                                    </div>
                                    
                                    {/* Events Section */}
                                    <div className="mb-4">
                                        <label className="form-label">Participated Events (Optional)</label>
                                        <div id="events-container">
                                            {eventFields.map((field, index) => (
                                                <div key={field.id} className="card mb-2">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-4 mb-2">
                                                                <label className="form-label">Event</label>
                                                                <select 
                                                                    className="form-select"
                                                                    value={data.events[index]?.event_id || ''}
                                                                    onChange={e => updateEventField(field.id, 'event_id', e.target.value)}
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {allEvents.map(event => (
                                                                        <option key={event.id} value={event.id}>
                                                                            {event.name} ({new Date(event.date).toLocaleDateString()})
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="col-md-2 mb-2">
                                                                <label className="form-label">Rank</label>
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control"
                                                                    min="1"
                                                                    value={data.events[index]?.rank || ''}
                                                                    onChange={e => updateEventField(field.id, 'rank', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-3 mb-2">
                                                                <label className="form-label">Time</label>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control"
                                                                    placeholder="00:00 min"
                                                                    value={data.events[index]?.time || ''}
                                                                    onChange={e => updateEventField(field.id, 'time', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-2 mb-2">
                                                                <label className="form-label">Top Blow</label>
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control"
                                                                    min="1"
                                                                    value={data.events[index]?.top_blow || ''}
                                                                    onChange={e => updateEventField(field.id, 'top_blow', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-1 mb-2 d-flex align-items-end">
                                                                <button 
                                                                    type="button" 
                                                                    className="btn btn-danger btn-sm"
                                                                    onClick={() => removeEventField(field.id)}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-secondary mt-2"
                                            onClick={addEventField}
                                        >
                                            <i className="bi bi-plus"></i> Add Event
                                        </button>
                                    </div>
                                    
                                    <div className="d-flex justify-content-between">
                                        <Link href={route('blowers.show', blower.id)} className="btn btn-secondary">
                                            <i className="bi bi-arrow-left me-2"></i> Cancel
                                        </Link>
                                        <div>
                                            <button type="submit" className="btn btn-warning" disabled={processing}>
                                                <i className="bi bi-save me-2"></i> Update Blower
                                            </button>
                                            <Link href={route('blowers.index')} className="btn btn-outline-primary ms-2">
                                                Back to Blowers
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