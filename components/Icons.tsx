type P = { size?: number };
const base = (size: number) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true,
});
export const IconPhone = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>);
export const IconPin = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const IconChat = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.3z" /></svg>);
export const IconDiya = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M12 3c2 3 3 5 0 8-3-3-2-5 0-8z" /><path d="M3 14h18c-1 4-4.5 6-9 6s-8-2-9-6z" /></svg>);
export const IconMenu = ({ size = 24 }: P) => (<svg {...base(size)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const IconClose = ({ size = 24 }: P) => (<svg {...base(size)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconCheck = ({ size = 28 }: P) => (<svg {...base(size)} strokeWidth={2.4}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const IconClock = ({ size = 20 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const IconShare = ({ size = 20 }: P) => (<svg {...base(size)}><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" /></svg>);
export const IconCalendar = ({ size = 20 }: P) => (<svg {...base(size)}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);
export const IconCopy = ({ size = 20 }: P) => (<svg {...base(size)}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>);
export const IconHome = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H4a1 1 0 0 1-1-1z" /></svg>);
