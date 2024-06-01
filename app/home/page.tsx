import Greetings from "@/app/ui/cards/greeting";
import MemoContainer from "@/app/ui/memo/memo-container";
import MemoList from "@/app/ui/memo-list";

export default async function DashboardPage() {
    return (
        <main>
            <Greetings />
            <MemoContainer />
            <MemoList />
        </main>
    )
}