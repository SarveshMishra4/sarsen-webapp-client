// src/app/visual-design/page.tsx

'use client';

import { useState } from 'react';

/* Import UI Components */
import {
  Button,
  Input,
  Badge,
  Card,
  Loader,
} from '@/ui';

export default function VisualDesignPage() {
  const [name, setName] = useState('');

  return (
    <div className="min-h-screen p-10 space-y-20 bg-surface">

      {/* PAGE TITLE */}
      <header>
        <h1 className="text-4xl font-bold mb-2">
          Design System Playground
        </h1>

        <p className="text-gray-600">
          All UI components and variants
        </p>
      </header>

      {/* BUTTON SECTION */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Buttons
        </h2>

        <div className="flex flex-wrap gap-4">

          <Button variant="primary">
            Primary
          </Button>

          <Button variant="secondary">
            Secondary
          </Button>

          <Button variant="danger">
            Danger
          </Button>

          <Button variant="outline">
            Outline
          </Button>

          <Button disabled>
            Disabled
          </Button>

          <Button size="sm">
            Small
          </Button>

          <Button size="lg">
            Large
          </Button>

        </div>
      </section>

      {/* INPUT SECTION */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Inputs
        </h2>

        <div className="space-y-4 max-w-md">

          {/* Default */}
          <Input
            value={name}
            onChangeValue={setName}
            placeholder="Default Input"
          />

          {/* Disabled */}
          <Input
            value="Disabled"
            onChangeValue={() => {}}
            disabled
          />

          {/* Error */}
          <Input
            value={name}
            onChangeValue={setName}
            placeholder="Error Input"
            error="Invalid input"
          />

        </div>
      </section>

      {/* BADGE SECTION */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Badges
        </h2>

        <div className="flex gap-4 flex-wrap">

          <Badge variant="primary">
            Primary
          </Badge>

          <Badge variant="secondary">
            Secondary
          </Badge>

          <Badge variant="success">
            Success
          </Badge>

          <Badge variant="warning">
            Warning
          </Badge>

          <Badge variant="danger">
            Danger
          </Badge>

        </div>
      </section>

      {/* CARD SECTION */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Cards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card
            title="Basic Card"
            description="Simple card layout"
          />

          <Card
            title="Highlighted Card"
            description="With accent border"
            variant="highlight"
          />

          <Card
            title="Disabled Card"
            description="Read only card"
            disabled
          />

        </div>
      </section>

      {/* LOADER SECTION */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Loaders
        </h2>

        <div className="flex gap-8 items-center">

          <Loader size="sm" />

          <Loader size="md" />

          <Loader size="lg" />

        </div>
      </section>

      {/* TOAST PREVIEW */}
      <section className="space-y-6">

        <h2 className="text-2xl font-semibold">
          Toast Preview
        </h2>

        <div className="flex gap-4">

          <Button
            variant="primary"
            onClick={() => alert('Success Toast')}
          >
            Success Toast
          </Button>

          <Button
            variant="danger"
            onClick={() => alert('Error Toast')}
          >
            Error Toast
          </Button>

        </div>

      </section>

    </div>
  );
}