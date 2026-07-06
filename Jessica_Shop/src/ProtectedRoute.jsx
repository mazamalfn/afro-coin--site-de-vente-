import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "./Supabaseclient";

export default function ProtectedRoute({ children }) {
    const [session, setSession] = useState(undefined); // undefined = en cours de vérification

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            setSession(data.session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    if (session === undefined) {
        return <div className="p-8 text-center">Vérification...</div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
}