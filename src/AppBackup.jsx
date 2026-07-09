// import {Route, Routes} from "react-router-dom";
// import BoardListPage from "./pages/BoardListPage.jsx";
// import BoardCreatePage from "./pages/BoardCreatePage.jsx";
// import BoardEditPage from "./pages/BoardEditPage.jsx";
// import Header from "./components/Header.jsx";
// import {BoardContext} from "./hooks/useBoard.js";
import {createClient} from "@supabase/supabase-js"
import './index.css'
import {useState, useEffect} from 'react'

function App() {
    const supabase = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    );

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [claims, setClaims] = useState(null)

  // Check URL params on initial render
        const params = new URLSearchParams(window.location.search)
        const hasTokenHash = params.get('token_hash')

    const [verifying, setVerifying] = useState(!!hasTokenHash)
    const [authError, setAuthError] = useState(null)
    const [authSuccess, setAuthSuccess] = useState(false)

    useEffect(() => {
        // Check if we have token_hash in URL (magic link callback)
        const params = new URLSearchParams(window.location.search)
        const token_hash = params.get('token_hash')
        const type = params.get('type')

        if (token_hash) {
        // Verify the OTP token
        supabase.auth
            .verifyOtp({
            token_hash,
            type: type || 'email',
            })
            .then(({ error }) => {
            if (error) {
                setAuthError(error.message)
            } else {
                setAuthSuccess(true)
                // Clear URL params
                window.history.replaceState({}, document.title, '/')
            }
            setVerifying(false)
            })
        }

        // Check for existing session using getClaims
        supabase.auth.getClaims().then(({ data: { claims } }) => {
        setClaims(claims)
        })

        // Listen for auth changes
        const {
        data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
        supabase.auth.getClaims().then(({ data: { claims } }) => {
            setClaims(claims)
        })
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: window.location.origin,
        },
        })
        if (error) {
        alert(error.error_description || error.message)
        } else {
        alert('Check your email for the login link!')
        }
        setLoading(false)
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setClaims(null)
    }

    // Show verification state
    if (verifying) {
        return (
        <div>
            <h1>Authentication</h1>
            <p>Confirming your magic link...</p>
            <p>Loading...</p>
        </div>
        )
    }

    // Show auth error
    if (authError) {
        return (
        <div>
            <h1>Authentication</h1>
            <p>✗ Authentication failed</p>
            <p>{authError}</p>
            <button
            onClick={() => {
                setAuthError(null)
                window.history.replaceState({}, document.title, '/')
            }}
            >
            Return to login
            </button>
        </div>
        )
    }

    // Show auth success (briefly before claims load)
    if (authSuccess && !claims) {
        return (
        <div>
            <h1>Authentication</h1>
            <p>✓ Authentication successful!</p>
            <p>Loading your account...</p>
        </div>
        )
    }

    // If user is logged in, show welcome screen
    if (claims) {
        return (
        <div>
            <h1>Welcome!</h1>
            <p>You are logged in as: {claims.email}</p>
            <button onClick={handleLogout}>Sign Out</button>
        </div>
        )
    }

    // Show login form
    return (
        <div>
        <h1>Supabase + React</h1>
        <p>Sign in via magic link with your email below</p>
        <form onSubmit={handleLogin}>
            <input
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading}>
            {loading ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
        </form>
        </div>
    )

    // const [boards, setBoards] = useState([
    //     {
    //         id: 1,
    //         title: "게시판을 만들어 봅시다.",
    //         content: "리액트를 이용해 게시판을 만들어 보도록 합시다.",
    //         author: "서정민",
    //         createdAt: "2026.07.07",
    //         views: 128,
    //     },
    //     {
    //         id: 2,
    //         title: "컴포넌트 분리",
    //         content: "하나의 큰 컴포넌트에 모든 코드를 작성하지 않고, 게시글 하나를 보여주는 부분(BoardItem), 게시글 목록을 관리하는 부분(BoardList)처럼 기능에 따라 나누면 코드를 이해하고 수정하기 쉬워집니다.",
    //         author: "서정민",
    //         createdAt: "2026.07.07",
    //         views: 74,
    //     },
    //     {
    //         id: 3,
    //         title: "리액트 라우터",
    //         content: "리액트는 기본적으로 SPA(Single Page Application) 방식으로 동작하지만, React Router를 사용하면 URL 경로(path)에 따라 렌더링할 컴포넌트를 변경하여 여러 페이지처럼 동작하는 화면을 구성할 수 있습니다.",
    //         author: "서정민",
    //         createdAt: "2026.07.07",
    //         views: 51,
    //     },
    // ]);

    // const handleDeleteBoard = (id) => {
    //     setBoards((prevBoards) => prevBoards.filter(board => board.id !== id));
    // }

    // const handleCreateBoard = (newBoard) => {
    //     const lastId = boards.length > 0 ? 1 : boards[boards.length - 1].id + 1;

    //     setBoards([...boards, {
    //         ...newBoard,
    //         id: lastId + 1,
    //         category: "일반",
    //         createdAt: "2026.07.07",
    //         views: 0,
    //     }])
    // }

    // const handleUpdateBoard = (newBoard) => {
    //     setBoards((prevBoards) =>
    //         prevBoards.map((board) =>
    //             board.id === newBoard.id ? {...board, ...newBoard} : board
    //         )
    //     );
    // }

    // return (
    //     <>
    //         <Header></Header>
    //         <div className={"min-h-screen bg-slate-50 px-5 pb-16 pt-24 text-slate-900"}>
    //             <div className={"mx-auto flex w-full max-w-5xl"}>
    //                 <Routes>
    //                     <Route path="/" element={<BoardListPage boards={boards} onDelete={handleDeleteBoard}/>}/>
    //                     <Route
    //                         path="/boards/new"
    //                         element={<BoardCreatePage onCreate={handleCreateBoard}/>}
    //                     />
    //                     <Route
    //                         path="/boards/:id/edit"
    //                         element={<BoardEditPage boards={boards} onUpdate={handleUpdateBoard}/>}
    //                     />
    //                 </Routes>
    //             </div>
    //         </div>
    //     </>
    // )
}

export default App
