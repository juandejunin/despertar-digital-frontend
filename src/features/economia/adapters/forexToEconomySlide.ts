import type { ForexSlide } from '../forex/types/ForexSlide';
import type { ForexTrendBackend } from '../forex/types/ForexTrendBackend';

export function forexTrendToSlide(
  base: string,
  trend: ForexTrendBackend
): ForexSlide {
  return {
    id: `${base}_${trend.currency}`,
    kind: 'forex',
    type: 'forex',
    pair: `${base}/${trend.currency}`,
    today: trend.today,
    change1d: computeChange(trend, 1),
    change7d: computeChange(trend, 7),
    change30d: computeChange(trend, 30),
    change180d: computeChange(trend, 180),
    change365d: computeChange(trend, 365),
  };
}

function computeChange(
  trend: ForexTrendBackend,
  daysAgo: number
): number | undefined {
  const comparison = trend.comparisons.find(c => c.daysAgo === daysAgo);
  if (!comparison) return undefined;

  return ((trend.today - comparison.rate) / comparison.rate) * 100;
}
