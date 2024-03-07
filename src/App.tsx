import { Dispatch, SetStateAction, ReactElement, useState } from "react";
import ChannelList from "./ChannelList";
import Channel from "./Channel";
import { currentChannel } from "./ChannelItem";
import Cats, { currentCategory } from "./Cats";
import Category from "./Category";
export interface IGlobal {
    page: string;
    reload: Dispatch<SetStateAction<number>>;
}
export const glbInfo: IGlobal = {
    page: "CHANNEL-LIST", //CHANNEL CATEGORY-LIST
    reload: () => {},
};

export function App() {
    const [pageChanges, reload] = useState(0);
    glbInfo.reload = reload;

    console.log("App render page:", glbInfo.page);
    let currentPage: ReactElement;
    switch (glbInfo.page) {
        case "CHANNEL":
            currentPage = <Channel channelId={currentChannel} info={glbInfo} />;
            break;
        case "CATEGORY-LIST":
            currentPage = <Cats info={glbInfo} />;
            break;
        case "CATEGORY":
            currentPage = <Category category={currentCategory} />;
            break;
        default:
            currentPage = <ChannelList info={glbInfo} />;
    }

    return (
        <>
            {" "}
            <nav>
                <a
                    onClick={() => {
                        glbInfo.page = "CHANNEL-LIST";
                        glbInfo.reload(pc => pc + 1);
                    }}
                >
                    Kanallista
                </a>
                <a
                    onClick={() => {
                        glbInfo.page = "CATEGORY-LIST";
                        glbInfo.reload(pc => pc + 1);
                    }}
                >
                    Kategorier
                </a>
            </nav>
            {currentPage}
        </>
    );
}
