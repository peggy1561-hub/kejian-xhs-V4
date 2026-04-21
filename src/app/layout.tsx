import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '课件销售小红书内容生成器',
  description: '帮销售原创PPT课件的商家，快速生成吸引老师购买的小红书内容',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='zh-CN'>
      <body>{children}</body>
    </html>
  );
}
