import type { Metadata } from 'next';
import StyledComponentsRegistry from './registry';

export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'Gerenciador de tarefas',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}