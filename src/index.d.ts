export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            GameOver: {
                score: number
            };
            Game: undefined;
        }
    }

    declare module "*.png";
}