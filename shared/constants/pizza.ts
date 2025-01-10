export const mapSize = {
    20: 'Small',
    30: 'Medium',
    40: 'Large',
} as const;

export const mapPizzaType = {
    1: 'average',
    2: 'thin'
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([name, value]) => ({ name, value }))