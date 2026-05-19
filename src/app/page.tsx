import styles from './page.module.css';
import Navbar from './components/Navbar/navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles['banner']}>Pokecards</div>
    </>
  );
}
