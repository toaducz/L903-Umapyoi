import { CharacterInfo } from '../api/characters/get-char-list';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  character: CharacterInfo;
};

export default function CharacterCard({ character }: Readonly<Props>) {
  return (
    <Link href={`/characters/${character.id}`}>
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 min-h-[200px] transition-all duration-500 ease-out hover:shadow-2xl hover:-translate-y-2 group animate-fade-in cursor-pointer">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <Image
            unoptimized
            src={character.thumb_img}
            alt={character.name_en}
            width={160}
            height={160}
            className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* Hover overlay với character info */}
          <div className="absolute inset-0 bg-gray-900/80 dark:bg-gray-900/90 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center rounded-xl">
            <p className="text-sm">Main Color: <span style={{ color: character.color_main }}>{character.color_main}</span></p>
            <p className="text-sm">Sub Color: <span style={{ color: character.color_sub }}>{character.color_sub}</span></p>
          </div>
        </div>
        <div className="mt-3 text-center">
          <p className="font-bold text-lg text-pink-600 dark:text-pink-400 transition-colors duration-300 group-hover:text-pink-500">
            {character.name_en}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">{character.name_jp}</p>
        </div>
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-semibold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Xem thêm
        </div>
      </div>
    </Link>
  );
}