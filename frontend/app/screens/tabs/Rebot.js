import { useRebot } from "../../hooks/rebot-service";
import RebotChatInterface from "../RebotChatInterface";
import RebotWelcome from "../RebotWelcome";


export default function Rebot() {

    const { isChatStarted } = useRebot();

    return (
        isChatStarted ? <RebotChatInterface /> :
        <RebotWelcome />
    );
}
