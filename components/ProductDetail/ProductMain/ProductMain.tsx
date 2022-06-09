import styles from './ProductMain.module.scss'
import H2 from "../../../ui-kit/H2/H2";
import {ProductDetailModel} from "../../../types/product";
import {FC, useState} from "react";
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";

interface ProductMainProps {
    product: ProductDetailModel
}

const ProductMain: FC<ProductMainProps> = ({ product }) => {
    const [currentExample, setCurrentExample] = useState('');

    const openModal = (image: string) => () => setCurrentExample(image);
    const closeModal = () => setCurrentExample('');

    return (
        <div className={styles.container}>
            <div className={styles.characteristics} id='characteristics'>
                {Object.entries(product.characteristics).map(entry =>
                    <div key={entry[0]}>
                        <span>{entry[0]}</span>
                        <span>{entry[1]}</span>
                    </div>
                )}
            </div>
            <div className={styles.block}>
                <H2 text='Комплектация' className={styles.h2} />
                <ul className={styles.equipments}>
                    {product?.equipments.map((el, index) =>
                        <li key={index}>{el}</li>
                    )}
                </ul>
            </div>
            {product.examples.length ?
                <div className={styles.block}>
                    <H2 text='Примеры работ' className={styles.h2} />
                    <div className={styles.examples}>
                        {product.examples.map(example =>
                            <div className={styles.example} onClick={openModal(example.bigImage)} key={example.id}>
                                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${example.smallImage}`} />
                            </div>
                        )}
                    </div>
                    <CustomModal open={Boolean(currentExample)} onClose={closeModal} isBigContent={true}>
                            <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${currentExample}`}
                                 className={styles.bigExample} />
                    </CustomModal>
                </div> : ''
            }
            <div className={styles.block}>
                <H2 text='Сервис' className={styles.h2} />
                <div className={styles.characteristics}>
                    <div>
                        <span>Диагностика</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Дополнительная диагностика (расширенная) электро-компонентов</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Чистка и смазка направляющих</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Чистка и смазка ШВП</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Замена шпинделя</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Замена шагового драйвера на идентичный</span>
                        <span>1500 руб.</span>
                    </div>
                    <div>
                        <span>Замена концевого датчика без проводки в кабель-канал</span>
                        <span>1500 руб.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductMain;