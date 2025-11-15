/** @jsxImportSource preact */

interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status?: string;
  minute?: string;
  time?: string;
  date?: string;
  homeLogo?: string;
  awayLogo?: string;
}

interface Props {
  matches: Match[];
}

export default function SportsTopMatches({ matches }: Props) {
  if (!matches || matches.length === 0) {
    return <p class="text-center text-gray-500 py-10">No hay partidos</p>;
  }

  return (
    <div class="bg-white rounded-xl shadow-xl border overflow-hidden">
      <div class="bg-gradient-to-r from-green-700 to-green-800 text-white px-8 py-5">
        <h3 class="text-2xl font-bold text-center">Partidos Destacados</h3>
      </div>

      <div class="divide-y divide-gray-200">
        {matches.map((match, index) => {
          const key = index; // <-- ESTA LÍNEA ES LA CLAVE
          return (
            <div
              key={key}
              class={`px-8 py-6 flex items-center justify-between transition ${
                match.status === "LIVE" ? "bg-yellow-50 font-bold" : "hover:bg-green-50"
              }`}
            >
              {/* Local */}
              <div class="flex items-center gap-4 flex-1 justify-end">
                <span class="font-semibold text-right max-w-40 truncate">
                  {match.homeTeam}
                </span>
                {match.homeLogo && (
                  <img src={match.homeLogo} alt="" class="w-10 h-10" />
                )}
              </div>

              {/* Resultado */}
              <div class="text-center mx-8">
                {match.status === "LIVE" ? (
                  <div class="text-red-600 text-2xl font-bold">
                    {match.homeScore ?? 0} - {match.awayScore ?? 0}
                    <div class="text-sm text-red-500">{match.minute}'</div>
                  </div>
                ) : match.homeScore !== undefined ? (
                  <div class="text-2xl font-bold">
                    {match.homeScore} - {match.awayScore}
                  </div>
                ) : (
                  <div class="text-gray-600 font-medium">
                    {match.time || "--:--"}
                  </div>
                )}
              </div>

              {/* Visitante */}
              <div class="flex items-center gap-4 flex-1">
                {match.awayLogo && (
                  <img src={match.awayLogo} alt="" class="w-10 h-10" />
                )}
                <span class="font-semibold max-w-40 truncate">
                  {match.awayTeam}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}