import React, { Dispatch, SetStateAction, ReactElement, useState } from "react";
import ChannelList from "./ChannelList";
import Channel from "./Channel";
import { currentChannel } from "./ChannelItem";
export interface IGlobal {
    page: string;
    reload: Dispatch<SetStateAction<number>>;
}
export const glbInfo: IGlobal = {
    page: "CHANNEL-LIST", //CHANNEL
    reload: () => {},
};

export function App() {
    const [pageChanges, reload] = useState(0);
    glbInfo.reload = reload;

    let currentPage: ReactElement;
    switch (glbInfo.page) {
        case "CHANNEL":
            currentPage = <Channel channelId={currentChannel} info={glbInfo} />;
            break;
        default:
            currentPage = <ChannelList info={glbInfo} />;
    }

    return <>{currentPage}</>;
}
