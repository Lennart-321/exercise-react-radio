import { useEffect, useState } from "react";

export interface IProgram {
    id: number;
    name: string;
    start: number;
    end: number;
}
interface IDetails {
    broadcastInfo: string;
    programPage: string;
}

export default function Program({ program, isPlaying }: { program: IProgram; isPlaying: boolean }) {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [details, setDetails] = useState<IDetails>();
    // const [refreshCounter, setRefreshCounter] = useState(0);
    useEffect(() => {
        if (showDetails && !details) {
            fetchDetails(program.id);
            // setRefreshCounter(rc => rc + 1);
        }
    }, [showDetails]);

    console.log("Render Program:", showDetails, details);
    return (
        <p
            onClick={() => {
                console.log("Click:", program.name, program.id, showDetails);
                setShowDetails(sd => !sd);
            }}
            style={isPlaying ? { fontWeight: "bold" } : { fontWeight: "normal" }}
        >
            {toString2(Math.floor(program.start / 60))}.{toString2(program.start % 60)} {program.name}
            {showDetails && details && (
                <>
                    <br />
                    <span>{details.broadcastInfo}</span>{" "}
                    <a href={details.programPage} onClick={e => e.stopPropagation()} target="_blank">
                        Hemsida {program.name}
                    </a>
                </>
            )}
        </p>
    );

    async function fetchDetails(id: number): Promise<void> {
        const response = await fetch(`https://api.sr.se/api/v2/programs/${id}?format=json`);
        const result = await response.json();
        console.log("fetchDetails:", result);
        setDetails({ broadcastInfo: result.program.broadcastinfo, programPage: result.program.programurl });
    }
}

function toString2(t: number) {
    return (t < 10 ? "0" : "") + t.toString();
}
