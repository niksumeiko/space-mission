/* eslint-disable react-hooks/rules-of-hooks */
import { Badge, Rocket, RocketDetail } from '@design-system';
import { createLaunchPageModel } from './mission/useCase/launch/LaunchPageViewModelService';
import { MissionConfigurator } from './mission/useCase/launch/MissionConfigurator';
import { useAvailableRocket } from './domain/RocketAdapter';

export default async function Home() {
    const { getData: getAvailableRocket } = await useAvailableRocket();
    const rocket = await getAvailableRocket();
    const model = createLaunchPageModel({ rocket });

    return (
        <main>
            <Rocket
                model={<span data-test="rocket-model">{model.rocket.model}</span>}
                states={[<Badge key="state">{model.rocket.state}</Badge>]}
            >
                <RocketDetail title="Capacity" detail={model.rocket.capacity} />
                <RocketDetail title="Manufacturing year" detail={model.rocket.year} />
                <MissionConfigurator rocket={rocket} />
            </Rocket>
        </main>
    );
}
