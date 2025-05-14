'use client';
import styles from "./page.module.css";
import dynamic from 'next/dynamic';
import TerminalDisp from "./terminal";

const Terminal = dynamic(() => import('./terminal'), {
    ssr: false,
  }
);

export default function Home() {
   return (
    <div className={styles.page}>
      <Terminal />
    </div>
  );
}
