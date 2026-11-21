import type { CSSProperties, ReactNode } from 'react'
export interface FolderProps {
 items?: Array<string | { title?: string; description?: string; image?: string; alt?: string; content?: ReactNode }>; label?: string; mode?: 'flap' | 'book'; variant?: 'solid' | 'glass' | 'matte'; color?: string; paperColor?: string; tabPosition?: 'left' | 'center' | 'right'; layout?: 'spread' | 'stack' | 'row'; size?: number; openOn?: 'click' | 'hover'; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; onItemClick?: (item: unknown, index: number) => void; draggable?: boolean; zoomOnClick?: boolean; peek?: boolean; intro?: boolean; tilt?: number; bounce?: number; speed?: number; frost?: number; closeOnOutsideClick?: boolean; theme?: 'dark' | 'light'; className?: string; style?: CSSProperties; children?: ReactNode; frontContent?: ReactNode;
}
export default function Folder(props: FolderProps): ReactNode
