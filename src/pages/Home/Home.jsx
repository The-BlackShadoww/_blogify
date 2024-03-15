import BlogContainer from "../../components/Blog/BlogContainer";
import FavoritesContainer from "../../components/favorite/FavoritesContainer";
import PopularContainer from "../../components/popular/PopularContainer";

const Home = () => {
    return (
        <main>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                        {/* Blog Contents */}
                        <BlogContainer />
                        {/* Sidebar */}
                        <div className="md:col-span-2 h-full w-full space-y-5">
                            <PopularContainer />
                            <FavoritesContainer />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
