import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/navbar";

export default function Home() {
  return (
    <>
        <Navbar></Navbar>
        <div className={styles['banner']}>Pokecards</div>
    </>
  );
}
