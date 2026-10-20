/**
 * Reusable Neo-Brutalist Modal Component
 * Features subtle backdrop blur, Esc key listener, and click-outside dismissal
 */
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-md',
  showCloseButton = true,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/35 backdrop-blur-[2px] animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-paper border-2 border-ink rounded-3xl shadow-[10px_10px_0px_0px_#171715] w-full ${maxWidth} p-6 sm:p-8 animate-in zoom-in-95 duration-150 relative`}
      >
        {showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg border border-ink/20 text-graphite hover:text-ink hover:bg-ivory cursor-pointer transition-all"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {(title || subtitle) && (
          <div className="mb-5">
            {subtitle && (
              <span className="font-mono text-xs uppercase font-bold text-moss-800 block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="font-display text-2xl font-normal text-ink">
                {title}
              </h3>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
