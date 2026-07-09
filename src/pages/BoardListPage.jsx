import BoardItem from "../components/BoardItem.jsx";
import {useNavigate} from "react-router-dom";

const BoardListPage = ({boards, onDelete}) => {
    const navigate = useNavigate();

    return (
        <div className={"flex w-full flex-col gap-6"}>
            <section className={"flex flex-col justify-between gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end"}>
                <div>
                    <span className={"text-sm font-semibold text-teal-600"}>GBSW Board</span>
                    <h1 className={"mt-2 text-3xl font-bold text-slate-950"}>게시글 목록</h1>
                    <p className={"mt-2 text-sm text-slate-500"}>
                        React 컴포넌트와 상태 관리를 연습하는 미니 게시판입니다.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/boards/new")}
                    className={"h-11 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"}
                >
                    글 작성
                </button>
            </section>

            <div className={"grid gap-4"}>
                {boards.length === 0 && (
                    <div className={"rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500"}>
                        아직 게시글이 없습니다.
                    </div>
                )}

            {boards.map(board => (
                <BoardItem key={board.id} board={board} onDelete={onDelete}/>
            ))}
            </div>
        </div>
    )
}

export default BoardListPage
