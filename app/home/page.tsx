import Greetings from "@/app/ui/cards/greeting";
import MemoContainer from "../ui/memo/memo-container";

export default async function DashboardPage() {
    return (
        <main>
            <Greetings />
            <MemoContainer />
        </main>
    )
}