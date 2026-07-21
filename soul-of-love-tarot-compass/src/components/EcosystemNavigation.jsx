const links = [
  ["Portfolio Hub", "https://win-soul-of-love-portfolio-hub.vercel.app"],
  ["Daily Energy", "https://soul-of-love-daily-energy.vercel.app"],
  ["ฤกษ์ดี", "https://soul-of-love-daily-energy.vercel.app/thai-wisdom"],
  ["Matrix 9", "https://matrix9-interface.vercel.app"],
  ["LINE OA", "https://line.me/R/ti/p/%40514wppkc"],
];

export default function EcosystemNavigation() {
  return (
    <nav className="ecosystem-nav" aria-label="Soul of Love Ecosystem">
      <span>Soul of Love Ecosystem</span>
      <div>
        {links.map(([label, href]) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
