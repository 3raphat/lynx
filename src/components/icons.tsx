import { type HTMLAttributes } from 'react'

import {
  Calendar,
  Check,
  Copy,
  Laptop,
  Link,
  Loader2,
  Moon,
  MousePointerClick,
  Plus,
  Settings,
  Sun,
  Table2,
} from 'lucide-react'
import { FaGithub, FaStar } from 'react-icons/fa6'

export type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  link: Link,
  github: FaGithub,
  star: FaStar,
  dashboard: Table2,
  loader: Loader2,
  sun: Sun,
  moon: Moon,
  system: Laptop,
  plus: Plus,
  settings: Settings,
  copy: Copy,
  copied: Check,
  click: MousePointerClick,
  calendar: Calendar,
}
