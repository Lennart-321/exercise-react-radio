import { glbInfo } from "./App";

export class ChannelInfo {
    id;
    name;
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
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
        >
            {channelInfo.name}
        </p>
    );
}
