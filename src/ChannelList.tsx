import { useEffect, useRef, useState } from "react";
import ChannelItem, { ChannelInfo } from "./ChannelItem";
import { glbInfo } from "./App";

export let allLoadedChannels: ChannelInfo[] = [];
export function getChannel(id: string): ChannelInfo | undefined {
    return allLoadedChannels.find(c => c.id === id);
}
let lastPageLoadedGlb = 0;
let totalPagesGlb = 0;

export default function ChannelList({ info }: { info: any }) {
    const [channelList, setChannelList] = useState<ChannelInfo[]>(allLoadedChannels);
    // const [loadMore, setLoadMore] = useState<boolean>(false);
    const lastPageLoaded = useRef(lastPageLoadedGlb);
    const totalPages = useRef(totalPagesGlb);
    console.log("ChannelList pages", lastPageLoaded, totalPages);

    useEffect(() => {
        fetchChannels();
    }, []);

    return (
        <>
            <section>
                {channelList.map(c => (
                    <ChannelItem key={c.id} channelInfo={c} />
                ))}
            </section>
            {(totalPages.current === 0 || lastPageLoaded.current < totalPages.current) && (
                <button onClick={() => fetchChannels()}>Load More</button>
            )}
        </>
    );

    async function fetchChannels() {
        try {
            console.log("Pages (last total):", lastPageLoaded.current, totalPages.current);
            if (totalPages.current > 0 && lastPageLoaded.current >= totalPages.current) return;

            const response = await fetch(
                `https://api.sr.se/api/v2/channels?format=json&page=${lastPageLoaded.current + 1}`
            );
            // const response = await fetch("https://api.sr.se/api/v2/channels/", {
            //     headers: { Accept: "application/json" },
            // });
            // const xmlText = await response.text();
            // const parser = new DOMParser();
            // const result = parser.parseFromString(xmlText, "text/xml");
            const responseObject = await response.json();
            console.log("fetched json:", responseObject);

            totalPagesGlb = totalPages.current = responseObject.pagination.totalpages;
            lastPageLoadedGlb = lastPageLoaded.current = responseObject.pagination.page;

            const justLoadedChannels = responseObject.channels.map(
                (c: any) => new ChannelInfo(c.id.toString(), c.name, c.liveaudio.url, c.scheduleurl)
            );
            allLoadedChannels = [...channelList, ...justLoadedChannels];

            //const result = [new ChannelInfo("17", "P1"), new ChannelInfo("53", "P2"), new ChannelInfo("210", "P3")];
            //console.log("Channels:", result);
            setChannelList(allLoadedChannels);
        } catch (err) {
            console.log("fetchChannels ERROR:", err);
        }
    }
}
