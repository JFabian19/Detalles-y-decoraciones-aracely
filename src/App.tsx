import React, { useState } from 'react';
import { Facebook, Instagram, Phone, ArrowLeft, Heart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { categories, productsData as initialProductsData } from './data';

// Custom TikTok Icon since it's not in lucide-react by default
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Record<string, { id: number; name: string; price: string; image?: string }[]>>(initialProductsData as any);
  const [showExportedCode, setShowExportedCode] = useState(false);

  const handlePriceChange = (category: string, productId: number, newPrice: string) => {
    setProducts(prev => ({
      ...prev,
      [category]: prev[category].map(p => p.id === productId ? { ...p, price: newPrice } : p)
    }));
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-[#4A2C2A] selection:bg-pink-200">
      {/* Main Container - Mobile First */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative overflow-hidden">
        
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="pb-12"
            >
              {/* Hero Section */}
              <header className="pt-12 pb-10 px-6 text-center bg-gradient-to-b from-[#FFF0F5] via-pink-50 to-white rounded-b-[3rem] shadow-sm relative overflow-hidden">
                {/* Decorative Elements */}
                <motion.div 
                  animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 text-[#FFB6C1]/30"
                >
                  <Heart size={80} className="fill-current" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-20 -right-6 text-[#FFB6C1]/20"
                >
                  <Heart size={60} className="fill-current" />
                </motion.div>

                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 15 }}
                  className="w-40 h-40 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-xl border-[6px] border-[#FFB6C1] overflow-hidden"
                >
                  <div className="text-center">
                    <img src="/logo.png" alt="Aracelly Logo" className="w-full h-full object-cover p-1" />
                  </div>
                </motion.div>

                {/* Admin Simulation Toggle (Discrete) */}
                <button 
                  onClick={() => setIsAdmin(!isAdmin)}
                  className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isAdmin ? 'bg-amber-800 text-white shadow-lg' : 'bg-transparent text-[#4A2C2A]/20 hover:text-[#4A2C2A]'}`}
                >
                  <Heart size={20} className={isAdmin ? 'fill-current' : ''} />
                </button>
                
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-black text-[#4A2C2A] mb-1 font-serif"
                >
                  Aracelly
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm text-[#FF69B4] font-extrabold tracking-[0.2em] uppercase mb-2"
                >
                  Detalles y Decoraciones
                </motion.p>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-[#4A2C2A]/70 italic text-sm mb-8"
                >
                  "Porque cada detalle importa"
                </motion.p>

                {/* Social & Contact */}
                <div className="flex flex-col items-center gap-6">
                  <div className="flex justify-center gap-5">
                    <a 
                      href="https://www.facebook.com/p/Detalles-Aracelly-100057186201363/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@detalles.araceli" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    >
                      <TikTokIcon className="w-6 h-6" />
                    </a>
                    <a 
                      href="https://www.instagram.com/detallesbyara_/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  </div>
                  
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/51928611993" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-green-200/50 hover:bg-[#20bd5a] transition-all"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    928 611 993
                  </motion.a>
                  <p className="text-xs text-[#4A2C2A]/50 font-bold tracking-widest uppercase">@detalles.araceli</p>
                  
                  {isAdmin && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-4 bg-amber-50 rounded-2xl border-2 border-dashed border-amber-200 w-full"
                    >
                      <p className="text-amber-900 font-bold text-xs uppercase mb-2">Simulador de Administración</p>
                      <p className="text-[10px] text-amber-800/70 mb-4">Estás en modo edición. Cambia los precios abajo en el catálogo y luego genera el código.</p>
                      <button 
                        onClick={() => setShowExportedCode(true)}
                        className="bg-amber-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-amber-900 shadow-md"
                      >
                        Generar Código para Git
                      </button>
                    </motion.div>
                  )}
                </div>
              </header>

              {/* Categories Section */}
              <main className="px-4 py-8">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="h-1 w-12 bg-[#FF69B4] rounded-full"></div>
                  <h2 className="text-xl font-black text-[#4A2C2A] tracking-[0.2em] uppercase italic">
                    Catálogo
                  </h2>
                  <div className="h-1 w-12 bg-[#FF69B4] rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-md"
                    >
                      {/* Category Image */}
                      {products[category.id]?.[0]?.image ? (
                        <div className="absolute inset-0 bg-pink-100 flex flex-col items-center justify-center overflow-hidden">
                          <img src={products[category.id][0].image} alt={category.title} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 bg-pink-100 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-pink-300">
                          <span className="text-3xl">🖼️</span>
                          <span className="text-[11px] font-semibold text-pink-400 tracking-wide uppercase">Aquí va imagen</span>
                        </div>
                      )}

                      {/* Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* Top Right Arrow */}
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm">
                        <ChevronRight className="w-4 h-4 text-amber-900" />
                      </div>

                      {/* Bottom Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col items-center justify-end text-center">
                        <h3 className="text-base font-extrabold text-white leading-tight drop-shadow-md mb-1">
                          {category.title}
                        </h3>
                        <p className="text-[9px] font-bold text-amber-300 tracking-wider uppercase drop-shadow-sm">
                          {products[category.id]?.length || 0} PRODUCTOS
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </main>
            </motion.div>
          ) : (
            <motion.div 
              key="products"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen bg-pink-50/50 pb-12"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-pink-100 px-4 py-4 flex items-center gap-4 shadow-sm">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 -ml-2 rounded-full hover:bg-pink-100 text-[#FF69B4] transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-[#4A2C2A] capitalize font-serif">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h2>
              </div>

              {/* Product List */}
              <div className="p-4 space-y-4">
                {products[selectedCategory || '']?.map((product, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-100 flex flex-col"
                  >
                    {/* Product Image */}
                    {product.image ? (
                      <div className="aspect-[4/3] w-full bg-pink-50 border-b border-pink-100 flex flex-col items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] w-full bg-pink-50 border-b-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-1">
                        <span className="text-4xl">🖼️</span>
                        <span className="text-xs font-semibold text-pink-300 tracking-wide uppercase">Aquí va imagen</span>
                      </div>
                    )}
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-bold text-[#4A2C2A] text-lg leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        {isAdmin ? (
                          <input 
                            type="text"
                            value={product.price}
                            onChange={(e) => handlePriceChange(selectedCategory!, product.id, e.target.value)}
                            className="text-[#FF69B4] font-bold bg-white border-2 border-pink-200 px-3 py-1 rounded-lg text-sm w-32 focus:outline-none focus:border-[#FF69B4]"
                          />
                        ) : (
                          <span className="text-[#FF69B4] font-bold bg-[#FFF0F5] px-3 py-1 rounded-lg text-sm">
                            {product.price}
                          </span>
                        )}
                        <a 
                          href={`https://wa.me/51928611993?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-white bg-[#4A2C2A] px-5 py-2.5 rounded-full hover:bg-[#3d2422] transition-colors active:scale-95 shadow-md shadow-pink-100"
                        >
                          Consultar
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/51928611993"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-lg hover:bg-[#20bd5a] transition-transform hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <WhatsAppIcon className="w-7 h-7" />
        </a>

        {/* Export Code Modal */}
        <AnimatePresence>
          {showExportedCode && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm p-4 flex items-center justify-center"
            >
              <motion.div 
                initial={{ y: 50, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-2">Código Generado</h3>
                  <p className="text-sm text-amber-700/70 mb-4">Copia este código y envíamelo para actualizar los precios definitivamente en tu web.</p>
                  
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 max-h-60 overflow-y-auto font-mono text-[10px] text-amber-900 whitespace-pre">
                    {`const productsData = ${JSON.stringify(products, null, 2)};`}
                  </div>
                  
                  <div className="mt-6 flex flex-col gap-3">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(`const productsData = ${JSON.stringify(products, null, 2)};`);
                        alert("¡Código copiado al portapapeles!");
                      }}
                      className="w-full bg-[#FF69B4] text-white py-3 rounded-xl font-bold shadow-lg"
                    >
                      Copiar Código
                    </button>
                    <button 
                      onClick={() => setShowExportedCode(false)}
                      className="w-full bg-amber-100 text-amber-900 py-3 rounded-xl font-bold"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
