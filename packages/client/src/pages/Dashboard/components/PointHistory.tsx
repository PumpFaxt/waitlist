import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Icon from "@/shared/components/Icon"
import PointsTable from "./PointsTable"

interface Props {
    PointHistoryData: { id: number; user: number; points: number; reason: string; createdAt: string | null; deleted_at: string | null; }[] | undefined;
}

export default function PointHistory(props: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Icon name="history" className="size-6 text-sm text-foreground/70 hover:text-foreground transition-all cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="rounded-lg max-w-md">
                <DialogHeader>
                    <DialogTitle>Points Earned</DialogTitle>
                    <DialogDescription>
                        Here's a summary of the points you've earned so far.
                    </DialogDescription>
                </DialogHeader>

                <div className="mx-auto w-full ">
                    <PointsTable data={props.PointHistoryData} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
