'use client';

import { useState, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface AvatarProps {
  size?: number;
}

type AvatarId = 'male1' | 'female1' | 'neutral';

interface AvatarEntry {
  id: AvatarId;
  label: string;
  component: (size: number) => React.ReactElement;
}

interface CoreField {
  id: string;
  label: string;
  type: 'text';
  placeholder: string;
  removable: boolean;
  value: string;
}

interface SliderItem {
  id: string;
  left: string;
  right: string;
  value: number;
}

type SectionType = 'list' | 'textarea' | 'sliders';

interface BaseSection {
  id: string;
  label: string;
  icon: string;
  color: string;
  removable: boolean;
}

interface ListSection extends BaseSection {
  type: 'list';
  placeholder: string;
  items: string[];
}

interface TextareaSection extends BaseSection {
  type: 'textarea';
  placeholder: string;
  value: string;
}

interface SlidersSection extends BaseSection {
  type: 'sliders';
  sliders: SliderItem[];
}

type Section = ListSection | TextareaSection | SlidersSection;

interface AddableSectionType {
  type: SectionType;
  label: string;
  icon: string;
}

type Phase = 'intro' | 'build' | 'preview';

// ─────────────────────────────────────────────────────────────
// AVATAR SVG COMPONENTS
// ─────────────────────────────────────────────────────────────

function AvatarMale({ size = 96 }: AvatarProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="48" fill="#E8EEF5" />
      <ellipse cx="48" cy="70" rx="22" ry="14" fill="#B8CCE4" />
      <circle cx="48" cy="36" r="16" fill="#F5C6A0" />
      <ellipse cx="48" cy="33" rx="16" ry="10" fill="#1A3B6B" />
      <circle cx="42" cy="38" r="2" fill="#3D2B1F" />
      <circle cx="54" cy="38" r="2" fill="#3D2B1F" />
      <path d="M44 44 Q48 47 52 44" stroke="#C47B52" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="32" y="60" width="32" height="20" rx="4" fill="#1A3B6B" />
    </svg>
  );
}

function AvatarFemale({ size = 96 }: AvatarProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="48" fill="#F0EAF5" />
      <ellipse cx="48" cy="70" rx="22" ry="14" fill="#D4B8E4" />
      <circle cx="48" cy="36" r="16" fill="#F5C6A0" />
      <path d="M32 30 Q34 18 48 16 Q62 18 64 30 Q62 26 56 25 Q48 22 40 25 Q34 26 32 30Z" fill="#4A2C6B" />
      <path d="M32 30 Q30 38 32 44 Q30 38 28 34" fill="#4A2C6B" />
      <path d="M64 30 Q66 38 64 44 Q66 38 68 34" fill="#4A2C6B" />
      <circle cx="42" cy="38" r="2" fill="#3D2B1F" />
      <circle cx="54" cy="38" r="2" fill="#3D2B1F" />
      <path d="M44 44 Q48 47 52 44" stroke="#C47B52" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="32" y="60" width="32" height="20" rx="4" fill="#6B3F9E" />
    </svg>
  );
}

function AvatarNeutral({ size = 96 }: AvatarProps): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="48" cy="48" r="48" fill="#EEF0F0" />
      <ellipse cx="48" cy="70" rx="22" ry="14" fill="#B8C8C8" />
      <circle cx="48" cy="36" r="16" fill="#F5C6A0" />
      <ellipse cx="48" cy="28" rx="14" ry="8" fill="#3A4A4A" />
      <circle cx="42" cy="38" r="2" fill="#3D2B1F" />
      <circle cx="54" cy="38" r="2" fill="#3D2B1F" />
      <path d="M44 44 Q48 47 52 44" stroke="#C47B52" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <rect x="32" y="60" width="32" height="20" rx="4" fill="#3A4A4A" />
    </svg>
  );
}

const AVATARS: AvatarEntry[] = [
  { id: 'male1',   label: 'Male',       component: (s) => <AvatarMale size={s} /> },
  { id: 'female1', label: 'Female',     component: (s) => <AvatarFemale size={s} /> },
  { id: 'neutral', label: 'Non-binary', component: (s) => <AvatarNeutral size={s} /> },
];

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const INITIAL_CORE_FIELDS: Omit<CoreField, 'value'>[] = [
  { id: 'name',       label: 'Name',       type: 'text', placeholder: 'e.g. Priya Nair',           removable: false },
  { id: 'age',        label: 'Age range',  type: 'text', placeholder: 'e.g. 28–35',                removable: false },
  { id: 'occupation', label: 'Occupation', type: 'text', placeholder: 'e.g. Founder / Head of CX', removable: false },
  { id: 'industry',   label: 'Industry',   type: 'text', placeholder: 'e.g. B2B SaaS',             removable: false },
  { id: 'education',  label: 'Education',  type: 'text', placeholder: 'e.g. MBA, IIM',             removable: true  },
  { id: 'location',   label: 'Location',   type: 'text', placeholder: 'e.g. Bangalore, India',     removable: true  },
];

const INITIAL_SECTIONS: Section[] = [
  {
    id: 'goals',
    label: 'Goals',
    icon: 'ti-target',
    color: '#0A1E3D',
    type: 'list',
    placeholder: 'What is this person trying to achieve?',
    items: [''],
    removable: false,
  },
  {
    id: 'motivations',
    label: 'Motivations',
    icon: 'ti-bolt',
    color: '#1557A0',
    type: 'list',
    placeholder: 'What drives their decisions?',
    items: [''],
    removable: false,
  },
  {
    id: 'pain_points',
    label: 'Pain points',
    icon: 'ti-alert-triangle',
    color: '#B45309',
    type: 'list',
    placeholder: 'What frustrates them most?',
    items: [''],
    removable: false,
  },
  {
    id: 'existing_products',
    label: 'Products they already use',
    icon: 'ti-apps',
    color: '#065F46',
    type: 'list',
    placeholder: 'e.g. Slack, Notion, Figma',
    items: [''],
    removable: true,
  },
  {
    id: 'behaviour',
    label: 'Behaviour traits',
    icon: 'ti-activity',
    color: '#5B21B6',
    type: 'sliders',
    sliders: [
      { id: 'sl1', left: 'Impulsive',    right: 'Deliberate',      value: 7 },
      { id: 'sl2', left: 'Budget-first', right: 'Quality-first',   value: 6 },
      { id: 'sl3', left: 'Risk-averse',  right: 'Risk-tolerant',   value: 5 },
      { id: 'sl4', left: 'Solo decision',right: 'Group decision',  value: 4 },
    ],
    removable: true,
  },
  {
    id: 'preferences',
    label: 'Preferences',
    icon: 'ti-heart',
    color: '#9D174D',
    type: 'list',
    placeholder: 'Channels, formats, contexts they prefer',
    items: [''],
    removable: true,
  },
  {
    id: 'quote',
    label: 'In their own words',
    icon: 'ti-quote',
    color: '#374151',
    type: 'textarea',
    value: '',
    placeholder: '"A representative quote that captures their mindset..."',
    removable: true,
  },
];

const ADDABLE_SECTION_TYPES: AddableSectionType[] = [
  { type: 'list',     label: 'Bullet list',   icon: 'ti-list'       },
  { type: 'textarea', label: 'Free text',     icon: 'ti-notes'      },
  { type: 'sliders',  label: 'Slider scales', icon: 'ti-adjustments'},
];

const SECTION_COLORS = [
  '#0A1E3D', '#1557A0', '#065F46',
  '#B45309', '#5B21B6', '#9D174D',
  '#374151', '#0F766E',
] as const;

const CONTEXT_TAGS = [
  'B2B SaaS', 'E-commerce', 'Marketplace', 'Consumer App',
  'Healthcare', 'EdTech', 'FinTech', 'Food & Beverage', 'Enterprise', 'Other',
] as const;

// ─────────────────────────────────────────────────────────────
// ID GENERATOR
// ─────────────────────────────────────────────────────────────

let _nextIdCounter = 100;
function makeId(): string {
  return `custom_${_nextIdCounter++}`;
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function makeInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  const parts = trimmed.split(' ');
  if (parts.length >= 2) {
    return ((parts[0][0] ?? '') + (parts[parts.length - 1][0] ?? '')).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}

function makeFreshCoreFields(): CoreField[] {
  return INITIAL_CORE_FIELDS.map((f) => ({ ...f, value: '' }));
}

function makeFreshSections(): Section[] {
  return INITIAL_SECTIONS.map((s) => ({ ...s }));
}

// ─────────────────────────────────────────────────────────────
// TAG INPUT (list section body)
// ─────────────────────────────────────────────────────────────

interface TagInputProps {
  items: string[];
  placeholder: string;
  accent: string;
  onChange: (items: string[]) => void;
}

function TagInput({ items, placeholder, accent, onChange }: TagInputProps): React.ReactElement {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-px"
            style={{ backgroundColor: accent }}
          />
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className="flex-1 bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-gray-400 py-0.5"
          />
          {items.length > 1 && (
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-gray-300 hover:text-gray-500 text-sm leading-none px-0.5"
              aria-label="Remove item"
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        className="mt-1 text-[11px] px-2.5 py-0.5 rounded border border-dashed cursor-pointer"
        style={{ borderColor: accent, color: accent, background: 'none' }}
      >
        + Add item
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SLIDER BLOCK (sliders section body)
// ─────────────────────────────────────────────────────────────

interface SliderBlockProps {
  sliders: SliderItem[];
  onChange: (sliders: SliderItem[]) => void;
}

function SliderBlock({ sliders, onChange }: SliderBlockProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-3.5">
      {sliders.map((sl, i) => (
        <div key={sl.id}>
          <div className="flex justify-between mb-1">
            <span className="text-[11px] text-gray-500">{sl.left}</span>
            <span className="text-[11px] text-gray-500">{sl.right}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={sl.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const next = [...sliders];
                next[i] = { ...sl, value: Number(e.target.value) };
                onChange(next);
              }}
              className="flex-1 accent-[#0A1E3D]"
            />
            <span className="text-[11px] font-medium text-gray-500 min-w-[14px] text-right">
              {sl.value}
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <input
              type="text"
              value={sl.left}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const next = [...sliders];
                next[i] = { ...sl, left: e.target.value };
                onChange(next);
              }}
              placeholder="Left label"
              className="flex-1 text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-transparent text-gray-700 outline-none"
            />
            <span className="text-[10px] text-gray-400">↔</span>
            <input
              type="text"
              value={sl.right}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const next = [...sliders];
                next[i] = { ...sl, right: e.target.value };
                onChange(next);
              }}
              placeholder="Right label"
              className="flex-1 text-[11px] border border-gray-200 rounded px-1.5 py-0.5 bg-transparent text-gray-700 outline-none"
            />
            <button
              type="button"
              onClick={() => onChange(sliders.filter((_, j) => j !== i))}
              className="text-gray-300 hover:text-gray-500 text-sm"
              aria-label="Remove slider"
            >
              ×
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          onChange([...sliders, { id: makeId(), left: 'Label A', right: 'Label B', value: 5 }])
        }
        className="text-[11px] px-2.5 py-0.5 rounded border border-dashed border-gray-300 text-gray-400 hover:text-gray-600 hover:border-gray-400 cursor-pointer bg-transparent"
      >
        + Add scale
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION CARD
// ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  section: Section;
  onUpdate: (updated: Section) => void;
  onRemove: () => void;
}

function SectionCard({ section, onUpdate, onRemove }: SectionCardProps): React.ReactElement {
  const [labelEditing, setLabelEditing] = useState(false);
  const labelRef = useRef<HTMLInputElement>(null);

  function handleLabelChange(e: React.ChangeEvent<HTMLInputElement>): void {
    onUpdate({ ...section, label: e.target.value });
  }

  function handleLabelBlur(): void {
    setLabelEditing(false);
  }

  function handleLabelKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') setLabelEditing(false);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <i className={`ti ${section.icon} text-[15px]`} style={{ color: section.color }} aria-hidden="true" />
        {labelEditing ? (
          <input
            ref={labelRef}
            type="text"
            value={section.label}
            onChange={handleLabelChange}
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
            autoFocus
            className="font-medium text-[13px] text-gray-800 flex-1 bg-transparent outline-none py-px px-0.5"
            style={{ borderBottom: `1.5px solid ${section.color}` }}
          />
        ) : (
          <span
            className="font-medium text-[13px] text-gray-800 flex-1 cursor-text"
            title="Click to rename"
            onClick={() => setLabelEditing(true)}
          >
            {section.label}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setLabelEditing(true);
            setTimeout(() => labelRef.current?.focus(), 0);
          }}
          className="text-gray-300 hover:text-gray-500 text-[13px] px-0.5"
          aria-label="Rename section"
        >
          <i className="ti ti-pencil" aria-hidden="true" />
        </button>
        {section.removable && (
          <button
            type="button"
            onClick={onRemove}
            className="text-gray-300 hover:text-red-400 text-[13px] px-0.5 transition-colors"
            aria-label="Remove section"
          >
            <i className="ti ti-trash" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Body — discriminated union narrows types cleanly */}
      {section.type === 'list' && (
        <TagInput
          items={section.items}
          placeholder={section.placeholder}
          accent={section.color}
          onChange={(items) => onUpdate({ ...section, items })}
        />
      )}
      {section.type === 'textarea' && (
        <textarea
          value={section.value}
          placeholder={section.placeholder}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            onUpdate({ ...section, value: e.target.value })
          }
          rows={3}
          className="w-full bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-gray-400 resize-y font-[inherit]"
          style={{ fontStyle: section.value ? 'italic' : 'normal' }}
        />
      )}
      {section.type === 'sliders' && (
        <SliderBlock
          sliders={section.sliders}
          onChange={(sliders) => onUpdate({ ...section, sliders })}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD SECTION PANEL
// ─────────────────────────────────────────────────────────────

interface AddSectionPanelProps {
  onAdd: (section: Section) => void;
  onClose: () => void;
}

function AddSectionPanel({ onAdd, onClose }: AddSectionPanelProps): React.ReactElement {
  const [selectedType, setSelectedType] = useState<SectionType>('list');
  const [label, setLabel] = useState('');

  function handleAdd(): void {
    const trimmed = label.trim();
    if (!trimmed) return;

    const color = SECTION_COLORS[Math.floor(Math.random() * SECTION_COLORS.length)];
    const iconMap: Record<SectionType, string> = {
      list:     'ti-list',
      textarea: 'ti-notes',
      sliders:  'ti-adjustments',
    };
    const base: BaseSection = {
      id: makeId(),
      label: trimmed,
      icon: iconMap[selectedType],
      color,
      removable: true,
    };

    if (selectedType === 'list') {
      onAdd({ ...base, type: 'list', items: [''], placeholder: 'Add items...' });
    } else if (selectedType === 'textarea') {
      onAdd({ ...base, type: 'textarea', value: '', placeholder: 'Write here...' });
    } else {
      onAdd({
        ...base,
        type: 'sliders',
        sliders: [{ id: makeId(), left: 'Label A', right: 'Label B', value: 5 }],
      });
    }

    setLabel('');
    onClose();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') onClose();
  }

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-4 col-span-2">
      <p className="text-[13px] font-medium text-gray-800 mb-3">Add a section</p>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {ADDABLE_SECTION_TYPES.map((t) => (
          <button
            key={t.type}
            type="button"
            onClick={() => setSelectedType(t.type)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[12px] font-medium cursor-pointer transition-colors ${
              selectedType === t.type
                ? 'bg-[#0A1E3D] text-white border-[1.5px] border-[#0A1E3D]'
                : 'bg-transparent text-gray-500 border border-gray-300 hover:border-gray-400'
            }`}
          >
            <i className={`ti ${t.icon} text-[12px]`} aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLabel(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Section name, e.g. 'Buying triggers'"
          autoFocus
          className="flex-1 text-[13px] border border-gray-300 rounded-lg px-3 py-1.5 bg-transparent text-gray-800 outline-none focus:border-[#0A1E3D]"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!label.trim()}
          className="px-4 py-1.5 text-[12px] font-medium rounded-lg border-none cursor-pointer disabled:cursor-not-allowed transition-colors bg-[#0A1E3D] text-white disabled:bg-gray-200 disabled:text-gray-400"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 text-[12px] bg-transparent border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PERSONA PREVIEW CARD (read-only snapshot)
// ─────────────────────────────────────────────────────────────

interface PersonaPreviewProps {
  coreFields: CoreField[];
  sections: Section[];
  avatarId: AvatarId;
  personaName: string;
}

function PersonaPreviewCard({ coreFields, sections, avatarId, personaName }: PersonaPreviewProps): React.ReactElement {
  const avatarEntry = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
  const nameField = coreFields.find((f) => f.id === 'name');
  const occupationField = coreFields.find((f) => f.id === 'occupation');
  const profileFields = coreFields.filter(
    (f) => f.id !== 'name' && f.id !== 'occupation' && f.value,
  );

  return (
    <div className="bg-[#0A1E3D] rounded-2xl p-6 text-white grid gap-5" style={{ gridTemplateColumns: '160px 1fr' }}>
      {/* Left: avatar + profile */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#1D3A6B] flex items-center justify-center flex-shrink-0">
          {avatarEntry.component(80)}
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-white m-0">
            {nameField?.value || 'Unnamed'}
          </p>
          <p className="text-[11px] text-[#8FA9CC] mt-0.5 m-0">
            {occupationField?.value ?? ''}
          </p>
        </div>
        {personaName && (
          <div className="bg-[#132B47] rounded-lg px-3 py-1.5 w-full text-center">
            <p className="text-[10px] text-[#5A7EA8] uppercase tracking-wide m-0">Persona</p>
            <p className="text-[12px] text-[#CBD5E1] font-medium mt-0.5 m-0">{personaName}</p>
          </div>
        )}
        {profileFields.length > 0 && (
          <div className="bg-[#132B47] rounded-lg p-3 w-full">
            {profileFields.map((f) => (
              <div key={f.id} className="mb-1.5 last:mb-0">
                <span className="text-[10px] text-[#5A7EA8] uppercase tracking-wide">{f.label}</span>
                <p className="text-[12px] text-[#CBD5E1] mt-0.5 m-0">{f.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: section grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {sections.slice(0, 6).map((sec) => (
          <div key={sec.id} className="bg-[#132B47] rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#8FA9CC] uppercase tracking-wide mb-1.5 m-0">
              {sec.label}
            </p>
            {sec.type === 'list' &&
              sec.items.filter(Boolean).map((item, i) => (
                <p key={i} className="text-[11px] text-[#CBD5E1] mb-0.5 m-0 flex gap-1.5">
                  <span style={{ color: sec.color }} className="flex-shrink-0">·</span>
                  {item}
                </p>
              ))}
            {sec.type === 'textarea' && sec.value && (
              <p className="text-[11px] text-[#CBD5E1] italic m-0">{sec.value}</p>
            )}
            {sec.type === 'sliders' &&
              sec.sliders.map((sl) => (
                <div key={sl.id} className="mb-1.5">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-[9px] text-[#5A7EA8]">{sl.left}</span>
                    <span className="text-[9px] text-[#5A7EA8]">{sl.right}</span>
                  </div>
                  <div className="h-0.5 bg-[#1D3A6B] rounded">
                    <div
                      className="h-0.5 rounded"
                      style={{ width: `${(sl.value / 10) * 100}%`, backgroundColor: sec.color }}
                    />
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CustomerPersonaBuilder(): React.ReactElement {
  const [phase, setPhase] = useState<Phase>('intro');
  const [companyName, setCompanyName] = useState('');
  const [personaName, setPersonaName] = useState('');
  const [contextTag, setContextTag] = useState<string>(CONTEXT_TAGS[0]);
  const [avatarId, setAvatarId] = useState<AvatarId>('male1');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [coreFields, setCoreFields] = useState<CoreField[]>(makeFreshCoreFields);
  const [sections, setSections] = useState<Section[]>(makeFreshSections);

  const avatarEntry = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];

  // ── Field handlers ──────────────────────────────────────────

  const updateFieldValue = useCallback((id: string, value: string): void => {
    setCoreFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f)),
    );
  }, []);

  const removeField = useCallback((id: string): void => {
    setCoreFields((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const addCustomField = useCallback((): void => {
    const label = window.prompt('Field name:');
    if (!label?.trim()) return;
    setCoreFields((prev) => [
      ...prev,
      { id: makeId(), label: label.trim(), type: 'text', placeholder: '', value: '', removable: true },
    ]);
  }, []);

  // ── Section handlers ────────────────────────────────────────

  const updateSection = useCallback((id: string, updated: Section): void => {
    setSections((prev) => prev.map((s) => (s.id === id ? updated : s)));
  }, []);

  const removeSection = useCallback((id: string): void => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addSection = useCallback((sec: Section): void => {
    setSections((prev) => [...prev, sec]);
  }, []);

  // ── Reset ───────────────────────────────────────────────────

  function handleReset(): void {
    setPhase('intro');
    setCompanyName('');
    setPersonaName('');
    setContextTag(CONTEXT_TAGS[0]);
    setAvatarId('male1');
    setShowAvatarPicker(false);
    setShowAddSection(false);
    setCoreFields(makeFreshCoreFields());
    setSections(makeFreshSections());
  }

  // ── INTRO ───────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-4">
              Customer Intelligence · Sarsen
            </p>
            <h1 className="text-4xl lg:text-5xl text-white font-normal leading-tight mb-4 max-w-xl">
              Customer Persona Builder
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-lg">
              Build a flexible customer persona that adapts to your business context. Start with a
              universal framework, then reshape it — add, remove, and rename every section.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
            {/* What you can build */}
            <div>
              <h2 className="text-2xl font-normal text-gray-800 mb-6">What you can build</h2>
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: 'ti-adjustments',
                    title: 'Fully editable sections',
                    desc: 'Every section can be renamed. Add bullet lists, free text, or behavioural slider scales to match your research.',
                  },
                  {
                    icon: 'ti-plus',
                    title: 'Add your own fields',
                    desc: "Not seeing a dimension that matters? Add 'Buying triggers', 'Jobs to be done', or any custom section in seconds.",
                  },
                  {
                    icon: 'ti-eye',
                    title: 'Preview as a shareable card',
                    desc: 'See the finished persona as a clean professional card — ready to share with your team or include in a strategy deck.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white border border-gray-200 rounded-xl p-5 flex gap-3"
                  >
                    <i className={`ti ${item.icon} text-[18px] text-[#0A1E3D] flex-shrink-0 mt-0.5`} aria-hidden="true" />
                    <div>
                      <h3 className="text-sm font-medium text-[#0A1E3D] mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed m-0">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start form */}
            <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
              <h3 className="text-xl font-medium text-gray-800 mb-6">Create a persona</h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-medium text-[#0A1E3D] mb-1.5">
                    Company name{' '}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nex"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#0A1E3D] placeholder:text-gray-400 outline-none focus:border-[#0A1E3D] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#0A1E3D] mb-1.5">
                    Persona name{' '}
                    <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={personaName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonaName(e.target.value)}
                    placeholder={'"The Overwhelmed Founder"'}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-[#0A1E3D] placeholder:text-gray-400 outline-none focus:border-[#0A1E3D] transition-colors"
                  />
                </div>
              </div>

              <div className="border-t border-gray-100 pt-5 pb-5 space-y-2.5">
                {(
                  [
                    ['9 default sections', 'fully editable and removable'],
                    ['Custom sections', 'add as many as you need'],
                    ['3 avatar styles', 'male, female, non-binary'],
                  ] as const
                ).map(([label, desc]) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[#0A1E3D] min-w-[130px]">{label}</span>
                    <span className="text-xs text-gray-400">{desc}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPhase('build')}
                className="w-full bg-[#0A1E3D] hover:bg-[#132B47] text-white border-none rounded-lg py-3 px-5 text-sm font-medium cursor-pointer flex items-center justify-center gap-2 group transition-colors"
              >
                <span>Start building</span>
                <i className="ti ti-arrow-right text-sm group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                No account required. All data stays in your browser.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ── PREVIEW ─────────────────────────────────────────────────
  if (phase === 'preview') {
    return (
      <main className="min-h-screen bg-[#F0F4F8]">
        <section className="bg-[#0A1E3D] pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-blue-400 text-xs font-medium tracking-widest uppercase mb-3">
              {companyName ? `${companyName} · ` : ''}Persona Preview
            </p>
            <h1 className="text-3xl font-normal text-white mb-2">
              {personaName || coreFields.find((f) => f.id === 'name')?.value || 'Untitled persona'}
            </h1>
            <button
              type="button"
              onClick={() => setPhase('build')}
              className="text-blue-400 hover:text-blue-300 underline text-xs bg-transparent border-none cursor-pointer p-0"
            >
              ← Back to editor
            </button>
          </div>
        </section>

        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <PersonaPreviewCard
              coreFields={coreFields}
              sections={sections}
              avatarId={avatarId}
              personaName={personaName}
            />
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setPhase('build')}
                className="flex-1 border border-gray-300 rounded-lg py-3 px-5 text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 cursor-pointer bg-transparent transition-colors"
              >
                Edit persona
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-[#0A1E3D] hover:bg-[#132B47] text-white border-none rounded-lg py-3 px-5 text-sm font-medium cursor-pointer transition-colors"
              >
                Create a new persona
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ── BUILD ────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#F0F4F8]">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">{companyName || 'Sarsen'}</span>
            <span className="text-gray-200">·</span>
            <span className="font-medium text-[#0A1E3D]">
              {personaName || 'Untitled persona'}
            </span>
            {contextTag && (
              <>
                <span className="text-gray-200">·</span>
                <span className="text-gray-400">{contextTag}</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs border border-gray-200 rounded-md px-3 py-1.5 text-gray-500 hover:text-gray-700 hover:border-gray-300 bg-transparent cursor-pointer transition-colors"
            >
              ← Start over
            </button>
            <button
              type="button"
              onClick={() => setPhase('preview')}
              className="text-xs bg-[#0A1E3D] hover:bg-[#132B47] text-white border-none rounded-md px-3 py-1.5 cursor-pointer transition-colors"
            >
              Preview →
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Persona name + context strip */}
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-6 flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[160px]">
            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
              Persona name
            </label>
            <input
              type="text"
              value={personaName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonaName(e.target.value)}
              placeholder="e.g. The Overwhelmed Founder"
              className="w-full border-b border-gray-200 focus:border-[#0A1E3D] outline-none text-sm font-medium text-[#0A1E3D] bg-transparent py-1 placeholder:text-gray-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-medium text-gray-500 uppercase tracking-wider mb-1">
              Industry context
            </label>
            <select
              value={contextTag}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setContextTag(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-[#0A1E3D] bg-white outline-none cursor-pointer"
            >
              {CONTEXT_TAGS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-5" style={{ gridTemplateColumns: '220px 1fr' }}>
          {/* LEFT — Avatar + profile fields */}
          <div className="flex flex-col gap-4">
            {/* Avatar picker */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAvatarPicker((v) => !v)}
                className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#0A1E3D] cursor-pointer transition-colors bg-transparent p-0"
                aria-label="Change avatar"
                title="Change avatar"
              >
                {avatarEntry.component(80)}
              </button>
              <span
                className="text-[11px] text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setShowAvatarPicker((v) => !v)}
              >
                Change avatar
              </span>
              {showAvatarPicker && (
                <div className="flex gap-2.5 justify-center flex-wrap">
                  {AVATARS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => { setAvatarId(a.id); setShowAvatarPicker(false); }}
                      className="w-12 h-12 rounded-full overflow-hidden cursor-pointer p-0 bg-transparent transition-all"
                      style={{
                        border: avatarId === a.id ? '2px solid #0A1E3D' : '2px solid transparent',
                      }}
                      aria-label={`Select ${a.label} avatar`}
                      title={a.label}
                    >
                      {a.component(48)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Core profile fields */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                Profile
              </p>
              <div className="flex flex-col gap-3">
                {coreFields.map((field) => (
                  <div key={field.id}>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                        {field.label}
                      </label>
                      {field.removable && (
                        <button
                          type="button"
                          onClick={() => removeField(field.id)}
                          className="text-gray-200 hover:text-red-400 text-xs bg-transparent border-none cursor-pointer p-0 transition-colors"
                          aria-label={`Remove ${field.label} field`}
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      value={field.value}
                      placeholder={field.placeholder}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFieldValue(field.id, e.target.value)
                      }
                      className="w-full bg-transparent border-b border-gray-200 focus:border-[#0A1E3D] outline-none text-[13px] text-[#0A1E3D] placeholder:text-gray-400 py-0.5 pb-1 transition-colors"
                    />
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addCustomField}
                className="mt-3.5 w-full bg-transparent border border-dashed border-gray-300 hover:border-gray-400 rounded-lg py-1.5 text-[11px] text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              >
                + Add field
              </button>
            </div>
          </div>

          {/* RIGHT — Dynamic sections */}
          <div>
            <div className="grid grid-cols-2 gap-3.5">
              {sections.map((sec) => (
                <SectionCard
                  key={sec.id}
                  section={sec}
                  onUpdate={(updated) => updateSection(sec.id, updated)}
                  onRemove={() => removeSection(sec.id)}
                />
              ))}

              {showAddSection ? (
                <AddSectionPanel
                  onAdd={addSection}
                  onClose={() => setShowAddSection(false)}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddSection(true)}
                  className="bg-transparent border border-dashed border-gray-300 hover:border-gray-400 rounded-xl p-6 text-[13px] text-gray-400 hover:text-gray-600 cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[100px] transition-colors"
                >
                  <i className="ti ti-plus text-[22px]" aria-hidden="true" />
                  Add a section
                </button>
              )}
            </div>

            {/* Preview CTA */}
            <div className="mt-6 bg-[#0A1E3D] rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-medium text-white m-0">Ready to view the finished persona?</p>
                <p className="text-xs text-slate-500 mt-1 m-0">
                  See a clean, shareable card view of everything you have built.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPhase('preview')}
                className="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg py-2.5 px-5 text-sm font-medium cursor-pointer flex items-center gap-2 flex-shrink-0 transition-colors"
              >
                Preview persona
                <i className="ti ti-eye text-sm" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}