import CustomSlider from "../../CustomSlider/CustomSlider";
import Slider from "react-slick";
import CustomModal from "../../../ui-kit/CustomModal/CustomModal";
import React, {FC, useState} from "react";
import {ProductImage, ProductVideo} from "../../../types/product";
import styles from './ProductSliders.module.scss'
import cn from "classnames";

interface ProductSliders {
    images: ProductImage[];
    videos: ProductVideo[];
}

const ProductSliders: FC<ProductSliders> = ({ images, videos }) => {
    const [mainSlider, setMainSlider] = useState<Slider>();
    const [navSlider, setNavSlider] = useState<Slider>();
    const [currentImage, setCurrentImage] = useState('');
    const [currentVideo, setCurrentVideo] = useState('');

    const [index, setIndex] = useState(0);
    const [clickable, setClickable] = useState(true);
    const onSliderChange = (newIndex: number) => {
        setIndex(newIndex);
        setClickable(true);
    };

    const openImage = () => {
        if (videos.length > 0) {
            if (index + 1 > videos.length) {
                setCurrentImage(images[index - videos.length].bigImage);
            } else {
                setCurrentVideo(videos[index].url);
            }
        } else {
            setCurrentImage(images[index].bigImage);
        }
    }

    const closeModal = () => {
        setCurrentImage('');
        setCurrentVideo('');
    }

    return (
        <div className={styles.sliders}>
            <CustomSlider
                ref={(slider) => setMainSlider(slider as Slider)}
                asNavFor={navSlider}
                className={styles.mainSlider}
                arrows={true}
                slidesToScroll={1}
                slidesToShow={1}
                fade={true}
                speed={200}
                afterChange={onSliderChange}
                beforeChange={() => setClickable(false)}
                infinite={false}
                responsive={[
                    {
                        breakpoint: 640,
                        settings: {
                            arrows: false
                        },
                    },
                ]}
            >
                {videos.map(video =>
                    <div className={cn(styles.mainSlide, styles.video)} key={video.id} onClick={() => console.log(video.smallPreview)}>
                        <img src={video.mediumPreview} />
                    </div>
                )}
                {images.map((image) =>
                    <div
                        className={styles.mainSlide}
                        key={image.id} data-image={image.bigImage}
                        onClick={() => clickable && openImage()}
                    >
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${image.mediumImage}`} />
                    </div>
                )}
            </CustomSlider>
            <CustomModal open={Boolean(currentVideo)} onClose={closeModal} isBigContent={true}>
                <iframe width="480" height="270" className={styles.iframe}
                        src={`${currentVideo}?from_block=partner&from=zen&autoplay=1&tv=0`}
                        allow="autoplay; fullscreen; accelerometer; gyroscope; picture-in-picture; encrypted-media"
                        frameBorder="0" scrolling="no" allowFullScreen=""
                />
            </CustomModal>
            <CustomModal open={Boolean(currentImage)} onClose={closeModal} isBigContent={true}>
                <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${currentImage}`}
                     className={styles.bigModal} />
            </CustomModal>
            <CustomSlider
                ref={(slider) => setNavSlider(slider as Slider)}
                asNavFor={mainSlider}
                className={styles.navSlider}
                arrows={false}
                slidesToScroll={1}
                slidesToShow={7}
                speed={200}
                focusOnSelect={true}
                infinite={false}
                responsive={[
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 6,
                        },
                    },
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 960,
                        settings: {
                            slidesToShow: 6,
                        },
                    },
                    {
                        breakpoint: 765,
                        settings: {
                            slidesToShow: 5,
                        },
                    },
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 4,
                        },
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                        },
                    },
                ]}
            >
                {videos.map(video =>
                    <div className={styles.navSlide} key={video.id}>
                        <img src={video.smallPreview} />
                    </div>
                )}
                {images.map(image =>
                    <div className={styles.navSlide} key={image.id}>
                        <img src={`${process.env.NEXT_PUBLIC_SERVER_URL}/images/${image.smallImage}`} />
                    </div>
                )}
            </CustomSlider>
        </div>
    );
};

export default ProductSliders;