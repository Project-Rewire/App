import { useState } from "react";

export function useLogin() {
    const [loggedIn, setLoggedIn] = useState(true);
    return { loggedIn, setLoggedIn };
}