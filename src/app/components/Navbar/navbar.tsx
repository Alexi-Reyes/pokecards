import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <Link href="/">
                <button className={[styles["nav-button"], styles["home-button"]].join(" ")}>Home</button>
            </Link>
            <Link href="/Boosters">
                <button className={[styles["nav-button"], styles["boosters-button"]].join(" ")}>Boosters</button>
            </Link>
            <Link href="/Collection/0">
                <button className={[styles["nav-button"], styles["collection-button"]].join(" ")}>Collection</button>
            </Link>
        </div>
    );
}