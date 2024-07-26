import Image from "next/image";

import HeroIMG from '@/assets/hero.svg'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h2 className="font-medium text-2xl mb-2">Abra o seu chamado agora</h2>
      <h1 className="font-bold text-3xl mb-8 text-blue-600 md:text-4xl">na Hebrom HelpDesk</h1>
      <Image
        src={HeroIMG}
        alt="Imagem hero da Hebrom HelpDesk"
        width={600}
        className="max-w-sm md:max-w-xl"
      />
    </main>
  );
}
