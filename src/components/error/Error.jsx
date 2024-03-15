const Error = ({ errorMessage, children }) => {
    return (
        <div
            className={`max-w-[1050px] w-full h-[80vh] mx-auto text-center flex justify-center items-center`}
        >
            <div>
                <div className="mb-4">{children}</div>
                <p>{errorMessage}</p>
            </div>
        </div>
    );
};

export default Error;
