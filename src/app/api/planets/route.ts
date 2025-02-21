export async function GET() {
    return Response.json({
        data: [
            {
                id: 'mercury',
                name: 'Mercury',
                distance_au: 0.387,
            },
            {
                id: 'venus',
                name: 'Venus',
                distance_au: 0.722,
            },
            {
                id: 'moon',
                name: 'Moon',
                distance_au: 0.002569,
            },
            { id: 'mars', name: 'Mars', distance_au: 1.524 },
            {
                id: 'jupiter',
                name: 'Jupiter',
                distance_au: 5.203,
            },
            {
                id: 'saturn',
                name: 'Saturn',
                distance_au: 9.537,
            },
            {
                id: 'uranus',
                name: 'Uranus',
                distance_au: 19.191,
            },
            {
                id: 'neptune',
                name: 'Neptune',
                distance_au: 30.069,
            },
        ],
    });
}
