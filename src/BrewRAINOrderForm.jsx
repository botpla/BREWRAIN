import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, Coffee, Phone, ClipboardCheck, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * BrewRAIN – Single‑File Order Form (React)
 * --------------------------------------------------
 * • Tailwind + shadcn/ui + framer-motion
 * • Add items to cart, auto total, customer details
 * • Generate WhatsApp order message
 * • Print-friendly summary
 *
 * Tips:
 * - Edit the PRODUCTS list to add/remove menu and base prices
 * - Edit SIZES to control size-based price adjustments
 */

const CURRENCY = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

const PRODUCTS = [
  { id: "matcha", name: "Matcha Latte", basePrice: 15000 },
  { id: "aren", name: "Aren Latte", basePrice: 15000 },
  { id: "vanilla", name: "Vanilla Latte", basePrice: 15000 },
  { id: "caffe", name: "BRAIN Latte", basePrice: 15000 },
  { id: "thai", name: "Thai Tea", basePrice: 15000 },
  { id: "green", name: "Green Tea", basePrice: 15000 },
  { id: "coklat", name: "Choco Luxe", basePrice: 15000 },
];

const SIZES = [
  { id: "250", label: "Reguler", priceAdj: 0 },
];

const ICE_LEVELS = ["Normal"];
const SUGAR_LEVELS = ["0%", "25%", "50%", "75%", "100%"];

function Line() {
  return <div className="h-px w-full bg-gray-200 my-4" />;
}

function ProductCard({ p, onAdd }) {
  const [size, setSize] = useState(SIZES[0].id);
  const [qty, setQty] = useState(1);
  const [ice, setIce] = useState(ICE_LEVELS[2]);
  const [sugar, setSugar] = useState(SUGAR_LEVELS[3]);
  const [notes, setNotes] = useState("");

  const price = useMemo(() => {
    const adj = SIZES.find((s) => s.id === size)?.priceAdj || 0;
    return p.basePrice + adj;
  }, [p.basePrice, size]);

  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Coffee className="w-5 h-5" />
          <CardTitle className="text-lg">{p.name}</CardTitle>
          <Badge variant="secondary" className="ml-auto">{CURRENCY(price)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="col-span-2">
            <label className="text-sm">Ukuran</label>
            <select
              className="w-full border rounded-xl px-3 py-2"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {SIZES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label} {s.priceAdj ? `(+${CURRENCY(s.priceAdj)})` : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm">Es</label>
            <select className="w-full border rounded-xl px-3 py-2" value={ice} onChange={(e) => setIce(e.target.value)}>
              {ICE_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm">Gula</label>
            <select className="w-full border rounded-xl px-3 py-2" value={sugar} onChange={(e) => setSugar(e.target.value)}>
              {SUGAR_LEVELS.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-sm">Catatan</label>
          <Textarea
            className="mt-1"
            placeholder="Catatan khusus (mis. kurangi manis, tanpa topping, dsb.)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}>
              <Minus className="w-4 h-4" />
            </Button>
            <span className="px-3 py-1 rounded-xl border min-w-12 text-center">{qty}</span>
            <Button type="button" variant="outline" size="icon" onClick={() => setQty((q) => q + 1)}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <Button
            type="button"
            className="rounded-2xl"
            onClick={() => onAdd({
              id: `${p.id}-${Date.now()}`,
              productId: p.id,
              name: p.name,
              sizeId: size,
              sizeLabel: SIZES.find((s) => s.id === size)?.label ?? "",
              ice,
              sugar,
              notes,
              price,
              qty,
            })}
          >
            Tambah ke Keranjang 
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function CartItem({ item, onRemove, onQty }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start justify-between gap-3 py-3 border-b"
    >
      <div className="text-sm">
        <div className="font-medium">{item.name} • {item.sizeLabel}</div>
        <div className="text-xs text-gray-500">Es: {item.ice} • Gula: {item.sugar}</div>
        {item.notes && <div className="text-xs text-gray-500">Note: {item.notes}</div>}
        <div className="text-xs mt-1">Harga: {CURRENCY(item.price)} × {item.qty} = <span className="font-semibold">{CURRENCY(item.price * item.qty)}</span></div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onQty(item.id, Math.max(1, item.qty - 1))}><Minus className="w-4 h-4"/></Button>
        <span className="px-3 py-1 rounded-xl border min-w-10 text-center text-sm">{item.qty}</span>
        <Button variant="outline" size="icon" onClick={() => onQty(item.id, item.qty + 1)}><Plus className="w-4 h-4"/></Button>
        <Button variant="destructive" size="icon" onClick={() => onRemove(item.id)}><Trash2 className="w-4 h-4"/></Button>
      </div>
    </motion.div>
  );
}

function OrderSummary({ cart, customer, onPrint, onWA }) {
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Ringkasan Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cart.length === 0 ? (
            <div className="text-sm text-gray-500">Keranjang kosong.</div>
          ) : (
            cart.map((it) => <CartItem key={it.id} item={it} onRemove={customer.onRemove} onQty={customer.onQty} />)
          )}

          <Line />
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="font-bold">{CURRENCY(total)}</span>
          </div>

          <Line />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Nama beserta Kelas</label>
              <Input placeholder="Nama" value={customer.name} onChange={(e) => customer.setName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm">No. WhatsApp</label>
              <Input placeholder="08xxxxxxxxxx" value={customer.phone} onChange={(e) => customer.setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-sm">Jam Istirahat diantar</label>
            <Textarea placeholder="Ready senin sampai kamis, bisa di jam istirahat pertama atau kedua (selalu ada peluang untuk pesanan kamu di cancel semisal saya ada perubahan jadwal dalam mengajar, dan sebagainya.)" value={customer.address} onChange={(e) => customer.setAddress(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
            <Button className="rounded-2xl" onClick={onPrint}>
              <Printer className="w-4 h-4 mr-2" /> Cetak Struk
            </Button>
            <Button variant="secondary" className="rounded-2xl" onClick={() => onWA("seller") }>
              <Phone className="w-4 h-4 mr-2" /> Kirim ke WA Seller
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function BrewRAINOrderForm() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const total = useMemo(() => cart.reduce((s, it) => s + it.price * it.qty, 0), [cart]);

  const addItem = (item) => setCart((c) => [item, ...c]);
  const removeItem = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const updateQty = (id, qty) => setCart((c) => c.map((x) => (x.id === id ? { ...x, qty } : x)));

  const makeText = () => {
  const header = `*BrewRAIN – Order*`;

  const info = [
    `Nama: ${name || '-'}`,
    `WA: ${phone || '-'}`,
    `Alamat: ${address || '-'}`,
  ];

  const lines = cart.map((it, idx) =>
    `${idx + 1}. ${it.name} (${it.sizeLabel}) x${it.qty}
   Es: ${it.ice} • Gula: ${it.sugar}${it.notes ? `\n   Note: ${it.notes}` : ''}
   Subtotal: ${CURRENCY(it.price * it.qty)}`
  );

  const footer = `Total: ${CURRENCY(total)}

Terima kasih! 🙏`;

  // Susun final text tanpa .join('\n') yang rawan typo
  return `${header}

${info.join('\n')}

${lines.join('\n')}

${footer}`;
};

  const openWA = (target = "seller") => {
  const text = encodeURIComponent(makeText());
  const sellerNumber = "6285155178234";
  const url = target === "seller" && sellerNumber
    ? `https://wa.me/${sellerNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
  window.open(url, "_blank");
};


  const onPrint = () => {
    // Print view: open a minimal window with the order summary
    const w = window.open("", "_blank");
    if (!w) return;
    const html = `<!doctype html>
<html>
<head>
<meta charset='utf-8'/>
<title>BrewRAIN – Struk</title>
<style>
  body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial; padding: 20px; }
  h1 { font-size: 18px; margin: 0 0 8px; }
  .muted { color: #6b7280; font-size: 12px }
  .line { height: 1px; background: #e5e7eb; margin: 10px 0 }
  table { width: 100%; border-collapse: collapse; font-size: 12px }
  th, td { text-align: left; padding: 6px 4px; }
  tfoot td { font-weight: 700 }
</style>
</head>
<body>
  <h1>BrewRAIN – Struk Pesanan</h1>
  <div class="muted">${new Date().toLocaleString("id-ID")}</div>
  <div style="margin-top:8px">
    <div><strong>Nama:</strong> ${name || "-"}</div>
    <div><strong>WA:</strong> ${phone || "-"}</div>
    <div><strong>Alamat:</strong> ${address || "-"}</div>
  </div>
  <div class="line"></div>
  <table>
    <thead>
      <tr><th>#</th><th>Menu</th><th>Qty</th><th>Harga</th><th>Subtotal</th></tr>
    </thead>
    <tbody>
      ${cart
        .map(
          (it, i) => `<tr>
            <td>${i + 1}</td>
            <td>${it.name} – ${it.sizeLabel}<br/><span class="muted">Es: ${it.ice} • Gula: ${it.sugar}${it.notes ? ` • ${it.notes}` : ""}</span></td>
            <td>${it.qty}</td>
            <td>${CURRENCY(it.price)}</td>
            <td>${CURRENCY(it.price * it.qty)}</td>
          </tr>`
        )
        .join("")}
    </tbody>
    <tfoot>
      <tr><td colspan="4">Total</td><td>${CURRENCY(total)}</td></tr>
    </tfoot>
  </table>
  <script>window.print(); setTimeout(() => window.close(), 300);</script>
</body>
</html>`;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <motion.h1 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-3xl font-bold tracking-tight">
            BrewRAIN – Form Pemesanan
          </motion.h1>
          <p className="text-gray-600">Pilih menu, atur preferensi, lalu tambah ke keranjang. Total dan struk otomatis.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={addItem} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <OrderSummary
            cart={cart}
            customer={{
              name,
              phone,
              address,
              setName,
              setPhone,
              setAddress,
              onRemove: removeItem,
              onQty: updateQty,
            }}
            onPrint={onPrint}
            onWA={openWA}
          />

          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pengaturan Cepat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="text-gray-600">Edit daftar harga dasar & ukuran langsung di dalam kode: <code>PRODUCTS</code> dan <code>SIZES</code>.</div>
              <div className="text-gray-600">Set nomor WA seller di variabel <code>sellerNumber</code> agar tombol “Kirim ke WA Seller” langsung ke nomor toko.</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
