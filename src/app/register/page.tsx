import Link from 'next/link';

import { AuthPageShell } from '@/features/auth';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export default function RegisterPage() {
	return (
		<AuthPageShell
			title='Создайте аккаунт в Job Shop'
			description='Заполните данные, чтобы протестировать путь продавца или покупателя в нашей моковой среде. Позже подключим БД и реальные интеграции.'
			footer={
				<p>
					Уже есть аккаунт?{' '}
					<Link
						href='/login'
						className='font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200'>
						Войдите
					</Link>
				</p>
			}>
			<RegisterForm />
		</AuthPageShell>
	);
}
