'use client';

import { useEffect, useState } from 'react';
import { AstronautsList, Button, Controls, Costs, PlanetsSelect, Success } from '@design-system';
import { Rocket } from '../../../domain/Rocket';
import { Planet } from '../../../domain/Planet';
import { usePlanets } from '../../../domain/PlanetsAdapter';
import { Astronaut } from '../../../domain/Astronaut';
import { useAstronauts } from '../../../domain/AstronautsAdapter';
import { launch } from '../../../domain/MissionLaunchAdapter';
import { createMissionConfiguratorModel } from './MissionConfiguratorViewModelService';

type Props = {
    rocket: Rocket;
};

export const MissionConfigurator = ({ rocket }: Props) => {
    const [isReadyToLaunch, setIsReadyToLaunch] = useState(false);
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [selected, setSelected] = useState<Planet | undefined>(planets[0]);
    const { getData: fetchPlanets } = usePlanets();
    const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
    const { getData: getAstronauts } = useAstronauts();
    const model = createMissionConfiguratorModel({
        astronauts,
        destination: selected,
        date: new Date(),
    });

    const handleLaunch = async () => {
        const isReady = await launch({
            rocketId: rocket.id,
            planetId: selected!.id,
            astronauts,
        });

        setIsReadyToLaunch(isReady);
    };

    useEffect(() => {
        getAstronauts(rocket.capacity).then((data) => {
            setAstronauts(data);
        });
    }, [rocket.capacity]);

    useEffect(() => {
        fetchPlanets().then(setPlanets);
    }, []);

    useEffect(() => {
        if (!selected) {
            setSelected(planets[0]);
        }
    }, [planets]);

    if (isReadyToLaunch) {
        return <Success data-test="mission-success" />;
    }

    return (
        <>
            <PlanetsSelect
                label="Select destination"
                planets={planets}
                value={selected?.id}
                onChange={setSelected}
                data-test="planet-select"
            />
            {Boolean(astronauts.length) && (
                <AstronautsList
                    label="Available crew members"
                    astronauts={astronauts}
                    data-test="astronauts"
                />
            )}
            {Boolean(model.costs) && (
                <Costs value={model.costs} label="$$$ Estimated costs" data-test="mission-cost" />
            )}
            <Controls>
                <Button disabled={!model.costs} data-test="launch-control" onClick={handleLaunch}>
                    Launch
                </Button>
            </Controls>
        </>
    );
};
