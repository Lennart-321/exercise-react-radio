import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { getChannel } from "./ChannelList";
import Program, { IProgram } from "./Program";

export default function ScheduleList({
    channelId,
    setCurrentProgram,
}: {
    channelId: string;
    setCurrentProgram: Dispatch<SetStateAction<IProgram | undefined>>;
}) {
    const channel = getChannel(channelId);
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const [forceRerender, setForceRerender] = useState(0);

    useEffect(() => {
        if (channel?.scheduleUrl) {
            loadSchedule();
        }
    }, []);

    const now = new Date();
    const nowMinute = now.getHours() * 60 + now.getMinutes();

    let currentProgram: IProgram | undefined = undefined;
    let untilEnd = -1;
    const jsxResult = (
        <>
            <section>
                {programs.map(p => {
                    const isPlaying = p.start <= nowMinute && nowMinute < p.end;
                    if (isPlaying) {
                        currentProgram = p;
                        untilEnd = (p.end - nowMinute) * 60 - now.getSeconds();
                    }
                    return <Program program={p} isPlaying={isPlaying} />;
                })}
            </section>
        </>
    );

    setCurrentProgram(currentProgram);
    setTimeout(() => setForceRerender(c => c + 1), (untilEnd + 2) * 1000);

    return jsxResult;

    async function loadSchedule() {
        let url = channel?.scheduleUrl + `&format=json&date=${new Date().toLocaleDateString("sv-SE")}`;
        console.log("Load channel schedule:", url);
        const allLoadedPrograms: IProgram[] = [];
        while (true) {
            const response = await fetch(url);
            const result = await response.json();
            // console.log(
            //     "Schedule loaded:",
            //     result,
            //     result.schedule[0],
            //     result.schedule[0].starttimeutc,
            //     typeof result.schedule[0].starttimeutc,
            //     Date.parse(result.schedule[0].starttimeutc)
            // );
            const loadedPrograms = result.schedule.map((p: any) => {
                return {
                    id: p.program.id,
                    name: p.program.name,
                    start: srDateToMinutes(p.starttimeutc),
                    end: srDateToMinutes(p.endtimeutc),
                };
            });
            allLoadedPrograms.push(...loadedPrograms);

            if (!result.pagination.nextpage) break;
            url = result.pagination.nextpage;
        }
        setPrograms(allLoadedPrograms);
        //console.log("Programs:", allLoadedPrograms);
    }
}

function srDateToMinutes(dateStr: string) {
    const numStr = dateStr.replaceAll(/\D+/g, "");
    const date = new Date(Number(numStr));
    const minutes = date.getHours() * 60 + date.getMinutes();
    console.log(dateStr, numStr, date, minutes);
    return minutes;
}
