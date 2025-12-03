#!/usr/bin/env node

/**
 * Скрипт для добавления copyright headers в файлы проекта
 * Запуск: npm run copyright:add
 * Или: npx tsx scripts/add-copyright.ts
 */

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const COPYRIGHT_TS = `/**
 * @fileoverview Job Shop — Initiative Development / Инициативная разработка
 * @author Artyom Pryanishnikov <Pryanishnikovartem@gmail.com>
 * @copyright 2025 Artyom Pryanishnikov
 * @license PolyForm-Shield-1.0.0
 * 
 * INITIATIVE DEVELOPMENT: Created independently, without TZ or direct order.
 * IP rights remain with the Author. Commercial use requires agreement.
 * Contact: Pryanishnikovartem@gmail.com
 */

`;

const COPYRIGHT_TSX = `/**
 * @fileoverview Job Shop — Initiative Development / Инициативная разработка
 * @author Artyom Pryanishnikov <Pryanishnikovartem@gmail.com>
 * @copyright 2025 Artyom Pryanishnikov
 * @license PolyForm-Shield-1.0.0
 * 
 * INITIATIVE DEVELOPMENT: Created independently, without TZ or direct order.
 * IP rights remain with the Author. Commercial use requires agreement.
 * Contact: Pryanishnikovartem@gmail.com
 */

`;

const EXTENSIONS: Record<string, string> = {
  '.ts': COPYRIGHT_TS,
  '.tsx': COPYRIGHT_TSX,
  '.js': COPYRIGHT_TS,
  '.jsx': COPYRIGHT_TSX,
};

const IGNORE_DIRS = [
  'node_modules',
  '.next',
  'dist',
  'build',
  '.git',
  '.turbo',
  '.vercel',
  'coverage',
  '.cache',
];

const IGNORE_FILES = [
  '*.d.ts',
  '*.config.*',
  'next-env.d.ts',
  '*.test.ts',
  '*.test.tsx',
  '*.spec.ts',
  '*.spec.tsx',
];

async function* walk(dir: string): AsyncGenerator<string> {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const path = join(dir, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.includes(entry.name) && !entry.name.startsWith('.')) {
          yield* walk(path);
        }
      } else {
        yield path;
      }
    }
  } catch (error) {
    // Игнорируем ошибки доступа к директориям
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
      console.warn(`⚠️  Warning: ${dir} - ${(error as Error).message}`);
    }
  }
}

function shouldIgnore(filename: string): boolean {
  return IGNORE_FILES.some((pattern) => {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'));
    return regex.test(filename);
  });
}

async function addCopyright(filePath: string): Promise<boolean> {
  const ext = extname(filePath);
  const header = EXTENSIONS[ext];

  if (!header) return false;
  if (shouldIgnore(filePath)) return false;

  try {
    const content = await readFile(filePath, 'utf-8');

    // Уже есть copyright
    if (
      content.includes('@copyright') ||
      content.includes('Copyright') ||
      content.includes('INITIATIVE DEVELOPMENT')
    ) {
      return false;
    }

    // Для TS/TSX/JS/JSX: вставляем в начало
    const newContent = header + content;
    await writeFile(filePath, newContent, 'utf-8');
    return true;
  } catch (error) {
    console.warn(`⚠️  Error processing ${filePath}: ${(error as Error).message}`);
    return false;
  }
}

async function main() {
  console.log('🔒 Adding copyright headers...\n');

  let added = 0;
  let skipped = 0;

  // Обрабатываем директорию src
  for await (const file of walk('src')) {
    if (await addCopyright(file)) {
      console.log(`✅ ${file}`);
      added++;
    } else {
      skipped++;
    }
  }

  console.log(`\n📊 Done: ${added} files updated, ${skipped} skipped`);
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

