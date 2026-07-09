import {Route, Routes} from "react-router-dom";
import BoardListPage from "./pages/BoardListPage.jsx";
import BoardCreatePage from "./pages/BoardCreatePage.jsx";
import BoardEditPage from "./pages/BoardEditPage.jsx";
import Header from "./components/Header.jsx";
import {BoardContext} from "./hooks/useBoard.js";
import {createClient} from "@supabase/supabase-js"
import './index.css'
import {useState, useEffect} from 'react'
import { LoginForm } from "./components/login-form.jsx";
import { SignUpForm } from "./components/sign-up-form.jsx";
import { Navigate } from "react-router-dom";
import { supabase } from '@/lib/supabase/client'

// const supabase = createClient(
//     import.meta.env.VITE_SUPABASE_URL,
//     import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
// );

function App() {
    // supabase.auth.signOut({ scope: "local" });
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "게시판을 만들어 봅시다.",
            content: "리액트를 이용해 게시판을 만들어 보도록 합시다.",
            author: "서정민",
            createdAt: "2026.07.07",
            views: 128,
        },
        {
            id: 2,
            title: "컴포넌트 분리",
            content: "하나의 큰 컴포넌트에 모든 코드를 작성하지 않고, 게시글 하나를 보여주는 부분(BoardItem), 게시글 목록을 관리하는 부분(BoardList)처럼 기능에 따라 나누면 코드를 이해하고 수정하기 쉬워집니다.",
            author: "서정민",
            createdAt: "2026.07.07",
            views: 74,
        },
        {
            id: 3,
            title: "리액트 라우터",
            content: "리액트는 기본적으로 SPA(Single Page Application) 방식으로 동작하지만, React Router를 사용하면 URL 경로(path)에 따라 렌더링할 컴포넌트를 변경하여 여러 페이지처럼 동작하는 화면을 구성할 수 있습니다.",
            author: "서정민",
            createdAt: "2026.07.07",
            views: 51,
        },
    ]);

    const handleDeleteBoard = (id) => {
        setBoards((prevBoards) => prevBoards.filter(board => board.id !== id));
    }

    const handleCreateBoard = (newBoard) => {
        const lastId = boards.length === 0 ? 1 : boards[boards.length - 1].id + 1;

        setBoards([...boards, {
            ...newBoard,
            id: lastId,
            category: "일반",
            createdAt: "2026.07.07",
            views: 0,
        }])
    }

    const handleUpdateBoard = (newBoard) => {
        setBoards((prevBoards) =>
            prevBoards.map((board) =>
                board.id === newBoard.id ? {...board, ...newBoard} : board
            )
        );
    }
    
    useEffect(() => {
        supabase.auth.getSession().then(({data}) => {
            setSession(data.session);
            setLoading(false);
        });

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div>
                Loading........
            </div>
        )
    }

    if (!session) {
        return(
            <>
                <Routes>
                    <Route path="/login" element={<LoginForm />}/>
                    <Route path="/sign-up" element={<SignUpForm/>}/>
                    <Route path="*" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </>
        );
    };


    return(
        <>
            <Header/>
            <div className={"min-h-screen bg-slate-50 px-5 pb-16 pt-24 text-slate-900"}>
                <div className={"mx-auto flex w-full max-w-5xl"}>
                    <Routes>
                        <Route path="/" element={<BoardListPage boards={boards} onDelete={handleDeleteBoard}/>}/>
                        <Route
                            path="/boards/new"
                            element={<BoardCreatePage onCreate={handleCreateBoard}/>}
                        />
                        <Route
                            path="/boards/:id/edit"
                            element={<BoardEditPage boards={boards} onUpdate={handleUpdateBoard}/>}
                        />
                        <Route
                            path="/login"
                            element={<Navigate to="/" replace/>}
                        />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App