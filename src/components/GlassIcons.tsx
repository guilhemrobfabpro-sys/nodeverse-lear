import './GlassIcons.css';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

const gradientMapping: Record<string, string> = {
  blue: 'linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))',
  purple: 'linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))',
};

export interface GlassIconItem {
  icon: ReactNode;
  color: string;
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  customClass?: string;
}

interface GlassIconsProps {
  items: GlassIconItem[];
  className?: string;
}

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  const getBackgroundStyle = (color: string) => {
    return { background: gradientMapping[color] ?? color };
  };

  return (
    <div className={`icon-btns ${className ?? ''}`}>
      {items.map((item, index) => {
        const btnClass = `icon-btn${item.isActive ? ' icon-btn--active' : ''}${item.customClass ? ` ${item.customClass}` : ''}`;
        const inner = (
          <>
            <span className="icon-btn__back" style={getBackgroundStyle(item.color)} />
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </>
        );

        if (item.href) {
          return (
            <Link key={index} to={item.href} className={btnClass} aria-label={item.label}>
              {inner}
            </Link>
          );
        }

        return (
          <button key={index} type="button" className={btnClass} aria-label={item.label} onClick={item.onClick}>
            {inner}
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
