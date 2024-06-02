import { guilds } from '../data';
import { Link } from 'react-router-dom';

export default function GuildsList() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-5 w-fit mx-auto'>
      {guilds.map((guild) => (
        <div
          key={guild.id}
          className='flex flex-col p-4 border border-gray-200/25 hover:border-gray-200/50 transition-colors rounded-md mb-2 justify-center items-center relative overflow-hidden w-full max-w-80 sm:w-52 hover:drop-shadow-2xl'
        >
          <img
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=256`}
            alt={guild.name}
            className='absolute inset-0 blur-sm w-full h-1/2 -z-20 object-cover brightness-[20%]'
            aria-hidden
          />
          <img
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=128`}
            alt={guild.name}
            className='size-14 rounded-full mb-2'
          />
          <h3 className='mb-4 font-semibold text-center line-clamp-1'>
            {guild.name}
          </h3>

          <Link to={`/guilds/${guild.id}`} className='btn btn-secondary btn-sm'>
            Configure
          </Link>
        </div>
      ))}
    </div>
  );
}
