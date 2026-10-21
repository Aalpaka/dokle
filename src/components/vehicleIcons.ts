import type { Vehicle } from "@/skins/types";

// bijele ikone vozila na obojenoj značci (24×24)
export const vehicleIcons: Record<Vehicle | "miss", string> = {
  walk: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="13" cy="4" r="2.2"/><path d="M10.6 7.4c.5-.4 1.1-.6 1.8-.5 1 .1 1.7.7 2 1.6l.9 2.6 2.4 1.2a1 1 0 1 1-.9 1.8l-2.8-1.4a1 1 0 0 1-.5-.6l-.3-.9-.9 3.6 2.1 2.3c.2.2.3.4.3.7l.5 4.2a1.1 1.1 0 0 1-2.2.3l-.4-3.8-2.2-2.2-1 3.3a1 1 0 0 1-.3.5l-2.6 2.9a1.1 1.1 0 1 1-1.6-1.5l2.4-2.6 2-7.7-1.3.7-1 2.6a1 1 0 1 1-1.9-.7l1.2-3a1 1 0 0 1 .4-.5l2.9-1.8Z"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="16" r="3.6"/><circle cx="18.5" cy="16" r="3.6"/><path d="M5.5 16 9 9h7l2.5 7M9 9l3.2 7h-6.7M12.2 16 16 9M8 6.5h3M15 6h2.4l-1.4 3"/></svg>',
  train: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 2.5h10A3.5 3.5 0 0 1 20.5 6v9a3 3 0 0 1-2.4 2.9l1.6 2.3a.9.9 0 0 1-1.5 1L16.4 18H7.6l-1.8 3.2a.9.9 0 1 1-1.5-1l1.6-2.3A3 3 0 0 1 3.5 15V6A3.5 3.5 0 0 1 7 2.5Zm-1 4v4h12v-4H6Zm1.5 6.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm9 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>',
  bus: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5V18a1 1 0 0 1-1 1h-.5v1.6a1 1 0 1 1-2 0V19h-9v1.6a1 1 0 1 1-2 0V19H5a1 1 0 0 1-1-1V4.5ZM6 6v5.5h12V6H6Zm1.5 8a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6Zm9 0a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6ZM8 3.6v1h8v-1H8Z"/></svg>',
  car: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.4 5.6A2.4 2.4 0 0 1 8.6 4h6.8c1 0 1.9.6 2.2 1.6L19 9.5h.5A1.5 1.5 0 0 1 21 11v5a1 1 0 0 1-1 1h-1v1.5a1.5 1.5 0 0 1-3 0V17H8v1.5a1.5 1.5 0 0 1-3 0V17H4a1 1 0 0 1-1-1v-5a1.5 1.5 0 0 1 1.5-1.5H5l1.4-3.9ZM8.6 6l-1.1 3.5h9l-1.1-3.5H8.6ZM6.5 12a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm11 0a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z"/></svg>',
  plane: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 12c0-.8-.7-1.4-1.6-1.4h-5.1L10 3.3A.8.8 0 0 0 9.3 3H8l2.5 7.6H5.4L3.6 8.2a.6.6 0 0 0-.5-.2H2l1.2 4-1.2 4h1.1c.2 0 .4-.1.5-.2l1.8-2.4h5.1L8 21h1.3c.3 0 .5-.1.7-.3l4.8-7.3h5.1c.9 0 1.6-.6 1.6-1.4Z"/></svg>',
  heli: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4.2h18v1.6H12.8v2.1c3.6.3 6.2 2.6 6.2 5.6 0 1.6-.9 2.9-2.4 3.6l1 2.1h2.2v1.6H6.4v-1.6h3l.8-1.6H9.4C5.8 17.6 2 15.4 2 12.6v-1.4h2l1.4 1.5c.3-2.4 2.6-4.3 5.8-4.7V5.8H3V4.2Zm9.1 5.4v4.6h5.1c-.4-2.4-2.3-4.3-5.1-4.6Zm-.8 8h2.9l.8 1.6h-4.5l.8-1.6Z"/></svg>',
  miss: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.3 3.2c.3-.8 1.1-1.2 1.7-1.2s1.4.4 1.7 1.2L17.6 17H20a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2h2.4l3.9-13.8Zm.3 4.3-.7 2.5h4.2l-.7-2.5h-2.8Zm-1.3 4.5-.8 3h7l-.8-3H9.3Z"/></svg>',
};

export const crashSign =
  '<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M17 2 32.5 28h-31Z" fill="#fff" stroke="#c4261d" stroke-width="3.2" stroke-linejoin="round"/><path d="m17 9 1.6 4.2 4.3-1.6-2.2 4 4.1 1.9-4.5.9.9 4.4-3.6-2.8-2.9 3.5-.3-4.5-4.6.5 3.4-3-3.4-3 4.5.3Z" fill="#1d2628"/></svg>';

export const MISS_COLOR = "#e2572b";
