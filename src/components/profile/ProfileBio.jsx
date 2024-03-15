import { useEffect, useState } from "react";
import { useProfile } from "../../hook/useProfile";
import EditIcon from "../../assets/icons/edit.svg";
import CheckIcon from "../../assets/icons/check.svg";
import useAxiosInterceptor from "../../hook/useAxiosInterceptor";
import { actions } from "../../reducers/actions";
import conf from "../../config/apiConfig";
import { IoCloseOutline } from "react-icons/io5";
import { useAuth } from "../../hook/useAuth";

const ProfileBio = () => {
    const { api } = useAxiosInterceptor();
    const { state, dispatch } = useProfile();
    const { auth } = useAuth();

    const logedInUser = state?.user?.id === auth?.user?.id;

    const [bio, setBio] = useState(state?.user?.bio);

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setBio(state?.user?.bio);
    }, [state?.user?.bio]);

    const handleEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await api.patch(`${conf.baseURL}/profile`, {
                bio,
            });

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    payload: response.data.user,
                });
            }
            setEditMode(false);
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {state?.user?.bio}
                    </p>
                ) : (
                    <textarea
                        className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                        value={bio}
                        rows={4}
                        cols={55}
                        onChange={(e) => setBio(e.target.value)}
                    />
                )}
            </div>

            {!editMode ? (
                <button
                    onClick={() => setEditMode(true)}
                    className={`flex-center h-7 w-7 rounded-full ${
                        logedInUser ? "block" : "hidden"
                    }`}
                >
                    <img src={EditIcon} alt="Edit" />
                </button>
            ) : (
                <button
                    onClick={handleEdit}
                    className="flex-center h-7 w-7 rounded-full"
                >
                    <img src={CheckIcon} alt="Edit" />
                    <IoCloseOutline
                        className="mt-2"
                        size={26}
                        onClick={() => setEditMode(false)}
                    />
                </button>
            )}
        </div>
    );
};

export default ProfileBio;
