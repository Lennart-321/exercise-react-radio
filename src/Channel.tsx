import { IGlobal } from "./App";
import { getChannel } from "./ChannelList";

export default function Channel({ channelId, info }: { channelId: string; info: IGlobal }) {
    const channel = getChannel(channelId);

    return (
        <>
            <p>Kanalsida {channel?.name}</p>
            <button
                onClick={() => {
                    info.page = "CHANNEL-LIST";
                    info.reload(pc => pc + 1);
                }}
            >
                Kanallista
            </button>
        </>
    );
}
