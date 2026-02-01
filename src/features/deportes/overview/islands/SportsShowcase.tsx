/** @jsxImportSource preact */
import { useEffect, useState, useRef } from "preact/hooks";
import MatchItem from "./MatchItem";

interface Match {
  league: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
  time: string;
}

interface Props {
  apiUrl: string;
}

export default function SportsShowcase({ apiUrl }: Props) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const CACHE_KEY = "sports-matches";
  const CACHE_TTL = 5 * 60 * 1000;
  const intervalRef = useRef<number | null>(null);

  const readCache = (): Match[] | null => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const { ts, data } = JSON.parse(raw);
      if (Date.now() - ts < CACHE_TTL) return data;
    } catch {}
    return null;
  };

  const writeCache = (data: Match[]) => {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
  };

  const fetchMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(apiUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const matchesData: Match[] = data.data || data;
      setMatches(matchesData);
      writeCache(matchesData);
      setCurrentIndex(0);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los partidos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = readCache();
    if (cached) {
      setMatches(cached);
      setLoading(false);
      setTimeout(fetchMatches, 1000);
    } else {
      fetchMatches();
    }
  }, [apiUrl]);

  // Carousel automático
  useEffect(() => {
    if (matches.length === 0) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matches.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [matches]);

  const nextMatch = () => {
    if (matches.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % matches.length);
    restartInterval();
  };

  const prevMatch = () => {
    if (matches.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + matches.length) % matches.length);
    restartInterval();
  };

  const restartInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % matches.length);
    }, 4000);
  };

  const handleClick = (e: MouseEvent) => {
    if (window.getSelection()?.toString()) return;
    if (e.shiftKey) prevMatch();
    else nextMatch();
  };

  if (loading) return <p class="text-gray-500">🔄 Cargando partidos…</p>;
  if (error) return <p class="text-red-600">{error}</p>;
  if (matches.length === 0) return <p class="text-gray-500">No hay partidos</p>;

  const currentMatch = matches[currentIndex];

  return (
    <div onClick={handleClick} class="w-full cursor-pointer relative overflow-hidden min-h-[180px]">
      <div
        key={currentIndex}
        class="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out opacity-0 translate-y-5
               animate-[fadeSlideIn_0.7s_ease-in-out_forwards]"
      >
        <MatchItem match={currentMatch} />
      </div>

      <style>
        {`
          @keyframes fadeSlideIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
