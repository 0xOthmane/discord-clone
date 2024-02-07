import { InitialModal } from '@/components/molecules/InitialModal';
import { ModeToggle } from './../components/atoms/ModeToggle';

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold text-indigo-500">Discord clone</h1>
      <ModeToggle />
      <InitialModal />
    </div>
  );
}
