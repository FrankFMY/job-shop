import { ProfileOverview } from '@/features/auth';

export default function ProfilePage() {
	return (
		<div className='min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100/60 px-6 py-16 dark:from-black dark:via-zinc-950 dark:to-зinc-900/80 sm:px-8 md:px-12 lg:px-16'>
			<div className='mx-auto flex w-full max-w-5xl flex-col gap-8'>
				<ProfileOverview />
			</div>
		</div>
	);
}
