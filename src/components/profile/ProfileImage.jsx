import { useRef } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import { api } from "../../api";
import { actions } from "../../reducers/actions";
import conf from "../../config/apiConfig";
import { useAuth, useProfile, useAvatar } from "../../hook";

const ProfileImage = () => {
    const fileUploaderRef = useRef();
    const { state, dispatch } = useProfile();
    const { auth } = useAuth();
    const { myAvatar, setMyAvatar } = useAvatar();
    const logedInUser = state?.user?.id === auth?.user?.id;

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener("change", updateProfileImage);
        fileUploaderRef.current.click();
    };

    const updateProfileImage = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        try {
            const formData = new FormData();

            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.post(
                `${conf.baseURL}/profile/avatar`,
                formData
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    payload: response.data.user,
                });

                setMyAvatar(response.data.user.avatar);
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            {state?.user?.avatar === null ? (
                <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full overflow-hidden object-cover bg-center">
                    <span className="">
                        {state?.user?.firstName[0].toUpperCase()}
                    </span>
                </div>
            ) : (
                <div className="w-full h-full text-white grid place-items-center text-5xl rounded-full overflow-hidden object-cover bg-center">
                    <img
                        className="w-full h-full"
                        src={`${conf.baseURL}/uploads/avatar/${state?.user?.avatar}`}
                        alt={state?.user?.firstName}
                    />
                </div>
            )}

            <form
                id="form"
                encType="multipart/form-data"
                className={`${logedInUser ? "block" : "hidden"}`}
            >
                <button
                    onClick={handleImageUpload}
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
        </div>
    );
};

export default ProfileImage;
