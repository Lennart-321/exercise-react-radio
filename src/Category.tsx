import { useEffect, useState } from "react";
import { ICategory } from "./Cats";

interface IProgramInfo {
    id: number;
    name: string;
    description: string;
    channelId: number;
    channelName: string;
    broadcastInfo: string | undefined;
}

export default function Category({ category }: { category: ICategory | undefined }) {
    const [programs, setPrograms] = useState<IProgramInfo[]>();
    const [playingEpisode, setPlayingEpisode] = useState<any>();
    useEffect(() => {
        loadPrograms();
    }, []);

    console.log(
        "Avsnitt:",
        playingEpisode?.listenpodfile,
        playingEpisode?.listenpodfile?.url,
        playingEpisode?.program.id
    );

    return (
        <>
            <h2>Kategori {category!.name}</h2>
            <section className="list">
                {programs?.map(p => (
                    <p key={p.id} className="list-item">
                        <span className="program-name">{p.name}</span> <span>{p.description}</span>{" "}
                        <span>{p.channelName[0] === "[" ? "" : p.channelName}</span> <span>{p.broadcastInfo}</span>
                        {playingEpisode?.program.id === p.id ? (
                            <>
                                <br />
                                <span className="episode-title">{playingEpisode.title}</span>
                                <br />
                                <audio src={playingEpisode.listenpodfile.url} autoPlay controls></audio>
                                <button
                                    onClick={() => {
                                        setPlayingEpisode(undefined);
                                    }}
                                >
                                    Sluta lyssna
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    playEpisode(p.id);
                                }}
                            >
                                Spela senaste
                            </button>
                        )}
                    </p>
                ))}
            </section>
        </>
    );

    async function loadPrograms() {
        const allPrograms: IProgramInfo[] = [];
        let url = `http://api.sr.se/api/v2/programs?format=json&programcategoryid=${category.id}`;
        while (url) {
            const response = await fetch(url);
            const result = await response.json();
            result.programs.forEach(p =>
                allPrograms.push({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    channelId: p.channel.id,
                    channelName: p.channel.name,
                    broadcastInfo: p.broadcastinfo,
                })
            );
            url = result.pagination.nextpage;
        }
        setPrograms(allPrograms);
    }

    async function playEpisode(programId: number) {
        const latestEpisode = await getLatestEpisode(programId);
        setPlayingEpisode(latestEpisode);
    }
}

async function getLatestEpisode(programId: number): Promise<any> {
    const url = `http://api.sr.se/api/v2/episodes/getlatest?programid=${programId}&format=json`;
    const response = await fetch(url);
    const result = await response.json();
    console.log("Senaste avsnittet:", result.episode);
    return result.episode;
}
