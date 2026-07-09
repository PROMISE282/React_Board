import {useNavigate} from "react-router-dom";

const BoardItem = ({board, onDelete}) => {
    const navigate = useNavigate();

    const onDeleteBtnClick = () => {
        if (confirm("진짜 삭제할까요?")) {
            onDelete(board.id)
            navigate("/")
        }
    }

    return (
        <article
            className={"rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"}>
            <div className={"flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"}>
                <div className={"min-w-0"}>
                    <div className={"flex flex-wrap items-center gap-2"}>
                        <span className={"text-xs text-slate-400"}>{board.createdAt ?? "방금 전"}</span>
                    </div>
                    <h2 className={"mt-3 text-xl font-bold text-slate-950"}>{board.title}</h2>
                    <p className={"mt-3 line-clamp-2 text-sm leading-6 text-slate-600"}>{board.content}</p>
                </div>

                <div className={"flex shrink-0 items-center gap-2 sm:pt-1"}>
                    <button
                        onClick={() => navigate(`/boards/${board.id}/edit`)}
                        className={"h-9 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"}
                    >
                        수정
                    </button>

                    <button
                        onClick={onDeleteBtnClick}
                        className={"h-9 rounded-md border border-red-100 px-4 text-sm font-semibold text-red-600 transition hover:border-red-200 hover:bg-red-50"}
                    >
                        삭제
                    </button>
                </div>
            </div>

            <div
                className={"mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm text-slate-500"}>
                <span>작성자 {board.author}</span>
                <span>조회 {board.views ?? 0}</span>
            </div>
        </article>
    )
}

export default BoardItem
