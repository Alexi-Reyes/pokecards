import styles from './navbar.module.css';
import Link from 'next/link'

export default function About() {
    return (
        <>
            <div className={styles['navbar']}>
                <Link href="/">
                    <button className={[styles['nav-button'], styles['home-button']].join(' ')}>Home</button>
                </Link>
                <Link href="/Boosters">
                    <button className={[styles['nav-button'], styles['boosters-button']].join(' ')}>Boosters</button>
                </Link>
                <Link href="/Collection">
                    <button className={[styles['nav-button'], styles['collection-button']].join(' ')}>Collection</button>
                </Link>
            </div>
        </>
    )
}