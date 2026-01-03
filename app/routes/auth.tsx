import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter"
import { useLocation, useNavigate } from "react-router";

export const meta = () => ([
    {title: 'ATS Scan AI | Auth'},
    {name: 'description', content:'Log into your account'},
])

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();
    
    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get('next') || '/';

    useEffect(() => {
        // If already authenticated, just redirect to next page
        if (auth.isAuthenticated && !isLoading) {
            navigate(next, { replace: true });
        }
    }, [auth.isAuthenticated, isLoading, next, navigate])

    return (
    <main className="bg-[url('/images/bg.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
            <section className="flex flex-col gap-8 bg-[rgba(22, 33, 62, 0.8)] rounded-2xl p-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1>Welcome</h1>
                    <h2>Log In to Continue Your Job Journey</h2>
                </div>
                <div>
                    {isLoading ? (
                        <button className="auth-button animate-pulse" disabled>
                            <p>Signing you in ...</p>
                        </button>
                    ) : (
                        <button className="auth-button" onClick={auth.signIn}>
                           <p>Log In</p> 
                        </button>
                    )}
                </div>
            </section>
        </div>
    </main>
  )
}

export default auth