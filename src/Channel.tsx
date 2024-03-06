import { useState } from "react";
import { IGlobal } from "./App";
import { getChannel } from "./ChannelList";
import { IProgram } from "./Program";
import ScheduleList from "./ScheduleList";

export default function Channel({ channelId, info }: { channelId: string; info: IGlobal }) {
    const channel = getChannel(channelId);

    const [currentProgram, setCurrentProgram] = useState<IProgram>();

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
            {/* <iframe width={400} height={70} src={channel?.liveUrl}></iframe> */}

            <audio controls src={channel?.liveUrl}></audio>
            <span>Just nu: {currentProgram?.name}</span>
            <ScheduleList channelId={channelId} setCurrentProgram={setCurrentProgram} />
        </>
    );
}
