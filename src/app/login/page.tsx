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
import { LoginForm } from '@/features/auth/components/LoginForm';

export default function LoginPage() {
	return (
		<AuthPageShell
			title='Войдите в Job Shop'
			description='Продолжайте покупки или управляйте витриной продавца из единой панели. Все данные пока моковые, чтобы быстро проверять UX.'
			footer={
				<p>
					Нет аккаунта?{' '}
					<Link
						href='/register'
						className='font-semibold text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200'>
						Зарегистрируйтесь
					</Link>
				</p>
			}>
			<LoginForm />
		</AuthPageShell>
	);
}
