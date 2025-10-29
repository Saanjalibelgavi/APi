import React from "react";
import { useLocation, Link } from "react-router-dom";

type Item = { id: string; name: string; price: number; image: string; category: string };

const demoData: Record<string, Item[]> = {
  skincare: [
    { id: "s1", name: "Vitamin C Serum", price: 799, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXQ5Xa6tT-_NVp2ViUhBLUvPMF_nJTHvpMEw&s", category: "skincare" },
    { id: "s2", name: "Hydrating Toner", price: 599, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpGTKz6D9AmT_vTye1FETiUS4wmRa5jrt6Q&s", category: "skincare" },
    { id: "s3", name: "SPF 50 Sunscreen", price: 699, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbDo3SvjZGNk7_dhmOtqDSIa6iVdhLNY5N7Q&s", category: "skincare" },
    { id: "s4", name: "Night Repair Cream", price: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfVFQnXAwWDC8g0bMIDq02QdeJS6lodwYSw&s", category: "skincare" },
    { id: "s5", name: "Foaming Face Wash", price: 349, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuYxOiQsiLCTvMgI3psahLcxnpkq6Mf0A0bw&s", category: "skincare" },
    { id: "s6", name: "Under Eye Gel", price: 549, image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80&auto=format&fit=crop", category: "skincare" },
  ],
  clothing: [
    { id: "c1", name: "Classic Cotton Tee", price: 499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN5CDVV4otRGAp_V1JRbVtcljMGmI0FTXeaA&s", category: "clothing" },
    { id: "c2", name: "Slim Fit Jeans", price: 1499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTohKrHHbE9n4RMJ6rc5ubSk0uAVEvM2t9-ig&s", category: "clothing" },
    { id: "c3", name: "Hooded Sweatshirt", price: 1299, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkMHadLnWcXASUcQwR54tYsOnIIImGzZXu1g&s", category: "clothing" },
    { id: "c4", name: "Linen Shirt", price: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP93aZJvUEIo8wgT_EghIdmoQZK0HUUb9qDA&s", category: "clothing" },
    { id: "c5", name: "Chino Pants", price: 1399, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKty_Zg6v2Fs2aXWPv9heAzxTv8pjMWRGRQ&s", category: "clothing" },
    { id: "c6", name: "Sneakers", price: 1999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format&fit=crop", category: "clothing" },
  ],
  electronics: [
    { id: "e1", name: "Bluetooth Earbuds", price: 1999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNxbHsVmi9QB8ApQAkLyggnQu5_JKKY1gL8g&s", category: "electronics" },
    { id: "e2", name: "Smart Watch", price: 3499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp99vVnkZSnBIhffkB2nb_YCZJe74qoTx0WA&s", category: "electronics" },
    { id: "e3", name: "Wireless Speaker", price: 2499, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd1UnCksmq-WylxRiFeaM0JyxfAWey7xAeAw&s", category: "electronics" },
    { id: "e4", name: "Mechanical Keyboard", price: 2899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr-xjwL3IG2nDm8UcCE2psDvs2OT8LDrVbKQ&s", category: "electronics" },
    { id: "e5", name: "Action Camera", price: 4599, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4wDqodbBgppniW12_FT1D1adtP8ynHz2MQ&s", category: "electronics" },
    { id: "e6", name: "USB-C Hub", price: 899, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzoSUohczaSGneclnZ-6mvD7lDopNJtAqveA&s", category: "electronics" },
  ],
  home: [
    { id: "h1", name: "Aroma Diffuser", price: 1299, image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80&auto=format&fit=crop", category: "home" },
    { id: "h2", name: "Ceramic Vase", price: 799, image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&q=80&auto=format&fit=crop", category: "home" },
    { id: "h3", name: "Throw Blanket", price: 999, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDnye54p2S-gxq-gcWOH7_NV0y0UP4H25c_w&s", category: "home" },
    { id: "h4", name: "Table Lamp", price: 1499, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80&auto=format&fit=crop", category: "home" },
    { id: "h5", name: "Wall Clock", price: 699, image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&q=80&auto=format&fit=crop", category: "home" },
    { id: "h6", name: "Cushion Set", price: 899, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format&fit=crop", category: "home" },
  ],
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function Products() {
  const query = useQuery();
  const category = (query.get("category") || "skincare").toLowerCase();
  const items = demoData[category] || demoData.skincare;

  const titleMap: Record<string, string> = {
    skincare: "Skincare",
    clothing: "Clothing",
    electronics: "Electronics",
    home: "Home",
  };
  const title = titleMap[category] || "Skincare";

  return (
    <div className="min-h-screen" style={{ background: "var(--brand-bg)", color: "var(--brand-text)" }}>
      {/* Hero Section */}
      <div className="w-full h-48 md:h-64 flex items-center justify-center relative mb-8" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0" style={{background: 'linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-bg) 100%)', opacity: 0.7}}></div>
        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow mb-2">Discover Your Next Favorite</h2>
          <p className="text-lg md:text-2xl text-white font-medium drop-shadow">Shop the best in {title} products</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title} products</h1>
          <Link to="/" className="link text-sm">Home</Link>
        </div>

        {/* ✅ product grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {items.map((p) => (
            <article
              key={p.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-xl transition-transform duration-300 transform hover:scale-105 bg-white relative"
            >
              <Link to={`/product/${p.id}`} className="block">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
                {/* Badge */}
                <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded shadow">New</span>
                <div className="card-body p-3">
                  <h4 className="text-sm font-semibold line-clamp-2">{p.name}</h4>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold" style={{ color: "var(--brand-primary)" }}>
                      ₹{p.price}
                    </span>
                    <span className="text-xs text-gray-500">View →</span>
                  </div>
                  {/* Add to Cart Button (revealed on hover) */}
                  <button className="mt-3 w-full bg-blue-600 text-white py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold hover:bg-blue-700">Add to Cart</button>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
