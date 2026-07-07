import { useState } from "react";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Overlay from "./Overlay";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header setMenuOpen={setMenuOpen} />

      {menuOpen && <Overlay onClick={() => setMenuOpen(false)} />}

      <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
}
