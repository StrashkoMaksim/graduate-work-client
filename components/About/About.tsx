import Image from 'next/image'
import styles from './About.module.scss'
import cn from "classnames";
import CustomSlider from "../CustomSlider/CustomSlider";
import Slide1 from '../../public/img/about_slide_1.jpg';
import Slide2 from '../../public/img/about_slide_2.jpg';
import {FC} from "react";

interface AboutProps {
    className?: string;
}

const About: FC<AboutProps> = ({ className }) => {
    return (
        <section className={cn('section', 'grey-bg', styles.section, className)}>
            <div className={cn("container", styles.container)}>
                <div className={styles.text}>
                    <h2>О нас</h2>
                    <p>
                        CNC Solutions с 2009 года поставляет на российский рынок лазерные СО2 станки, лазерные станки по
                        металлу, маркираторы и фрезерные станки с ЧПУ.<br/>
                        <br/>
                        Мы развиваем профессиональный и экспертный сервис, наши склады укомплектованы оригинальными
                        комплектующими, которые в наличии на складе, либо доступны под заказ.
                    </p>
                </div>
                <CustomSlider
                    className={styles.slider}
                    arrows={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    fade={true}
                >
                    <div className={styles.slide}>
                        <Image src={Slide1} alt="Описание слайда"/>
                    </div>
                    <div className={styles.slide}>
                        <Image src={Slide2} alt="Описание слайда"/>
                    </div>
                </CustomSlider>
            </div>
        </section>
    );
};

export default About;