import { useEffect, useState } from "react";
import { IGlobal } from "./App";
import { getChannel } from "./ChannelList";
import { IProgram } from "./Program";

export default function Channel({ channelId, info }: { channelId: string; info: IGlobal }) {
    const channel = getChannel(channelId);
    const [programs, setPrograms] = useState<IProgram[]>([]);

    useEffect(() => {
        if (channel?.scheduleUrl) {
            loadSchedule();
        }
    }, []);

    return (
        <>
            <nav>
                <a
                    onClick={() => {
                        info.page = "CHANNEL-LIST";
                        info.reload(pc => pc + 1);
                    }}
                >
                    Kanallista
                </a>
            </nav>

            <p>Kanalsida {channel?.name}</p>
            <iframe width={400} height={70} src={channel?.liveUrl}></iframe>
            <section></section>
        </>
    );

    async function loadSchedule() {
        const url = channel?.scheduleUrl + `&format=json&date=${new Date().toLocaleDateString("sv-SE")}`;
        console.log("Load channel schedule:", url);
        const response = await fetch(url);
        const result = await response.json();
        console.log(
            "Schedule loaded:",
            //result,
            result.schedule[0],
            result.schedule[0].starttimeutc,
            typeof result.schedule[0].starttimeutc,
            Date.parse(result.schedule[0].starttimeutc)
        );
        //result.schedule.map();
    }
}
