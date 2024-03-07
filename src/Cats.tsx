import { useEffect, useState } from "react";
import { IGlobal } from "./App";

export interface ICategory {
    id: number;
    name: string;
}

export let currentCategory: ICategory | undefined;

export default function Cats({ info }: { info: IGlobal }) {
    const [cats, setCats] = useState<ICategory[]>([]);

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <section className="list">
            {cats.map(c => (
                <p
                    key={c.id}
                    onClick={() => {
                        console.log("Clicked category", c.id, c.name);
                        currentCategory = c;
                        info.page = "CATEGORY";
                        info.reload(pc => pc + 1);
                    }}
                    className="list-item category-list-item"
                >
                    {c.name}
                </p>
            ))}
        </section>
    );

    async function loadCategories() {
        const allCategories: ICategory[] = [];
        let url = "http://api.sr.se/api/v2/programcategories?format=json";
        while (url) {
            const response = await fetch(url);
            const result = await response.json();
            result.programcategories.forEach((c: any) => allCategories.push({ id: c.id, name: c.name }));
            url = result.pagination.nextpage;
        }
        setCats(allCategories);
    }
}
