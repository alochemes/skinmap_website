import { useState, useCallback } from 'react';
import Map, { Marker, Popup, NavigationControl, type MapRef } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Provider } from '@/data/providers';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProviderMapProps {
  providers: Provider[];
  selectedId: string | null;
  onSelect: (provider: Provider) => void;
  mapRef?: React.RefObject<MapRef | null>;
}

// ─── Specialty colors ─────────────────────────────────────────────────────────

const specialtyColor: Record<Provider['specialty'], string> = {
  'Dermatology':    '#00CA5A', // primary green
  'Primary Care':   '#03C0DE', // sky blue
  'Family Medicine':'#0097A0', // teal
};

// ─── Marker ───────────────────────────────────────────────────────────────────

function ProviderMarker({
  provider,
  isSelected,
  onClick,
}: {
  provider: Provider;
  isSelected: boolean;
  onClick: () => void;
}) {
  const color = specialtyColor[provider.specialty];
  return (
    <Marker
      longitude={provider.lng}
      latitude={provider.lat}
      anchor="center"
      onClick={(e) => { e.originalEvent.stopPropagation(); onClick(); }}
    >
      <button
        aria-label={`${provider.name} — ${provider.practice}`}
        style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
      >
        {/* Outer pulse ring */}
        <span
          style={{
            position:     'absolute',
            inset:        '-6px',
            borderRadius: '50%',
            border:       `2px solid ${color}`,
            opacity:      isSelected ? 0.6 : 0,
            transition:   'opacity 0.2s',
            animation:    isSelected ? 'none' : undefined,
          }}
        />
        {/* Dot */}
        <span
          style={{
            display:      'block',
            width:        isSelected ? 18 : 12,
            height:       isSelected ? 18 : 12,
            borderRadius: '50%',
            background:   color,
            border:       `2px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.4)'}`,
            boxShadow:    isSelected
              ? `0 0 0 4px ${color}40, 0 2px 8px rgba(0,0,0,0.4)`
              : '0 1px 4px rgba(0,0,0,0.3)',
            transition:   'all 0.2s ease',
          }}
        />
      </button>
    </Marker>
  );
}

// ─── Popup card ───────────────────────────────────────────────────────────────

function ProviderPopup({
  provider,
  onClose,
}: {
  provider: Provider;
  onClose: () => void;
}) {
  const color = specialtyColor[provider.specialty];
  return (
    <Popup
      longitude={provider.lng}
      latitude={provider.lat}
      anchor="bottom"
      offset={16}
      onClose={onClose}
      closeButton={false}
      maxWidth="240px"
    >
      <div
        style={{
          background:   '#0D0B28',
          borderRadius: '12px',
          padding:      '14px 16px',
          minWidth:     '200px',
          fontFamily:   'Inter, system-ui, sans-serif',
          border:       '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Specialty badge */}
        <span
          style={{
            display:      'inline-block',
            fontSize:     '10px',
            fontWeight:   600,
            textTransform:'uppercase',
            letterSpacing:'0.08em',
            color,
            marginBottom: '6px',
          }}
        >
          {provider.specialty}
        </span>

        {/* Name */}
        <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', margin: '0 0 2px' }}>
          {provider.name}
        </p>

        {/* Practice */}
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '12px', margin: '0 0 10px', lineHeight: 1.4 }}>
          {provider.practice}
        </p>

        {/* Location */}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', margin: '0 0 12px' }}>
          {provider.city}, {provider.state}
        </p>

        {/* Status + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize:   '10px',
              fontWeight: 600,
              color:      provider.accepting ? '#34d399' : 'rgba(255,255,255,0.35)',
            }}
          >
            {provider.accepting ? '✓ Accepting patients' : 'Waitlist only'}
          </span>
          {provider.phone && (
            <a
              href={`tel:${provider.phone.replace(/\D/g, '')}`}
              style={{
                display:      'inline-block',
                fontSize:     '11px',
                fontWeight:   600,
                color:        '#fff',
                background:   '#00CA5A',
                borderRadius: '20px',
                padding:      '4px 10px',
                textDecoration: 'none',
                whiteSpace:   'nowrap',
              }}
            >
              Call
            </a>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position:   'absolute',
            top:        '8px',
            right:      '8px',
            background: 'rgba(255,255,255,0.1)',
            border:     'none',
            borderRadius:'50%',
            width:      '20px',
            height:     '20px',
            cursor:     'pointer',
            color:      'rgba(255,255,255,0.6)',
            fontSize:   '12px',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ×
        </button>
      </div>
    </Popup>
  );
}

// ─── Map ──────────────────────────────────────────────────────────────────────

export default function ProviderMap({ providers, selectedId, onSelect, mapRef }: ProviderMapProps) {
  const [popupProvider, setPopupProvider] = useState<Provider | null>(null);

  const handleMarkerClick = useCallback((provider: Provider) => {
    setPopupProvider(provider);
    onSelect(provider);
  }, [onSelect]);

  const handlePopupClose = useCallback(() => {
    setPopupProvider(null);
  }, []);

  return (
    <Map
      ref={mapRef as React.RefObject<MapRef>}
      initialViewState={{
        longitude: -96,
        latitude:  38,
        zoom:      3.5,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      reuseMaps
      scrollZoom={false}
      onClick={() => setPopupProvider(null)}
    >
      <NavigationControl position="top-right" showCompass={false} />

      {providers.map((p) => (
        <ProviderMarker
          key={p.id}
          provider={p}
          isSelected={p.id === selectedId}
          onClick={() => handleMarkerClick(p)}
        />
      ))}

      {popupProvider && (
        <ProviderPopup
          provider={popupProvider}
          onClose={handlePopupClose}
        />
      )}
    </Map>
  );
}
