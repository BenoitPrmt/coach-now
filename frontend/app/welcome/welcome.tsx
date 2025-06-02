import {Button} from "~/components/ui/button";

export function Welcome() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            CoachNow
            <Button
                className="ml-4">
                Get Started
            </Button>
        </main>
    );
}
