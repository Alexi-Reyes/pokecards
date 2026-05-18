"use client";

import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type Generation = { name: string };

type SelectorProps = {
    generations: Generation[];
    gen?: string;
};

export default function Selector({ generations, gen }: SelectorProps) {
    const router = useRouter();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === "none") return;
        router.push(`/Collection/${value}`);
    };

    const defaultValue = gen && gen !== "0" ? gen : "none";

    return (
        <select name="generations" id="dropdown-gen" onChange={handleChange} defaultValue={defaultValue}>
            <option value="none">Select Generation</option>
            {generations.map((generation) => (
                <option key={generation.name} value={generation.name}>
                    {generation.name}
                </option>
            ))}
        </select>
    );
}