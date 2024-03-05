export interface IProgram {
    name: string;
    start: number;
    end: number;
}

function toString2(t: number) {
    return (t < 10 ? "0" : "") + t.toString();
}
function parseSrDate(dateStr: string) {
    //dateStr.replace(/)
    //dateStr.split("").reduce((n,l) => l[0].isL )
}

export default function Program({ program }: { program: IProgram }) {
    return (
        <p>
            {toString2(program.start / 60)}.{toString2(program.start % 60)} {program.name}
        </p>
    );
}
