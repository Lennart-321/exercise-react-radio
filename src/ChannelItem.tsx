import { glbInfo } from "./App";

export class ChannelInfo {
    id;
    name;
    liveUrl;
    scheduleUrl;
    constructor(id: string, name: string, liveUrl: string, scheduleUrl: string) {
        this.id = id;
        this.name = name;
        this.liveUrl = liveUrl;
        this.scheduleUrl = scheduleUrl;
    }
}

export let currentChannel = "";

export default function ChannelItem({ channelInfo }: { channelInfo: ChannelInfo }) {
    return (
        <p
            onClick={() => {
                console.log("Clicked channel", channelInfo.id, channelInfo.name);
                currentChannel = channelInfo.id;
                glbInfo.page = "CHANNEL";
                glbInfo.reload(pc => pc + 1);
            }}
            className="list-item channel-list-item"
        >
            {channelInfo.name}
        </p>
    );
}
