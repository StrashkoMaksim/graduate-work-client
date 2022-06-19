import styles from './Buyers.module.scss'
import cn from "classnames";

const Buyers = () => {
    return (
        <div className='section'>
            <div className={cn('container', styles.container)}>
                <div className={styles.wrapper}>
                    <h2 className={styles.header}>Действующие законы</h2>
                    <div className={styles.grid}>
                        <ul className={styles.ul}>
                            <li>
                                <a target="_blank" href="http://www.consultant.ru/document/cons_doc_LAW_28399/">Конституция Российской
                                    Федерации</a>
                            </li>
                        </ul>
                        <ul className={styles.ul}>
                            <li>
                                <a target="_blank" href="http://www.consultant.ru/document/cons_doc_LAW_305">Закон РФ от
                                    07.02.1992 N 2300-1 «О защите прав потребителей»</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.wrapper}>
                    <h2 className={styles.header}>Внутренние документы</h2>
                    <div className={styles.grid}>
                        <ul className={styles.ul}>
                            <li>
                                <a target="_blank" href="http://www.consultant.ru/document/cons_doc_LAW_28399/">
                                    Политика в отношении обработки персональных данных
                                </a>
                            </li>
                        </ul>
                        <ul className={styles.ul}>
                            <li className={styles.pdf}>
                                <a target="_blank" href="/upload/patient/388.pdf">
                                    Свидетельство о постановке на учет в налоговый орган 529,82 кб
                                    <span>1022,89 кб</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Buyers;