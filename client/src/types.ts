export type INation = {
    country: {
        country_id: string;
        probability: number;
    }
}

export type IGender = {
    gender: 'male' | 'female';
    probability: number;
}