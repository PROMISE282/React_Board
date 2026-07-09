import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    return (
        <header
            className={"fixed top-0 z-10 w-full border-b border-slate-200/80 bg-white/10 backdrop-blur-xl"}>
            <div className={"mx-auto flex h-16 max-w-5xl items-center justify-between px-5"}>
                <button
                    onClick={() => navigate("/")}
                    className={"cursor-pointer text-lg font-bold text-slate-950"}
                >
                    GBSW 리액트 게시판
                </button>
                <button
                    onClick={() => navigate("/boards/new")}
                    className={"rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"}
                >
                    새 글
                </button>
            </div>
        </header>
    )
}

export default Header
