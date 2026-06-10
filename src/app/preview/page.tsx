'use client';

import React, { useState, useEffect } from 'react';
import PreviewNetflix from '@/components/PreviewNetflix';

export default function PreviewPage() {
  // Estado para armazenar os dados do casal
  const [coupleData, setCoupleData] = useState<any>(null);

  useEffect(() => {
    // Tenta carregar os dados do localStorage (onde o formulário salvou)
    const savedData = localStorage.getItem('lovinDay_preview_data');
    
    if (savedData) {
      setCoupleData(JSON.parse(savedData));
    } else {
      // DADOS MOCK (Exemplo para você ver funcionando agora mesmo)
      setCoupleData({
        coupleName: "Bruno & Ana",
        specialDate: "2024-06-12",
        musicUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Link de exemplo
        message: "Nossa história é o meu filme favorito. Cada dia ao seu lado é uma nova cena cheia de amor e felicidade. Te amo muito!",
        photos: [], // As fotos File[] não salvam no localStorage, aqui você usaria URLs
        timeline: [
          { date: "12/06/2023", title: "O Primeiro 'Oi'" },
          { date: "15/08/2023", title: "Nosso Primeiro Beijo" },
          { date: "01/01/2024", title: "A Viagem dos Sonhos" },
        ]
      } );
    }
  }, []);

  if (!coupleData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#141414] text-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return <PreviewNetflix data={coupleData} />;
}
