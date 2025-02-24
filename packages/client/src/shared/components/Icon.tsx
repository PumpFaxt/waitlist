import { DynamicIcon } from "lucide-react/dynamic";
import * as Icons from "lucide-react/icons";

export type IconType = keyof typeof Icons;

const Icon = DynamicIcon;

export default Icon;
