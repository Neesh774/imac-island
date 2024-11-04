import { Search, ShoppingBag } from "lucide-react";

export default function Nav() {
  return (
    <div className="flex justify-center items-center gap-[2.125rem] text-[#3A3A3A] text-xs h-11">
      <div className="text-xl font-semibold"></div>
      <p>Store</p>
      <p>Mac</p>
      <p>iPad</p>
      <p>iPhone</p>
      <p>Watch</p>
      <p>Vision</p>
      <p>AirPods</p>
      <p>TV & Home</p>
      <p>Entertainment</p>
      <p>Accessories</p>
      <p>Support</p>
      <Search className="w-4 h-4" />
      <ShoppingBag className="w-4 h-4" />
    </div>
  );
}
