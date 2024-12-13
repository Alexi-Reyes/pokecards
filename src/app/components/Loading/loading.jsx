import styles from './loading.module.css';

export default function Loading() {
    return (
        <>
            <div className={styles['div']}>
                <svg className={styles['loader']} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <g fill="#000000">
                        <path d="M10.75 12a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0"/>
                        <path d="M9.353 11.25a2.751 2.751 0 0 1 5.293 0h7.075c-.383-5.034-4.589-9-9.721-9c-5.133 0-9.339 3.966-9.722 9zm5.293 1.5a2.751 2.751 0 0 1-5.293 0H2.278c.383 5.034 4.59 9 9.722 9s9.339-3.966 9.721-9z"/>
                    </g>
                </svg>
            </div>
        </>
    )
}