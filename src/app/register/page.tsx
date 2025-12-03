/**
 * @fileoverview Job Shop — Initiative Development / Инициативная разработка
 * @author Artyom Pryanishnikov <Pryanishnikovartem@gmail.com>
 * @copyright 2025 Artyom Pryanishnikov
 * @license PolyForm-Shield-1.0.0
 * 
 * INITIATIVE DEVELOPMENT: Created independently, without TZ or direct order.
 * IP rights remain with the Author. Commercial use requires agreement.
 * Contact: Pryanishnikovartem@gmail.com
 */

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
