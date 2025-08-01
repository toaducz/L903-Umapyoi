import { CharacterInfo } from '../api/characters/get-char-list';
import CharacterCard from './CharacterCard';

type Props = {
  characters: CharacterInfo[];
};

export default function CharacterGrid({ characters }: Readonly<Props>) {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
        {characters.map((char, index) => (
          <div key={char.id} style={{ animationDelay: `${index * 0.1}s` }}>
            <CharacterCard character={char} />
          </div>
        ))}
      </div>
    </div>
  );
}