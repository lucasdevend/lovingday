'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import PreviewNetflix from '@/components/PreviewNetflix';

export default function StoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStory = async () => {
      try {
        const docRef = doc(db, "stories", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('História não encontrada');
          setLoading(false);
          return;
        }

        const storyData = docSnap.data();

        // ✅ BLOQUEIO: Se não pagou, redireciona para checkout
        if (storyData && !storyData.paid) {
          router.push(`/checkout?id=${id}`);
          return;
        }

        setData(storyData || null);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar história:', err);
        setError('Erro ao carregar a história');
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin h-12 w-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p>Carregando sua história...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-red-600 font-bold">{error}</p>
        </div>
      </div>
    );
  }

return data ? <PreviewNetflix data={data as any} /> : null;

}
