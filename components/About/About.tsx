import Image from 'next/image'
import styles from './About.module.scss'
import cn from "classnames";
import CustomSlider from "../CustomSlider/CustomSlider";
import Slide1 from '../../public/img/about_slide_1.jpg';

const About = () => {
    return (
        <section className={cn('section', 'grey-bg', styles.section)}>
            <div className={cn("container", styles.container)}>
                <div className={styles.text}>
                    <h2>О нас</h2>
                    <p>
                        Тут какое-то красивое описание о компании. Тут какое-то красивое описание о компании.
                        Тут какое-то красивое описание о компании. Тут какое-то красивое описание о компании.
                        <br /> <br />
                        Тут какое-то красивое описание о компании. Тут какое-то красивое описание о компании.
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
                        <img src={Slide1} alt="Описание слайда"/>
                    </div>
                </CustomSlider>
            </div>
        </section>
    );
};

export default About;