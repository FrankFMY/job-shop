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

import { CatalogExplorer } from '@/features/catalog';
import { AuthActions } from '@/features/auth';

const featuredCategories = [
	'Электроника',
	'Одежда',
	'Дом и интерьер',
	'Спорт и активность',
	'Красота и здоровье',
	'Детские товары',
	'Авто и мото',
	'Строительство и ремонт',
	'Продукты питания',
	'Услуги и сервисы',
];

const heroBenefits = [
	'Мгновенные выплаты и прозрачные комиссии для продавцов',
	'Готовые интеграции с платёжными и складскими сервисами',
	'Инструменты модерации и защиты от мошенничества',
	'Аналитика продаж, маркетинговые кампании и отчётность',
];

const platformMetrics = [
	{ value: '120+', label: 'Проверенных продавцов' },
	{ value: '18k', label: 'Активных покупателей' },
	{ value: '24/7', label: 'Служба поддержки' },
];

const heroHighlights = [
	{ value: '7 дней', label: 'до запуска продавца' },
	{ value: '0%', label: 'комиссия на старте' },
	{ value: '1 200+', label: 'SKU в тестовом каталоге' },
	{ value: '24 часа', label: 'поддержка для продавцов' },
	{ value: '8 из 10', label: 'оценка удовлетворённости' },
	{ value: '5 минут', label: 'на модерацию товара' },
];

export default function Home() {
	return (
		<div className='min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100/60 font-sans dark:from-black dark:via-zinc-950 dark:to-zinc-900/80'>
			<main className='mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-16 sm:px-8 md:gap-16 md:px-12 lg:px-16'>
				<header className='flex flex-col gap-6 rounded-3xl border border-zinc-200/40 bg-linear-to-r from-white/70 via-white/40 to-white/10 p-5 shadow-lg backdrop-blur-lg dark:border-zinc-800/40 dark:from-zinc-900/80 dark:via-zinc-900/70 dark:to-zinc-900/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8'>
					<div className='flex items-center gap-3'>
						<Link
							href='/'
							className='inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600/20 dark:bg-emerald-500/20 dark:text-emerald-200'>
							<span className='inline-flex size-2 rounded-full bg-emerald-500' />
							Job Shop
						</Link>
						<p className='text-sm text-zinc-500 dark:text-зinc-400'>
							Маркетплейс с моковыми данными для прототипирования
							UX.
						</p>
					</div>
					<AuthActions />
				</header>
				<section className='grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'>
					<div className='flex h-full flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/85 p-8 pb-7 shadow-lg backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/65'>
						<span className='inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'>
							Маркетплейс нового поколения
						</span>
						<h1 className='max-w-3xl text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl lg:leading-tight dark:text-zinc-50'>
							Публикуйте товары, управляйте продажами и получайте
							комиссии в одном месте
						</h1>
						<p className='max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300/90'>
							Job Shop объединяет продавцов, покупателей и
							партнёров в единой платформе. Быстрый старт,
							прозрачные комиссии, аналитика и инструменты роста
							прямо в браузере.
						</p>
						<div className='flex flex-wrap gap-3 pt-1'>
							<a
								href='#catalog'
								className='inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400'>
								Смотреть каталог
							</a>
							<button
								type='button'
								className='inline-flex items-center justify-center rounded-full border border-zinc-200/80 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-emerald-400/60 hover:text-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:border-zinc-700/80 dark:text-zinc-100 dark:hover:text-emerald-300'>
								Стать продавцом
							</button>
						</div>
						<div className='grid gap-3 pt-3 text-sm text-zinc-500 dark:text-zinc-400 sm:grid-cols-2'>
							{heroBenefits.map((benefit) => (
								<div
									key={benefit}
									className='flex min-h-28 items-start gap-3 rounded-2xl border border-zinc-200/40 bg-linear-to-br from-white/45 via-white/25 to-white/15 p-4 shadow-sm dark:border-zinc-800/50 dark:from-zinc-900/75 dark:via-zinc-900/65 dark:to-zinc-900/55'>
									<span className='mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 dark:bg-emerald-500/20'>
										<svg
											className='h-4 w-4 text-emerald-600 dark:text-emerald-300'
											viewBox='0 0 16 16'
											fill='none'
											stroke='currentColor'
											strokeWidth='2'
											strokeLinecap='round'
											strokeLinejoin='round'>
											<path d='M3.5 8.5 6.5 11.5 12.5 4.5' />
										</svg>
									</span>
									<p className='leading-relaxed'>{benefit}</p>
								</div>
							))}
						</div>
						<dl className='mt-auto grid grid-cols-1 gap-2 rounded-2xl border border-zinc-200/50 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-700/50 dark:bg-zinc-900/60 dark:text-zinc-300 sm:grid-cols-2 lg:grid-cols-3'>
							{heroHighlights.map((highlight) => (
								<div
									key={highlight.label}
									className='flex flex-col gap-1 rounded-lg border border-zinc-200/50 bg-white/90 px-3 py-3 text-left shadow-sm dark:border-zinc-700/50 dark:bg-zinc-900/65'>
									<dt className='text-[11px] font-medium uppercase leading-tight text-balance text-zinc-500 dark:text-zinc-400'>
										{highlight.label}
									</dt>
									<dd className='text-base font-semibold text-zinc-900 dark:text-zinc-100'>
										{highlight.value}
									</dd>
								</div>
							))}
						</dl>
					</div>
					<aside className='flex h-full flex-col gap-6'>
						<div className='flex flex-1 flex-col gap-5 rounded-3xl border border-zinc-200/40 bg-linear-to-br from-white/40 via-white/25 to-white/10 p-6 shadow-lg backdrop-blur-lg dark:border-zinc-800/50 dark:from-zinc-900/85 dark:via-zinc-900/70 dark:to-zinc-900/60'>
							<h2 className='text-lg font-semibold text-зinc-900 dark:text-зinc-50'>
								По популярности
							</h2>
							<div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
								{featuredCategories.map((category) => (
									<span
										key={category}
										className='flex min-h-16 w-full items-center justify-center rounded-2xl border border-zinc-200/50 bg-white/60 px-5 py-3 text-center text-sm font-medium text-zinc-600 leading-snug text-balance shadow-sm transition hover:border-emerald-300/60 hover:text-emerald-600 dark:border-zinc-700/60 dark:bg-zinc-900/55 dark:text-zinc-200 dark:hover:border-emerald-500/40 dark:hover:text-emerald-300'>
										{category}
									</span>
								))}
							</div>
						</div>
						<div className='flex flex-1 flex-col gap-4 rounded-3xl border border-zinc-200/60 bg-linear-to-br from-emerald-50 to-white/60 p-6 shadow-lg backdrop-blur-md dark:border-zinc-800/60 dark:from-emerald-500/10 dark:to-zinc-900/60'>
							<h3 className='text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300'>
								Работаем для роста вашего бизнеса
							</h3>
							<p className='text-sm text-zinc-600 dark:text-zinc-300'>
								Работаем с поставщиками по всей России,
								поддерживаем отечественные платёжные шлюзы,
								облака и учитываем закон о самозанятых в логике
								комиссий.
							</p>
							<div className='grid gap-3 sm:grid-cols-3'>
								{platformMetrics.map((metric) => (
									<div
										key={metric.label}
										className='flex flex-col gap-1 rounded-2xl border border-emerald-200/60 bg-white/70 px-4 py-3 text-center dark:border-emerald-500/30 dark:bg-zinc-900/60'>
										<span className='text-lg font-semibold text-emerald-700 dark:text-emerald-300'>
											{metric.value}
										</span>
										<span className='text-xs text-zinc-500 dark:text-zinc-400'>
											{metric.label}
										</span>
									</div>
								))}
							</div>
						</div>
						<div className='flex flex-1 flex-col gap-3 rounded-3xl border border-zinc-200/60 bg-white/75 p-6 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/55'>
							<h3 className='text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400'>
								Быстрый старт на площадке
							</h3>
							<p className='text-sm text-zinc-600 dark:text-zinc-300'>
								Получите персонального онбординг-менеджера,
								готовые шаблоны магазина и чек-листы для первых
								продаж.
							</p>
							<ol className='grid flex-1 gap-3 text-sm text-зinc-600 dark:text-зinc-300 sm:grid-cols-2'>
								{[
									'Создайте каталог за 15 минут с помощью пакетной загрузки',
									'Подключите платёжные шлюзы и доставку по России',
									'Запустите первую акцию и получите подборку лидов',
									'Следите за метриками в панели и получайте советы Growth-команды',
								].map((step) => (
									<li
										key={step}
										className='flex min-h-24 items-center rounded-2xl border border-zinc-200/40 bg-linear-to-br from-white/45 via-white/25 to-white/15 px-4 py-3 text-sm leading-relaxed shadow-sm dark:border-zinc-800/50 dark:from-zinc-900/75 dark:via-zinc-900/65 dark:to-зinc-900/55'>
										{step}
									</li>
								))}
							</ol>
						</div>
					</aside>
				</section>

				<section
					id='catalog'
					className='flex flex-col gap-6 rounded-3xl border border-zinc-200/60 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-zinc-800/60 dark:bg-zinc-900/60'>
					<header className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
						<div className='flex flex-col gap-1.5'>
							<h2 className='text-2xl font-semibold text-zinc-900 dark:text-zinc-50'>
								Каталог товаров
							</h2>
							<p className='text-sm text-zinc-600 dark:text-zinc-400'>
								Актуальные позиции от проверенных продавцов. Все
								данные — моки, чтобы быстро проектировать UX.
							</p>
						</div>
						<span className='inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200'>
							Моковые данные
						</span>
					</header>
					<CatalogExplorer />
				</section>
			</main>
		</div>
	);
}
