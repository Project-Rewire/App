import { useState } from "react";

export function useLogin() {
    const [loggedIn, setLoggedIn] = useState(false);
    return { loggedIn, setLoggedIn };
}