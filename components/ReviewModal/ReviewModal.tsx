import {FC} from "react";
import {Review} from "../../types/review";
import CustomModal from "../../ui-kit/CustomModal/CustomModal";

interface ReviewModalProps {
    review: Review
}

const ReviewModal: FC<ReviewModalProps> = ({ review }) => {
    return (
        <>
            <span></span>
        </>
    );
};

export default ReviewModal;