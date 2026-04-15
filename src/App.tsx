import React, { useState } from 'react';
import { Facebook, Instagram, Phone, ArrowLeft, Heart, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const categories = [
  { id: 'decoracion', title: 'Decoración' },
  { id: 'detalles',   title: 'Detalles'   },
  { id: 'desayunos',  title: 'Desayunos'  },
  { id: 'peluches',   title: 'Peluches'   }
];

const productsData: Record<string, { id: number; name: string; price: string }[]> = {
  decoracion: [
    { id: 1, name: 'Arco de Globos Orgánico',   price: 'Desde S/ 150'   },
    { id: 2, name: 'Fondo Temático Completo',    price: 'Desde S/ 250'   },
    { id: 3, name: 'Centros de Mesa Elegantes',  price: 'Desde S/ 35 c/u'},
    { id: 4, name: 'Decoración de Sillas',       price: 'Desde S/ 15 c/u'},
  ],
  detalles: [
    { id: 5, name: 'Ramo Buchón de Rosas', price: 'Desde S/ 80' },
    { id: 6, name: 'Caja Sorpresa Dulce',  price: 'Desde S/ 65' },
  ],
  desayunos: [
    { id: 8, name: 'Desayuno Sorpresa', price: 'Desde S/ 90'  },
    { id: 9, name: 'Bandeja Premium',   price: 'Desde S/ 120' },
  ],
  peluches: [
    { id: 7,  name: 'Oso de Peluche Gigante',      price: 'Desde S/ 120' },
    { id: 10, name: 'Peluche Mediano con Rosas',   price: 'Desde S/ 85'  },
  ]
};

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

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-amber-950 selection:bg-pink-200">
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
              <header className="pt-12 pb-8 px-6 text-center bg-gradient-to-b from-pink-100 to-white rounded-b-3xl shadow-sm">
                <div className="w-32 h-32 mx-auto bg-pink-200 rounded-full flex items-center justify-center mb-4 shadow-inner border-4 border-white overflow-hidden">
                  {/* Placeholder for Logo - styled to match the vibe */}
                  <div className="text-center">
                    <Heart className="w-10 h-10 text-pink-500 mx-auto mb-1 fill-pink-500" />
                    <span className="font-bold text-amber-900 text-xs tracking-widest">ARACELLY</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-extrabold text-amber-900 mb-1 font-serif">
                  Aracelly
                </h1>
                <p className="text-sm text-pink-600 font-medium tracking-wide uppercase mb-2">
                  Detalles y Decoraciones
                </p>
                <p className="text-amber-700/80 italic text-sm mb-6">
                  "Porque cada detalle importa"
                </p>

                {/* Social & Contact */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex justify-center gap-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                      <TikTokIcon className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <a 
                    href="https://wa.me/51928611993" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-green-600 transition-colors active:scale-95"
                  >
                    <Phone className="w-4 h-4" />
                    928 611 993
                  </a>
                  <p className="text-xs text-amber-900/60 font-medium">@detalles.aracelly</p>
                </div>
              </header>

              {/* Categories Section */}
              <main className="px-4 py-8">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-1 w-16 bg-pink-500 rounded-full"></div>
                  <h2 className="text-xl font-black text-amber-900 tracking-widest uppercase italic">
                    Catálogo
                  </h2>
                  <div className="h-1 w-16 bg-pink-500 rounded-full"></div>
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
                      {/* Image placeholder */}
                      <div className="absolute inset-0 bg-pink-100 flex flex-col items-center justify-center gap-1 border-2 border-dashed border-pink-300">
                        <span className="text-3xl">🖼️</span>
                        <span className="text-[11px] font-semibold text-pink-400 tracking-wide uppercase">Aquí va imagen</span>
                      </div>

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
                          {productsData[category.id]?.length || 0} PRODUCTOS
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
              <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-pink-100 px-4 py-4 flex items-center gap-4 shadow-sm">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 -ml-2 rounded-full hover:bg-pink-100 text-pink-600 transition-colors active:scale-95"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-amber-900 capitalize font-serif">
                  {categories.find(c => c.id === selectedCategory)?.title}
                </h2>
              </div>

              {/* Product List */}
              <div className="p-4 space-y-4">
                {productsData[selectedCategory]?.map((product, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-pink-100 flex flex-col"
                  >
                    {/* Image placeholder */}
                    <div className="aspect-[4/3] w-full bg-pink-50 border-b-2 border-dashed border-pink-200 flex flex-col items-center justify-center gap-1">
                      <span className="text-4xl">🖼️</span>
                      <span className="text-xs font-semibold text-pink-300 tracking-wide uppercase">Aquí va imagen</span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                      <h3 className="font-bold text-amber-900 text-lg leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-pink-600 font-semibold bg-pink-50 px-3 py-1 rounded-lg text-sm">
                          {product.price}
                        </span>
                        <a 
                          href={`https://wa.me/51928611993?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white bg-amber-800 px-4 py-2 rounded-full hover:bg-amber-900 transition-colors active:scale-95"
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
      </div>
    </div>
  );
}
