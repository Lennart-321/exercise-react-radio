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
            <h2>Kanalsida {channel?.name}</h2>
            {/* <iframe width={400} height={70} src={channel?.liveUrl}></iframe> */}

            <audio controls src={channel?.liveUrl}></audio>
            <span>Just nu: {currentProgram?.name}</span>
            <ScheduleList channelId={channelId} setCurrentProgram={setCurrentProgram} />
        </>
    );
}
