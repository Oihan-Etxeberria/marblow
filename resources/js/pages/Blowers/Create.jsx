import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ events }) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        surname: '',
        description: '',
        age: '',
        pulmon_capacity: '',
        smoking_years: '',
        lung_capacity: '',
        image: null,
        events: []
    });

    const [eventFields, setEventFields] = useState([]);
    const [eventCounter, setEventCounter] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('blowers.store'));
    };

    const handleFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const addEventField = () => {
        const newId = eventCounter + 1;
        setEventCounter(newId);
        setEventFields([...eventFields, { id: newId, event_id: '', rank: '', time: '', top_blow: '' }]);
    };

    const removeEventField = (id) => {
        setEventFields(eventFields.filter(field => field.id !== id));
        
        // Remove from form data
        const updatedEvents = data.events.filter((_, index) => {
            const fieldIds = eventFields.map(f => f.id);
            return fieldIds[index] !== id;
        });
        setData('events', updatedEvents);
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
            <Head title="Create New Blower" />
            
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">
                                    <i className="bi bi-person-plus me-2"></i>Create a new Blower
                                </h4>
                            </div>
                            
                            <div className="card-body">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Name *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required 
                                            />
                                            {errors.name && (
                                                <div className="text-danger">{errors.name}</div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="surname" className="form-label">Surname/Nickname *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="surname"
                                                value={data.surname}
                                                onChange={e => setData('surname', e.target.value)}
                                                required 
                                            />
                                            {errors.surname && (
                                                <div className="text-danger">{errors.surname}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description *</label>
                                        <textarea 
                                            className="form-control" 
                                            id="description"
                                            rows="3"
                                            value={data.description}
                                            onChange={e => setData('description', e.target.value)}
                                            required
                                        />
                                        {errors.description && (
                                            <div className="text-danger">{errors.description}</div>
                                        )}
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="age" className="form-label">Age *</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="age"
                                                value={data.age}
                                                onChange={e => setData('age', e.target.value)}
                                                min="1" 
                                                max="120" 
                                                required 
                                            />
                                            {errors.age && (
                                                <div className="text-danger">{errors.age}</div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="pulmon_capacity" className="form-label">Pulmonar Cap. (dl) *</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="pulmon_capacity"
                                                value={data.pulmon_capacity}
                                                onChange={e => setData('pulmon_capacity', e.target.value)}
                                                min="1" 
                                                max="200" 
                                                required 
                                            />
                                            {errors.pulmon_capacity && (
                                                <div className="text-danger">{errors.pulmon_capacity}</div>
                                            )}
                                        </div>
                                        
                                        <div className="col-md-4 mb-3">
                                            <label htmlFor="smoking_years" className="form-label">Years as smoker *</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="smoking_years"
                                                value={data.smoking_years}
                                                onChange={e => setData('smoking_years', e.target.value)}
                                                min="0" 
                                                required 
                                            />
                                            {errors.smoking_years && (
                                                <div className="text-danger">{errors.smoking_years}</div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="lung_capacity" className="form-label">Lung Size (L)</label>
                                        <input 
                                            type="number" 
                                            step="0.1" 
                                            className="form-control" 
                                            id="lung_capacity"
                                            value={data.lung_capacity}
                                            onChange={e => setData('lung_capacity', e.target.value)}
                                        />
                                        {errors.lung_capacity && (
                                            <div className="text-danger">{errors.lung_capacity}</div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Photo of Blower</label>
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            id="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <small className="text-muted">Max size: 2MB</small>
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
                                                                    onChange={e => updateEventField(field.id, 'event_id', e.target.value)}
                                                                >
                                                                    <option value="">Select...</option>
                                                                    {events.map(event => (
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
                                                                    onChange={e => updateEventField(field.id, 'rank', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-3 mb-2">
                                                                <label className="form-label">Time</label>
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control"
                                                                    placeholder="00:00 min"
                                                                    onChange={e => updateEventField(field.id, 'time', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-2 mb-2">
                                                                <label className="form-label">Top Blow</label>
                                                                <input 
                                                                    type="number" 
                                                                    className="form-control"
                                                                    min="1"
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
                                        <Link href={route('blowers.index')} className="btn btn-secondary">
                                            <i className="bi bi-arrow-left me-2"></i> Cancel
                                        </Link>
                                        <button type="submit" className="btn btn-primary" disabled={processing}>
                                            <i className="bi bi-save me-2"></i> Create Blower
                                        </button>
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