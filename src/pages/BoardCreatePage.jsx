import {useRef} from "react";
import {useNavigate} from "react-router-dom";

const BoardCreatePage = ({onCreate}) => {
    const titleRef = useRef();
    const contentRef = useRef();
    const authorRef = useRef();
    const navigate = useNavigate();

    const onCreateBtnClick = () => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        const author = authorRef.current.value;

        onCreate({title, content, author});

        navigate("/")
    }
    return (<div className={"w-full"}>
        <div className={"mb-6"}>
            <span className={"text-sm font-semibold text-teal-600"}>Create</span>
            <h1 className={"mt-2 text-3xl font-bold text-slate-950"}>새 게시글 작성</h1>
            <p className={"mt-2 text-sm text-slate-500"}>제목, 내용, 작성자를 입력해 게시글을 등록하세요.</p>
        </div>

        <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className={"flex flex-col gap-5"}>
                <label className={"flex flex-col gap-2 text-sm font-semibold text-slate-700"}>
                    제목
                    <input
                        className={"h-11 rounded-md border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"}
                        placeholder={"제목을 입력하세요."}
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
                    />
                </label>
                <label className={"flex flex-col gap-2 text-sm font-semibold text-slate-700"}>
                    작성자
                    <input
                        className={"h-11 rounded-md border border-slate-200 bg-white px-4 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-teal-400 focus:ring-4 focus:ring-teal-100"}
                        placeholder={"이름을 입력하세요."}
                        ref={authorRef}
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
                onClick={onCreateBtnClick}
                className={"h-11 rounded-md bg-teal-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"}
            >
                작성하기
            </button>
        </div>
    </div>)
}

export default BoardCreatePage
