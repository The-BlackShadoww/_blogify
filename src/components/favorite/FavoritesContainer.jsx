import { useEffect, useState } from "react";
import conf from "../../config/apiConfig";
import { useAxiosInterceptor, useAuth } from "../../hook";
import Loading from "../loading/Loading";
import { Link } from "react-router-dom";

const FavoritesContainer = () => {
    const { api } = useAxiosInterceptor();
    const { auth } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchFavorites = async () => {
        if (auth?.accessToken && !loading) {
            try {
                setLoading(true);
                const response = await api.get(
                    `${conf.baseURL}/blogs/favourites`
                );

                if (!response) {
                    setError("Failed to fetch data");
                }

                if (response.status === 200) {
                    setError("");
                    setFavorites(response.data.blogs);
                }
            } catch (error) {
                // console.log(error)
                setError(`Failed to fetch Your favorites. ${error.message}`);
            } finally {
                setLoading(false);
            }
        } else {
            setError("You are not Currently Logged In");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [auth?.accessToken]);

    let content;
    if (loading) {
        content = <Loading />;
    } else if (error) {
        content = <p>{error}</p>;
    } else {
        content = favorites.map((f) => (
            <li key={f.id}>
                <Link
                    to={`blog-details/${f.id}`}
                    className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                >
                    {f.title}
                </Link>
                <div className="flex">
                    {f.tags?.split(", ").map((t, i) => (
                        <p className="text-slate-600 text-sm mr-1" key={i}>
                            #{t}
                        </p>
                    ))}
                </div>
            </li>
        ));
    }
    return (
        <div className="sidebar-card">
            <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
                Your Favourites ❤️
            </h3>
            <ul className="space-y-5 my-5">{content}</ul>
        </div>
    );
};

export default FavoritesContainer;
