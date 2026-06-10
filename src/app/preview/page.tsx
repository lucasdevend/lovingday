'use client';

import React, { useState, useEffect } from 'react';
import PreviewNetflix from '@/components/PreviewNetflix';

interface CoupleData {
  coupleName: string;
  specialDate: string;
  musicUrl: string;
  message: string;
  photoUrls: string[];
  timeline: { title: string; date: string }[];
}

const DEFAULT_DATA: CoupleData = {
  coupleName: "Você & Seu Amor",
  specialDate: "14 de Fevereiro",
  musicUrl: "https://example.com/music.mp3",
  message: "Você é meu tudo!",
  photoUrls: ["https://via.placeholder.com/400"],
  timeline: [
    { title: "Primeiro encontro", date: "2020-01-15" },
    { title: "Primeiro beijo", date: "2020-03-20" }
  ]
};

export default function PreviewPage( ) {
  const [coupleData, setCoupleData] = useState<CoupleData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const savedData = localStorage.getItem("coupleData");
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData) as CoupleData;
        setCoupleData(parsed);
      } catch (error) {
        console.error("Erro ao parsear dados:", error);
        setCoupleData(DEFAULT_DATA);
      }
    } else {
      setCoupleData(DEFAULT_DATA);
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
