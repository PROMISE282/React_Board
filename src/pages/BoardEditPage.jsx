import {useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";

const BoardEditPage = ({boards, onUpdate}) => {
    const {id} = useParams();
    const board = boards.find((board) => board.id === Number(id));
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const navigate = useNavigate();

    const onUpdateBtnClick = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const author = authorRef.current.value;

        onUpdate({id: board.id, title, content, author});
        navigate("/")
    }

    if (!board) {
        return (
            <div className={"w-full rounded-lg border border-slate-200 bg-white p-10 text-center shadow-sm"}>
                <h1 className={"text-2xl font-bold text-slate-950"}>게시글을 찾을 수 없습니다.</h1>
                <button
                    onClick={() => navigate("/")}
                    className={"mt-6 h-11 rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-teal-700"}
                >
                    목록으로
                </button>
            </div>
        )
    }

    return (<div className={"w-full"}>
        <div className={"mb-6"}>
            <span className={"text-sm font-semibold text-teal-600"}>Edit</span>
            <h1 className={"mt-2 text-3xl font-bold text-slate-950"}>게시글 수정</h1>
            <p className={"mt-2 text-sm text-slate-500"}>기존 내용을 다듬고 저장하세요.</p>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className={"flex flex-col gap-5"}>
                <label className={"flex flex-col gap-2 text-sm font-semibold text-slate-700"}>
                    제목
                    <input
                        className={"h-11 rounded-md border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"}
                        placeholder={"제목을 입력하세요"}
                        defaultValue={board.title}
                        ref={titleRef}
                    />
                </label>
                <label className={"flex flex-col gap-2 text-sm font-semibold text-slate-700"}>
                    내용
                    <textarea
                        rows={7}
                        className={"resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"}
                        placeholder={"게시글 내용을 입력하세요."}
                        ref={contentRef}
                        defaultValue={board.content}
                    />
                </label>
                <label className={"flex flex-col gap-2 text-sm font-semibold text-slate-700"}>
                    작성자
                    <input
                        className={"h-11 rounded-md border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"}
                        placeholder={"이름을 입력하세요."}
                        ref={authorRef}
                        defaultValue={board.author}
                    />
                </label>
            </div>
        </form>

        <div className={"mt-4 flex justify-end gap-2"}>
            <button
                onClick={() => navigate("/")}
                className={"h-11 rounded-md border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"}
            >
                취소
            </button>
            <button
                onClick={onUpdateBtnClick}
                className={"h-11 rounded-md bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"}
            >
                수정하기
            </button>
        </div>
    </div>)
}

export default BoardEditPage
