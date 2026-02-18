import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from '@inertiajs/react';
import HeroSection from '@/components/Hero';

function Freestyle() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    modalidad: '',
    descripcion: '',
    fecha: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('events.store'));
  };

  const handleReset = () => {
    setData({
      nombre: '',
      modalidad: '',
      descripcion: '',
      fecha: '',
    });
  };

  const formulario = (
    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
      
      {errors.name && (
        <div className="alert alert-danger" role="alert">
          {errors.name}
        </div>
      )}

      {errors.location && (
        <div className="alert alert-danger" role="alert">
          {errors.location}
        </div>
      )}

      {errors.date && (
        <div className="alert alert-danger" role="alert">
          {errors.date}
        </div>
      )}

      {errors.description && (
        <div className="alert alert-danger" role="alert">
          {errors.description}
        </div>
      )}

      {/* NAME */}
      <Form.Group className="mb-3">
        <Form.Label className="text-white fw-bold">
          Name of the competition
        </Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          placeholder="Ex: Marlboro smoker challenge"
          size="lg"
          required
          disabled={processing}
        />
      </Form.Group>

      {/* LOCATION */}
      <Form.Group className="mb-3">
        <Form.Label className="text-white fw-bold">
          Location
        </Form.Label>
        <Form.Control
          type="text"
          name="location"
          value={data.location}
          onChange={e => setData('location', e.target.value)}
          placeholder="Ex: Madrid, Spain"
          size="lg"
          required
          disabled={processing}
        />
      </Form.Group>

      {/* DATE */}
      <Form.Group className="mb-3">
        <Form.Label className="text-white fw-bold">
          Date
        </Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={data.date}
          onChange={e => setData('date', e.target.value)}
          size="lg"
          required
          disabled={processing}
        />
      </Form.Group>

      {/* DESCRIPTION */}
      <Form.Group className="mb-4">
        <Form.Label className="text-white fw-bold">
          Description (optional)
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={data.description}
          onChange={e => setData('description', e.target.value)}
          placeholder="Describe the competition..."
          disabled={processing}
        />
      </Form.Group>

      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="px-4 gap-3 fw-bold shadow-lg"
          disabled={processing}
        >
          {processing ? "Creating..." : "Create Competition"}
        </Button>
        <Button
          type="button"
          variant="outline-light"
          size="lg"
          className="px-4"
          onClick={handleReset}
          disabled={processing}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );

  return (
    <HeroSection
      title="New Competition"
      subtitle=" Complete the form to create a new competition"
      cosas={formulario}
    />
  );
}

export default Freestyle;