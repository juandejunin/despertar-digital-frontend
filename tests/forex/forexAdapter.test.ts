import { forexTrendToSlide } from '@/features/deportes/overview/economia/adapters/forexToEconomySlide';
import type { ForexSlide } from '@/features/deportes/overview/economia/forex/types/ForexSlide';
import type { ForexTrendBackend } from '@/features/deportes/overview/economia/forex/types/ForexTrendBackend';

describe('Adaptador forexTrendToSlide', () => {
    it('debería convertir correctamente una tendencia de Forex del backend a ForexSlide', () => {
        const base = 'USD';

        const mockTrend: ForexTrendBackend = {
            currency: 'EUR',
            today: 0.83514,
            comparisons: [
                { daysAgo: 1, date: '2026-01-27', rate: 0.83829 },
                { daysAgo: 7, date: '2026-01-21', rate: 0.85186 },
                { daysAgo: 30, date: '2025-12-29', rate: 0.84991 },
                { daysAgo: 180, date: '2025-08-01', rate: 0.87689 },
                { daysAgo: 365, date: '2025-01-28', rate: 0.83514 },
            ],
        };

        const slide: ForexSlide = forexTrendToSlide(base, mockTrend);

        expect(slide).toEqual({
            id: 'USD_EUR',
            kind: 'forex',
            type: 'forex',
            pair: 'USD/EUR',
            change1d: ((0.83514 - 0.83829) / 0.83829) * 100,
            change7d: ((0.83514 - 0.85186) / 0.85186) * 100,
            change30d: ((0.83514 - 0.84991) / 0.84991) * 100,
            change180d: ((0.83514 - 0.87689) / 0.87689) * 100,
            change365d: 0, // mismo valor → 0%
        });
    });

    it('debería retornar undefined cuando no existe comparación para un período', () => {
        const base = 'USD';

        const mockTrend: ForexTrendBackend = {
            currency: 'EUR',
            today: 1,
            comparisons: [
                { daysAgo: 1, date: '2026-01-27', rate: 0.99 },
                { daysAgo: 7, date: '2026-01-21', rate: 0.95 },
                // 👇 NO hay 30, 180 ni 365
            ],
        };

        const slide = forexTrendToSlide(base, mockTrend);

        expect(slide.change1d).toBeDefined();
        expect(slide.change7d).toBeDefined();
        expect(slide.change30d).toBeUndefined();
        expect(slide.change180d).toBeUndefined();
        expect(slide.change365d).toBeUndefined();
    });

    it('debería manejar correctamente un arreglo de comparaciones vacío o inexistente', () => {
        const base = 'USD';

        const mockTrend: ForexTrendBackend = {
            currency: 'JPY',
            today: 150,
            comparisons: [],
        };

        const slide = forexTrendToSlide(base, mockTrend);

        expect(slide.change1d).toBeUndefined();
        expect(slide.change7d).toBeUndefined();
        expect(slide.change30d).toBeUndefined();
        expect(slide.change180d).toBeUndefined();
        expect(slide.change365d).toBeUndefined();
    });

});
