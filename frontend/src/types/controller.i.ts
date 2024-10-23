import { Duck } from "../components/app/Duck";

export type StateController = "loading" | "online" | "offline"

export interface DucksData {
  [key: string]: {
    element: JSX.Element;
    duck: Duck;
  };
}