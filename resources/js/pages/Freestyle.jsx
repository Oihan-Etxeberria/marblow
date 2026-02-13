import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from '@inertiajs/react';
import HeroSection from '@/components/Hero';

function Freestyle() {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    modalidad: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('events.store'));
  };

  const handleReset = () => {
    setData({
      nombre: '',
      modalidad: '',
    });
  };

  const formulario = (
    <Form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "600px" }}>
      {errors.nombre && (
        <div className="alert alert-danger" role="alert">
          {errors.nombre}
        </div>
      )}
      {errors.modalidad && (
        <div className="alert alert-danger" role="alert">
          {errors.modalidad}
        </div>
      )}
      
      <Form.Group className="mb-3">
        <Form.Label className="text-white fw-bold">Name of the competition</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={data.nombre}
          onChange={e => setData('nombre', e.target.value)}
          placeholder="Ex: Marbloro smoker challenge"
          size="lg"
          required
          disabled={processing}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label className="text-white fw-bold">Modality</Form.Label>
        <Form.Control
          type="text"
          name="modalidad"
          value={data.modalidad}
          onChange={e => setData('modalidad', e.target.value)}
          placeholder="Ex: Solo, Duo, Squad, Minors..."
          size="lg"
          required
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