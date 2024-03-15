import DeleteIcon from "../../assets/icons/delete.svg";

const CommentDelete = ({ showDelete }) => {
    return (
        <div
            className={`${
                showDelete ? "absolute right-6 -top-5 block" : "hidden"
            }`}
        >
            <div className="action-modal-container">
                <button className="action-menu-item hover:text-red-500">
                    <img src={DeleteIcon} alt="Delete" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CommentDelete;
