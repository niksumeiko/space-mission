import { type ChangeEvent, type PropsWithChildren, type ReactNode, useId } from 'react';
import { Arrow } from './svg/Arrow';
import { RocketAnimation } from './svg/RocketAnimation';

const Label = ({ children, htmlFor }: PropsWithChildren<{ htmlFor?: string }>) => (
    <label className="block text-base pb-2" htmlFor={htmlFor}>
        {children}
    </label>
);

export const Badge = ({ children }: PropsWithChildren) => (
    <span className="bg-green-300 lowercase px-4 py-2">{children}</span>
);

export const Rocket = ({
    model,
    states = [],
    children,
}: PropsWithChildren<{
    model: ReactNode;
    states?: ReactNode[];
}>) => {
    return (
        <>
            <div className="mb-3">
                <Label>Available rocket</Label>
                <div className="bg-sky-200 relative px-5 py-4">
                    <span className="font-bold text-lg">{model}</span>
                    {states.length && (
                        <div className="absolute" style={{ top: '70%', right: '3%' }}>
                            {states}
                        </div>
                    )}
                </div>
            </div>
            {children}
        </>
    );
};

export const RocketDetail = ({ title, detail }: { title: string; detail: ReactNode }) => (
    <dl className="block text-sky-700">
        <dt className="inline">{title}: </dt>
        <dd className="inline">{detail}</dd>
    </dl>
);

export const PlanetsSelect = ({
    label,
    planets,
    value,
    onChange,
    'data-test': testId,
}: {
    label: string;
    planets: { id: string; name: string; distance_au: number }[];
    value?: string;
    onChange(planet: { id: string; name: string; distance_au: number }): void;
    'data-test'?: string;
}) => {
    const id = useId();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selected = planets.find(({ id }) => id === event.target.value);

        onChange(selected!);
    };

    return (
        <div className="pt-6 pb-4">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <select
                    id={id}
                    onChange={handleChange}
                    data-test={testId}
                    defaultValue={value}
                    className="border border-gray-500 block w-full p-2.5 pl-5 text-lg appearance-none"
                >
                    {planets.map((planet) => (
                        <option key={planet.id} value={planet.id}>
                            {planet.name}
                        </option>
                    ))}
                </select>
                <Arrow />
            </div>
        </div>
    );
};

export const AstronautsList = ({
    astronauts,
    label,
    'data-test': testId,
}: {
    astronauts: { name: string; avatar: string }[];
    label: string;
    'data-test'?: string;
}) => {
    return (
        <div className="pt-6 pb-4">
            <Label>{label}</Label>
            <ul>
                {astronauts.map((astronaut) => (
                    <li data-test={testId} key={astronaut.name + astronaut.avatar}>
                        <img
                            className="mr-2 w-12 h-12 rounded-full float-left"
                            src={astronaut.avatar}
                            alt={astronaut.name}
                        />
                    </li>
                ))}
            </ul>
            <div className="clear-both" />
        </div>
    );
};

export const Costs = ({
    label,
    value,
    'data-test': testId,
}: {
    label: string;
    value: number;
    'data-test': string;
}) => {
    return (
        <div className="pt-6 pb-4">
            <Label>{label}</Label>
            <div>
                <span
                    data-test={testId}
                    className="pb-1 pr-6 pl-2 border-double border-b-4 border-green-400"
                >
                    {value} USD
                </span>
            </div>
        </div>
    );
};

export const Controls = ({ children }: PropsWithChildren) => (
    <div className="pt-6 pb-4 text-center">{children}</div>
);

export const Button = ({
    children,
    disabled,
    onClick,
    'data-test': testId,
}: PropsWithChildren<{
    disabled?: boolean;
    onClick?(): void;
    'data-test'?: string;
}>) => (
    <button
        disabled={disabled}
        data-test={testId}
        onClick={onClick}
        className="border-[1px] py-1.5 px-8 border-blue-500 text-blue-700 font-semibold disabled:bg-gray-100 disabled:opacity-75 disabled:text-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
    >
        {children}
    </button>
);

export const Success = ({ 'data-test': testId }: { 'data-test'?: string }) => {
    return (
        <div
            data-test={testId}
            className="fixed top-0 left-0 right-0 bottom-0 background-solid flex justify-center items-end"
        >
            <div className="success-rocket">
                <RocketAnimation />
            </div>
        </div>
    );
};
