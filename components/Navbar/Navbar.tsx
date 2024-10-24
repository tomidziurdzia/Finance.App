import { Wallet, GlobeIcon } from "lucide-react";
import Link from "next/link";

const iconMap = {
  Wallet: Wallet,
  GlobeIcon: GlobeIcon,
};

interface NavbarProps {
  iconName: keyof typeof iconMap;
}

const Navbar = ({ iconName }: NavbarProps) => {
  const IconComponent = iconMap[iconName];

  return (
    <div>
      <Link
        href="/home"
        className="flex items-center gap-2 font-bold"
        prefetch={false}
      >
        <IconComponent className="h-6 w-6" />
        <span className="text-lg">Finance App</span>
      </Link>
    </div>
  );
};

export default Navbar;
