import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

/**
 * High-definition Scannable QR Code Component
 * Generates offline-capable QR Data URL with neo-brutalist border & crisp edges
 */
export default function QRCodeImage({ value, size = 160, className = '' }) {
  const [dataUrl, setDataUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) return;
    let isCurrent = true;

    // Generate real scannable QR code
    QRCode.toDataURL(value, {
      width: size * 2, // 2x resolution for retina & high DPI phones
      margin: 1,
      color: {
        dark: '#171715',
        light: '#FFFFFF',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (isCurrent) {
          setDataUrl(url);
          setError(null);
        }
      })
      .catch((err) => {
        if (isCurrent) {
          console.error('QR code generation failed:', err);
          setError(err);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [value, size]);

  if (error) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-ochre-50 border-2 border-dashed border-ochre-400 rounded-xl flex items-center justify-center p-2 text-center ${className}`}
      >
        <span className="font-mono text-[10px] text-ochre-800 font-bold">QR Error: {value}</span>
      </div>
    );
  }

  if (!dataUrl) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-white border-2 border-ink/20 animate-pulse rounded-xl flex items-center justify-center ${className}`}
      >
        <span className="font-mono text-[10px] text-graphite font-bold">Memuat QR...</span>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={`QR Code ${value}`}
      style={{ width: size, height: size }}
      className={`rounded-xl border-2 border-ink shadow-[3px_3px_0px_0px_#171715] bg-white p-1.5 transition-transform hover:scale-105 ${className}`}
    />
  );
}
