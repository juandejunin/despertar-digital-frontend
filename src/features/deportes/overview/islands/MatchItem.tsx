/** @jsxImportSource preact */
interface Match {
  league: string;
  home: string;
  away: string;
  homeGoals: number;
  awayGoals: number;
  status: string;
  time: string;
}

export default function MatchItem({ match }: { match: Match }) {
  return (
    <div class="p-4 rounded-lg flex flex-col justify-center items-center w-full">
      <div class="flex flex-col justify-center items-center gap-1 p-4 rounded-lg h-full">
        <p class="text-xl text-gray-700 font-medium text-center truncate mb-1" title={match.league}>
          {match.league}
        </p>
        <p class="text-xl font-semibold text-gray-700 truncate text-center" title={match.home}>
          {match.home}
        </p>
        <p class="text-lg font-bold text-gray-900 text-center">
          {match.homeGoals} - {match.awayGoals}
        </p>
        <p class="text-xl font-semibold text-gray-700 truncate text-center" title={match.away}>
          {match.away}
        </p>
        <p class="text-xs text-gray-500 mt-1 text-center">
          {match.status} • {match.time}
        </p>
      </div>
    </div>
  );
}